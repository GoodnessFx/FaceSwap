# Build Your Own AI Face and Voice Persona on a Budget PC (Windows, No GPU)

**Deep-Live-Cam + OBS + RVC + VB-Cable, step by step**

> **EDUCATIONAL PURPOSES ONLY.** This guide teaches how open-source face-swap and voice-conversion tools work, for creating avatar personas, streaming, dubbing and content. Only use a face and a voice that are **yours, licensed to you, or fully synthetic (a person who does not exist)**. Never use it to impersonate a real person, deceive someone on a call, commit fraud, or bypass identity checks. See the full warning at the bottom.

---

## What you will build

A pipeline that takes your webcam and mic and turns them into a persona:

```
Webcam -> Deep-Live-Cam (face swap) -> OBS Virtual Camera -> Zoom / Meet / Discord / stream
Mic    -> RVC (voice conversion)    -> VB-Cable virtual mic -> the same call
```

**Everything here is free.** The tradeoff is time and hardware. This guide was tested on a Windows 11 laptop with **no dedicated GPU (CPU only)**.

## Read this first: what to expect on a CPU-only PC

- The face swap runs, but slowly (roughly a few frames per second). It is fine for testing and recorded content, and choppy for live calls.
- Voice conversion (RVC) is heavy too. Running face swap + RVC + OBS + a call app together on a CPU will lag. Test each piece on its own first.
- If you have an NVIDIA GTX 1660 or better, everything gets much smoother.
- **Face swap changes only the face.** Your clothes, body and background stay as they are (see the FAQ on outfits).

## The rules of use (do not skip)

1. Use a source face that is **your own, licensed, or AI-generated of a person who does not exist**. A good free source is https://thispersondoesnotexist.com (refresh for a new face, save the image).
2. Use a voice model that is **your own voice or a voice you have permission to use**. Do not use models that copy celebrities or real people.
3. **Disclose** when your audience is watching or talking to an AI persona. Label AI content when you publish it.
4. The Deep-Live-Cam project's own README asks for consent and labeling too. Follow it.

---

# PART 1: Install the tools

## Step 1: Install Python 3.10.11

Deep-Live-Cam needs an older Python. **Python 3.14 (the page python.org pushes now) will not work.**

1. Open https://www.python.org/downloads/release/python-31011/
2. Scroll to the **Files** table and click **Windows installer (64-bit)** (the row marked "Recommended", about 27.7 MB).
3. Run the file. On the first screen, **tick "Add python.exe to PATH"**, then click **Install Now**, then **Close**.

![Files table with the correct installer](screenshots/03-python-3.10.11-files-table.png)

**Common traps (these happened while testing):**

- If you land on a page for **Python 3.14** with a yellow "Download Installer (MSIX)" button, that is the wrong one.

![Wrong page: Python 3.14 install manager](screenshots/01-wrong-python-3.14-page.png)

- If you land on **Python 3.10.21**, it says binary installers are no longer provided (source code only). Go back and use **3.10.11**, the last 3.10 with a Windows installer.

![3.10.21 has no installers](screenshots/02-python-3.10.21-no-installers.png)

**Verify:** open Command Prompt (Windows key, type `cmd`, Enter) and run:

```
python --version
```

It must print `Python 3.10.11`.

![Setup successful](screenshots/04-python-setup-successful.png)

## Step 2: Install Git

1. Go to https://git-scm.com/download/win and run the installer.
2. Click **Next** on every screen (defaults are fine), then **Install**, then **Finish**.
3. Verify: `git --version`

![Python and Git versions confirmed](screenshots/05-python-and-git-versions.png)

## Step 3: Install Microsoft C++ Build Tools

One of the Python packages (`insightface`) compiles code during install, so it needs a C++ compiler.

1. Go to https://visualstudio.microsoft.com/visual-cpp-build-tools/ and click **Download Build Tools**.
2. Run it. In the installer, tick **Desktop development with C++**.
3. Click **Install**. It is about 6.75 GB and takes a while.
4. **Wait until it says "All installations are up to date"** with Modify and Launch buttons. Do not continue before this.

![Tick Desktop development with C++](screenshots/06-build-tools-workload.png)

![Still installing: wait](screenshots/12-build-tools-still-installing.png)

![Finished](screenshots/13-build-tools-installed.png)

> After it finishes, **close every Command Prompt and open a new one.** Old windows do not see the new compiler.

## Step 4: Download Deep-Live-Cam

1. Open Command Prompt and go somewhere simple, for example your Desktop:

```
cd Desktop
git clone https://github.com/hacksider/Deep-Live-Cam.git
cd Deep-Live-Cam
dir
```

2. You should see `run.py`, `requirements.txt`, a `models` folder and more.

![Cloning the repo](screenshots/07-git-clone.png)

![Files present](screenshots/08-project-folder-listing.png)

Project page: https://github.com/hacksider/Deep-Live-Cam

## Step 5: Install the Python packages (with the two fixes)

From inside the `Deep-Live-Cam` folder:

```
pip install -r requirements.txt
```

### Fix A: `onnxruntime-gpu` not found

You will likely see:

```
ERROR: Could not find a version that satisfies the requirement onnxruntime-gpu==1.26.0
```

![The onnxruntime-gpu error](screenshots/09-error-onnxruntime-gpu.png)

That version does not exist for Windows Python yet, and you do not have an NVIDIA GPU anyway. Edit the file:

```
notepad requirements.txt
```

Delete **all three** `onnxruntime` lines (the two `darwin` lines and the `-gpu` line) and put a single line in their place. The file should end up like this:

```
numpy>=2.0,<3
typing-extensions>=4.15.0
opencv-python==4.14.0.94
opencv-python-headless==4.14.0.94
cv2_enumerate_cameras==1.3.3
onnx==1.22.0
insightface==0.7.3
psutil==7.2.2
PySide6>=6.7,<7
pillow==12.3.0
tqdm>=4.66.3
onnxruntime==1.23.0
opennsfw2==0.18.0
keras>=3.0.0
protobuf>=6.33.5,<8
pygrabber; sys_platform == 'win32'
```

Save with **Ctrl+S**. If the old GPU line stays in the file, pip keeps failing.

![Editing requirements.txt](screenshots/10-editing-requirements-notepad.png)

> Package versions change over time. If a different version error appears, read the message: it lists the versions that do exist. Pick one from that list.

### Fix B: "Microsoft Visual C++ 14.0 or greater is required"

![C++ build tools error](screenshots/11-error-cpp-build-tools-required.png)

This means Step 3 was not finished, or you are in an old Command Prompt. Finish the Build Tools install, open a **new** Command Prompt, go back to the folder and run `pip install -r requirements.txt` again.

**Success looks like** "Successfully built insightface" followed by a long "Installing collected packages" line, then your prompt returns. Give it several minutes.

![insightface built](screenshots/14-insightface-built-success.png)

## Step 6: Download the two model files

The AI needs two model files in the `models` folder. **The GitHub release links that older guides show return an error page.** Use HuggingFace:

```
curl -L -o models\GFPGANv1.4.pth "https://huggingface.co/hacksider/deep-live-cam/resolve/main/GFPGANv1.4.pth"
curl -L -o models\inswapper_128_fp16.onnx "https://huggingface.co/hacksider/deep-live-cam/resolve/main/inswapper_128_fp16.onnx"
```

**Check the sizes** with `dir models`.

- If a file is only **9 bytes**, the download failed (you got an error page). Delete it and use the links above.

![9-byte files mean a failed download](screenshots/15-models-9-bytes-wrong-download.png)

- Correct: `GFPGANv1.4.pth` is **348,632,874 bytes** and `inswapper_128_fp16.onnx` is about **277,680,638 bytes**.

![Correct file sizes](screenshots/16-models-downloaded-correctly.png)

Model page: https://huggingface.co/hacksider/deep-live-cam

## Step 7: Install ffmpeg

If you run `python run.py` now, it stops with "ffmpeg is not installed." ffmpeg is a free video tool the app needs.

`winget` may not exist on your PC (it did not on the test machine), so install manually:

1. Go to https://www.gyan.dev/ffmpeg/builds/ and under **release builds** download **ffmpeg-release-essentials.zip** (use the zip, not the 7z).

![ffmpeg download page](screenshots/17-ffmpeg-download-page.png)

2. Right-click the zip, **Extract All**. Rename the extracted folder to `ffmpeg` and move it somewhere permanent, for example `C:\ffmpeg`.
3. Confirm this file exists: `C:\ffmpeg\bin\ffmpeg.exe`. (Whatever folder you use, the path you add in the next step must match it exactly. On the test PC it was `C:\Users\Admin\Desktop\ffmpeg\bin`.)

![The bin folder](screenshots/18-ffmpeg-bin-folder.png)

4. **Add it to PATH:**
   - Press **Windows key + R**, paste `rundll32 sysdm.cpl,EditEnvironmentVariables` and press Enter.
   - In the **top box** (User variables), select **Path**, click **Edit**, then **New**.
   - Paste the path to your `bin` folder and press Enter.
   - Click **OK** on every window.

![Adding to PATH](screenshots/19-path-environment-variable.png)

5. **Close all Command Prompts, open a new one**, and run `ffmpeg -version`. It should print a version and end with "Exiting with exit code 0".

![ffmpeg works](screenshots/20-ffmpeg-version-ok.png)

## Step 8: Run Deep-Live-Cam

```
cd Desktop\Deep-Live-Cam
python run.py
```

- The first launch may download extra face-detection files (a few hundred MB). Stay online.
- The window may say **"Not Responding"** while models load on a CPU. Wait a couple of minutes before clicking.

![The Deep-Live-Cam window](screenshots/21-deep-live-cam-window.png)

**Settings that help on a CPU:**

- Resolution: **640 x 480**
- Face Enhancer: **None**
- Camera: your webcam (it auto-detects)
- Turn off **Keep audio** for live use

**Using it:**

1. Click **Select a face** and choose a clear, front-facing image of a face you are allowed to use (see the rules above).
2. Click **Live**. Your webcam turns on and a preview window opens with the swapped face.
3. Keep this running for the next part.

---

# PART 2: Send it into calls and streams with OBS

## Step 9: OBS Studio and the Virtual Camera

1. Install OBS Studio from https://obsproject.com/download (defaults are fine).
2. Keep Deep-Live-Cam running with the preview open.
3. In OBS, under **Sources**, click **+**, then **Window Capture**, then OK.
4. In **Window**, open the dropdown and choose the Deep-Live-Cam **preview** window (it appears as `[python.exe]: ...`). Pick the video preview, not the control panel with the buttons. Reopen the dropdown if it is not listed yet.
5. If the capture is black, set **Capture Method** to **Windows 10 (1903 and up)**.
6. If borders show, right-click the source, **Filters**, **+**, **Crop/Pad**, and trim them.
7. If the window never appears in the list, use **Display Capture** and crop it to the preview instead.
8. In OBS **Settings, Video**, set output to **640x480** and FPS to **15** to reduce load.
9. Click **Start Virtual Camera** (bottom right, Controls).

![OBS main window](screenshots/22-obs-main-window.png)

## Step 10: Use it in call apps

Start the OBS Virtual Camera **before** opening the call app.

- **Zoom:** Settings, Video, Camera, choose **OBS Virtual Camera**.
- **Google Meet / Discord / Teams:** camera dropdown, choose **OBS Virtual Camera**.
- **WhatsApp Desktop:** WhatsApp's camera picker varies by version. If your call window has no camera list, it uses the system default and may ignore OBS. Test with Zoom or Meet first. Do not disable your real webcam, because Deep-Live-Cam needs it as input.

Test with a call to yourself or a friend who knows it is an AI persona.

**Start order that avoids problems:** Deep-Live-Cam, then OBS and its Virtual Camera, then (later) the voice tools, then the call app.

## FAQ: "It still shows my outfit"

Face swap replaces only the face. Options:

1. Wear a plain top similar to the character's look.
2. Frame tighter so less of your outfit shows (crop in OBS).
3. Overlay a PNG of collar or shoulders (transparent background) as an **Image** source above the face-swap in OBS. Works best when you sit still.
4. For a full character with outfit, use an avatar app such as VTube Studio (free, light on a CPU).
5. Recorded video only: some cloud AI tools change clothes in a clip. Not live.

---

# PART 3: Voice change

This part is the heaviest and the least beginner-friendly. It has three pieces: a virtual microphone (VB-Cable), the voice-conversion software (RVC), and a voice model.

> **Voice rules:** use your own voice, a licensed voice, or a synthetic voice. Do not use models built to imitate real people.

## Step 11: Install VB-Cable (the virtual microphone)

1. Go to https://vb-audio.com/Cable/ and download the **VB-CABLE Driver Pack**.
2. Extract the zip, right-click `VBCABLE_Setup_x64.exe`, **Run as administrator**, click **Install Driver**.
3. **Restart your PC.**
4. Verify: Windows key, type **Sound settings**, open **Input**. **CABLE Output (VB-Audio Virtual Cable)** should be listed.

How the names work: programs **send audio into "CABLE Input"** and other programs **listen to "CABLE Output"** as if it were a microphone.

## Step 12: Install RVC (voice conversion)

The current RVC project targets **Python 3.12**, not 3.10. You can have both on one PC. Keep 3.10 for Deep-Live-Cam.

1. Download Python **3.12 (64-bit)** from https://www.python.org/downloads/windows/. Python 3.12 is in its late life, so check that the release you pick lists a **Windows installer** (if not, use the last 3.12 release that has one). During install, **do not** tick "Add to PATH", so your `python` command stays 3.10.
2. Clone the project:

```
cd Desktop
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
cd Retrieval-based-Voice-Conversion-WebUI
```

3. Create and activate an isolated environment:

```
py -3.12 -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip setuptools wheel
```

4. Install the CPU dependencies (the repo spells the file "requirments"):

```
python -m pip install -r requirments_cpu_py312.txt
```

5. Download the required model files (one line each):

```
python -m pip install --upgrade huggingface_hub
hf download lj1995/VoiceConversionWebUI --revision main --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --revision main --local-dir assets/rmvpe
hf download lj1995/VoiceConversionWebUI rmvpe.onnx --revision main --local-dir assets/rmvpe
```

The `rmvpe.onnx` line is needed on Windows PCs with Intel or AMD graphics (DirectML), which covers most laptops without an NVIDIA card.

6. If RVC asks for ffmpeg files, ffmpeg is already on your PATH from Step 7. If it still complains, put `ffmpeg.exe` and `ffprobe.exe` in the RVC folder. The project links them here: https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main

Project: https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI
Models: https://huggingface.co/lj1995/VoiceConversionWebUI

> **Verify before you teach this part.** RVC changes often. Run every command above on your own machine and fix anything that has moved before you sell or share this section.

## Step 13: Get a voice model (`.pth` file)

RVC converts your voice **into a trained voice model**. You need one.

**Option A: train on your own voice (recommended).**

1. Record about **10 minutes of clean speech**: quiet room, no music, no echo, no other people.
2. Start the training interface: `python webui.py`, then open `http://localhost:7865` in your browser.
3. Use the Train tab with your recording.
4. **Training on a CPU is extremely slow.** A free cloud GPU is a better route. The project offers a Colab notebook (link on its GitHub page). Free tiers have daily limits, so expect to take breaks.
5. Copy the result: the `.pth` file to `assets\weights\` and the `.index` file to `assets\indices\`.

**Option B: a licensed or synthetic voice model.** Use a model whose creator states it is free to use for this purpose. Check the license. Skip anything that imitates a real person.

## Step 14: Run real-time voice conversion

1. In the RVC folder with the environment activated (`.venv\Scripts\activate`):

```
python realtime_gui.py
```

(The project also ships `go-realtime_gui.bat`. It is meant to do the same thing. Use whichever works.)

2. In the window:
   - Choose your **model (.pth)** and **index (.index)**.
   - **Input device:** your real microphone.
   - **Output device:** **CABLE Input (VB-Audio Virtual Cable)**.
   - Start with the largest block/buffer setting the GUI offers. Lower it only if there is no crackling.
3. Click start and speak.

The project reports about 170 ms latency on good hardware. **On a CPU expect more.** If the audio stutters, raise the buffer, close other apps, or use voice change only for recorded content.

## Step 15: Use the converted voice in a call

1. In Zoom, Meet, Discord or WhatsApp, set the **microphone** to **CABLE Output (VB-Audio Virtual Cable)**.
2. To hear yourself while testing: Sound settings, More sound settings, **Recording** tab, double-click **CABLE Output**, open the **Listen** tab, tick **Listen to this device**, and pick your headphones. **Use headphones** or you get feedback.
3. Order of starting: Deep-Live-Cam, OBS Virtual Camera, RVC, then the call app.

---

# Troubleshooting quick table

| Symptom | Cause | Fix |
|---|---|---|
| `python` not recognized | PATH box was not ticked | Reinstall Python 3.10.11 and tick "Add python.exe to PATH" |
| `python --version` shows 3.14 or 3.12 | Wrong Python first in PATH | Install 3.10.11, or run with `py -3.10` |
| `onnxruntime-gpu` not found | Version does not exist for your setup | Step 5, Fix A |
| Visual C++ 14.0 required | Build Tools not finished or old terminal | Step 3, then open a new terminal |
| Model files are 9 bytes | Wrong download URL | Step 6 HuggingFace links |
| "ffmpeg is not installed" | Not installed or not in PATH | Step 7, then open a new terminal |
| `winget` not recognized | Not on your PC | Install ffmpeg manually |
| Window says Not Responding | CPU loading models | Wait 2 to 3 minutes |
| OBS cannot list the preview window | Preview is not open yet | Start Live first, then reopen the dropdown |
| OBS shows black | Capture method | Windows 10 (1903 and up), or Display Capture |
| Call app ignores OBS camera | App has no camera picker | Use Zoom, Meet or Discord |
| Very choppy video | CPU only | Lower resolution, close apps, record instead of live |

---

# All links in one place

| What | Link |
|---|---|
| Python 3.10.11 | https://www.python.org/downloads/release/python-31011/ |
| Python Windows downloads (for 3.12) | https://www.python.org/downloads/windows/ |
| Git for Windows | https://git-scm.com/download/win |
| C++ Build Tools | https://visualstudio.microsoft.com/visual-cpp-build-tools/ |
| Deep-Live-Cam (GitHub) | https://github.com/hacksider/Deep-Live-Cam |
| Deep-Live-Cam models (HuggingFace) | https://huggingface.co/hacksider/deep-live-cam |
| ffmpeg builds | https://www.gyan.dev/ffmpeg/builds/ |
| OBS Studio | https://obsproject.com/download |
| VB-Cable | https://vb-audio.com/Cable/ |
| RVC (GitHub) | https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI |
| RVC models (HuggingFace) | https://huggingface.co/lj1995/VoiceConversionWebUI |
| Synthetic faces (nobody real) | https://thispersondoesnotexist.com |

---

## IMPORTANT WARNING: EDUCATIONAL USE ONLY

This material is provided **for educational purposes**, to explain how open-source face-swap and voice-conversion software works and to help creators build **their own** avatar and streaming personas.

- Use only faces and voices that are **yours, licensed to you, or synthetic**.
- **Do not** use these tools to impersonate a real person, to make someone believe they are speaking to someone they are not, to scam, harass, defame, or bypass identity or voice verification. In many countries this is a crime (fraud, identity theft, impersonation, harassment), and deepfake-specific laws are increasing.
- **Disclose and label** AI-generated or altered content.
- The author and seller of this guide accept **no responsibility** for misuse. You are solely responsible for how you use these tools and for following the laws where you live and where the other person is.
- Third-party software (Deep-Live-Cam, RVC, OBS, ffmpeg, VB-Cable) belongs to its authors and has its own licenses and terms. Links and steps may change over time.
