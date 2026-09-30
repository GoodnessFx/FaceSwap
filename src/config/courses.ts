export interface Lesson {
  slug: string;
  title: string;
  estimatedMinutes: number;
  isFree?: boolean;
  tier: 'starter' | 'complete' | 'done-with-you' | 'business';
  content: string;
  screenshots?: string[];
}

export interface Module {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
  tier: 'starter' | 'complete' | 'done-with-you' | 'business';
}

export const MODULES: Module[] = [
  {
    slug: 'start-here',
    title: 'Start Here',
    description: 'Rules of use, what to expect on a CPU-only PC, and how to use this course.',
    tier: 'starter',
    lessons: [
      {
        slug: 'introduction',
        title: 'Introduction & Rules of Use',
        estimatedMinutes: 5,
        isFree: true,
        tier: 'starter',
        content: `# Introduction & Rules of Use

Welcome to FaceSwap Studio. This course teaches you how to build a complete AI persona pipeline using free, open-source tools on a standard Windows laptop — no expensive GPU required.

## What you'll build

A pipeline that takes your webcam and mic and turns them into a persona:

\`\`\`
Webcam -> Deep-Live-Cam (face swap) -> OBS Virtual Camera -> Zoom / Meet / Discord / stream
Mic    -> RVC (voice conversion)    -> VB-Cable virtual mic -> the same call
\`\`\`

## The rules (read before anything else)

1. **Owned or licensed faces only.** Use your own face, a licensed face, or an AI-generated face of a person who does not exist. A good free source is [thispersondoesnotexist.com](https://thispersondoesnotexist.com).
2. **Owned or licensed voices only.** Do not use models trained on celebrities or real people without permission.
3. **Disclose.** Label AI content when you publish. Tell your audience they're watching an AI persona.
4. **No impersonation.** Never use these tools to deceive someone on a call, commit fraud, or bypass verification.

> This course is for educational purposes only. Misuse can be a crime where you live. You are solely responsible for how you use these tools.`,
      },
      {
        slug: 'what-to-expect',
        title: 'What to Expect on a CPU-Only PC',
        estimatedMinutes: 5,
        tier: 'starter',
        content: `# What to Expect on a CPU-Only PC

## Honest performance expectations

- Face swap runs at roughly **2–5 frames per second** on a modern CPU. Good for recorded content, choppy for live calls.
- Voice conversion (RVC) is CPU-heavy. Running face swap + voice + OBS + a call app simultaneously will lag.
- **Test each piece separately first.** Get face swap working, then get voice working, then combine.

## If you have an NVIDIA GPU

If you have an NVIDIA GTX 1660 or better, everything gets much smoother. The GPU path in Deep-Live-Cam can run at 15–30 fps.

## What face swap does and doesn't do

- Replaces your face in real time
- Works with your webcam as input
- Does NOT change your outfit, body, or background
- Does NOT track fast head movements perfectly on a CPU`,
      },
    ],
  },
  {
    slug: 'install-tools',
    title: 'Install the Tools',
    description: 'Python 3.10.11, Git, and Microsoft C++ Build Tools — every step with screenshots.',
    tier: 'starter',
    lessons: [
      {
        slug: 'python',
        title: 'Install Python 3.10.11',
        estimatedMinutes: 10,
        tier: 'starter',
        screenshots: [
          '/imports/03-python-3.10.11-files-table.png',
          '/imports/04-python-setup-successful.png',
        ],
        content: `# Install Python 3.10.11

Deep-Live-Cam needs Python 3.10.x specifically. **Python 3.14 (the default on python.org right now) will not work.**

## Download

1. Open [python.org/downloads/release/python-31011](https://www.python.org/downloads/release/python-31011/)
2. Scroll to the **Files** table
3. Click **Windows installer (64-bit)** — the row marked "Recommended", about 27.7 MB

![The correct installer row in the Files table](/imports/03-python-3.10.11-files-table.png)

## Install

1. Run the installer
2. On the first screen, **tick "Add python.exe to PATH"** — this is critical
3. Click **Install Now**, then **Close**

## Common traps

> **Wrong page:** If you see a yellow "Download Installer (MSIX)" button, that's Python 3.14. Go back and use the exact URL above.

> **Python 3.10.21:** If the page says binary installers are no longer provided, you're on 3.10.21 (source only). Use 3.10.**11**.

## Verify

Open Command Prompt and run:

\`\`\`
python --version
\`\`\`

It must print \`Python 3.10.11\`.

![Python setup successful](/imports/04-python-setup-successful.png)`,
      },
      {
        slug: 'git',
        title: 'Install Git',
        estimatedMinutes: 5,
        tier: 'starter',
        screenshots: ['/imports/05-python-and-git-versions.png'],
        content: `# Install Git

## Download and install

1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer
3. Click **Next** on every screen (defaults are fine)
4. Click **Install**, then **Finish**

## Verify

\`\`\`
git --version
\`\`\`

![Python and Git versions confirmed](/imports/05-python-and-git-versions.png)`,
      },
      {
        slug: 'cpp-build-tools',
        title: 'Install Microsoft C++ Build Tools',
        estimatedMinutes: 20,
        tier: 'starter',
        screenshots: ['/imports/06-build-tools-workload.png'],
        content: `# Install Microsoft C++ Build Tools

One Python package (\`insightface\`) compiles code during installation. It needs a C++ compiler to do that.

## Steps

1. Go to [visualstudio.microsoft.com/visual-cpp-build-tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Click **Download Build Tools**
3. Run the installer
4. Tick **Desktop development with C++**
5. Click **Install** — it's about 6.75 GB and takes a while

![Tick Desktop development with C++](/imports/06-build-tools-workload.png)

> **Warning:** Wait until the installer says "All installations are up to date" with Modify and Launch buttons. Do not continue before this.

## After it finishes

**Close every open Command Prompt and open a new one.** Old terminal windows don't see the newly installed compiler.`,
      },
    ],
  },
  {
    slug: 'deep-live-cam',
    title: 'Deep-Live-Cam',
    description: 'Download, install packages (with the two error fixes), model files, ffmpeg, and first run.',
    tier: 'starter',
    lessons: [
      {
        slug: 'download',
        title: 'Download Deep-Live-Cam',
        estimatedMinutes: 5,
        tier: 'starter',
        screenshots: ['/imports/07-git-clone.png', '/imports/08-project-folder-listing.png'],
        content: `# Download Deep-Live-Cam

## Clone the repository

Open Command Prompt and run:

\`\`\`
cd Desktop
git clone https://github.com/hacksider/Deep-Live-Cam.git
cd Deep-Live-Cam
dir
\`\`\`

![Cloning the repository](/imports/07-git-clone.png)

You should see \`run.py\`, \`requirements.txt\`, a \`models\` folder and more.

![Files present in the project folder](/imports/08-project-folder-listing.png)

Project page: [github.com/hacksider/Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam)`,
      },
      {
        slug: 'install-packages',
        title: 'Install Python Packages (+ 2 Error Fixes)',
        estimatedMinutes: 15,
        tier: 'starter',
        screenshots: ['/imports/09-error-onnxruntime-gpu.png'],
        content: `# Install Python Packages

From inside the \`Deep-Live-Cam\` folder:

\`\`\`
pip install -r requirements.txt
\`\`\`

## Fix A: onnxruntime-gpu not found

You'll likely see this error:

\`\`\`
ERROR: Could not find a version that satisfies the requirement onnxruntime-gpu==1.26.0
\`\`\`

![The onnxruntime-gpu error](/imports/09-error-onnxruntime-gpu.png)

That version doesn't exist for Windows Python, and you don't have an NVIDIA GPU anyway.

**Fix:** open the file in Notepad:

\`\`\`
notepad requirements.txt
\`\`\`

Delete **all three** onnxruntime lines and replace them with a single line. The finished file should look like:

\`\`\`
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
\`\`\`

Save with **Ctrl+S**. Run \`pip install -r requirements.txt\` again.

## Fix B: Visual C++ 14.0 required

This means the Build Tools install from Module 2 isn't finished, or you're in an old Command Prompt.

1. Finish the C++ Build Tools install
2. **Open a new Command Prompt**
3. Go back to the Deep-Live-Cam folder
4. Run \`pip install -r requirements.txt\` again

**Success looks like:** "Successfully built insightface" followed by "Installing collected packages", then your prompt returns.`,
      },
      {
        slug: 'model-files',
        title: 'Download the AI Model Files',
        estimatedMinutes: 10,
        tier: 'starter',
        content: `# Download the AI Model Files

The AI needs two model files in the \`models\` folder.

> **Warning:** The old GitHub release links return an error page. Use HuggingFace:

\`\`\`
curl -L -o models\\GFPGANv1.4.pth "https://huggingface.co/hacksider/deep-live-cam/resolve/main/GFPGANv1.4.pth"
curl -L -o models\\inswapper_128_fp16.onnx "https://huggingface.co/hacksider/deep-live-cam/resolve/main/inswapper_128_fp16.onnx"
\`\`\`

## Check the file sizes

Run \`dir models\`. Correct sizes:

- \`GFPGANv1.4.pth\` = **~348 MB**
- \`inswapper_128_fp16.onnx\` = **~277 MB**

> If a file is only **9 bytes**, the download failed. Delete it and use the HuggingFace links above.

Model page: [huggingface.co/hacksider/deep-live-cam](https://huggingface.co/hacksider/deep-live-cam)`,
      },
      {
        slug: 'ffmpeg',
        title: 'Install ffmpeg and Add to PATH',
        estimatedMinutes: 10,
        tier: 'starter',
        content: `# Install ffmpeg

Running \`python run.py\` without ffmpeg gives: *"ffmpeg is not installed."*

## Install manually

1. Go to [gyan.dev/ffmpeg/builds](https://www.gyan.dev/ffmpeg/builds/) and under **release builds** download **ffmpeg-release-essentials.zip**
2. Right-click the zip, then choose **Extract All**
3. Rename the extracted folder to \`ffmpeg\` and move it to \`C:\\ffmpeg\`
4. Confirm this file exists: \`C:\\ffmpeg\\bin\\ffmpeg.exe\`

## Add to PATH

1. Press **Windows key + R**, paste \`rundll32 sysdm.cpl,EditEnvironmentVariables\`, press Enter
2. In the **top box** (User variables), select **Path**, click **Edit**, then **New**
3. Paste \`C:\\ffmpeg\\bin\` and press Enter
4. Click **OK** on every window

## Verify

**Close all Command Prompts, open a new one**, then:

\`\`\`
ffmpeg -version
\`\`\`

It should print a version number.`,
      },
      {
        slug: 'first-run',
        title: 'First Run of Deep-Live-Cam',
        estimatedMinutes: 10,
        tier: 'starter',
        content: `# First Run of Deep-Live-Cam

\`\`\`
cd Desktop\\Deep-Live-Cam
python run.py
\`\`\`

The first launch may download extra face-detection files (~few hundred MB). Stay online.

> The window may say **"Not Responding"** while models load on a CPU. Wait 2–3 minutes before clicking anything.

## Settings that help on a CPU

| Setting | Value |
|---------|-------|
| Resolution | 640 × 480 |
| Face Enhancer | None |
| Camera | Your webcam (auto-detected) |
| Keep audio | Off (for live use) |

## How to use it

1. Click **Select a face** — choose a clear, front-facing image of a face you're allowed to use
2. Click **Live** — your webcam turns on and a preview window shows the swapped face
3. Keep this running for the OBS module`,
      },
    ],
  },
  {
    slug: 'obs',
    title: 'OBS & Virtual Camera',
    description: 'Window capture, virtual camera, and using your persona in Zoom, Meet, Discord, and WhatsApp.',
    tier: 'starter',
    lessons: [
      {
        slug: 'setup',
        title: 'OBS Setup and Virtual Camera',
        estimatedMinutes: 15,
        tier: 'starter',
        content: `# OBS Setup and Virtual Camera

1. Install OBS Studio from [obsproject.com/download](https://obsproject.com/download)
2. Keep Deep-Live-Cam running with the preview open
3. In OBS, under **Sources**, click **+**, choose **Window Capture**, then OK
4. In the **Window** dropdown, choose the Deep-Live-Cam preview window (appears as \`[python.exe]: ...\`)
5. If capture is black: set **Capture Method** to **Windows 10 (1903 and up)**
6. If borders show: right-click source, then **Filters**, then **+**, then **Crop/Pad**
7. In OBS Settings, then Video: set output to **640×480** and FPS to **15**
8. Click **Start Virtual Camera** (Controls panel, bottom right)`,
      },
      {
        slug: 'use-in-calls',
        title: 'Use Your Persona in Calls',
        estimatedMinutes: 10,
        tier: 'starter',
        content: `# Use Your Persona in Calls

Start the OBS Virtual Camera **before** opening any call app.

| App | How to select |
|-----|---------------|
| Zoom | Settings / Video / Camera / OBS Virtual Camera |
| Google Meet | Camera dropdown in the call |
| Discord | Settings / Voice and Video / Camera / OBS Virtual Camera |
| Teams | Settings / Devices / Camera |
| WhatsApp Desktop | May ignore OBS if no camera picker — use Zoom or Meet first |

## Recommended start order

1. Deep-Live-Cam (face swap running with preview open)
2. OBS (capture added, virtual camera started)
3. Voice tools (next module)
4. The call app

## The outfit question

Face swap replaces **only the face**. Options for the body:
- Wear a plain top similar to your persona's look
- Crop tighter in OBS
- Add a collar/shoulders PNG overlay in OBS as an Image source
- For full outfits: use VTube Studio (free, CPU-friendly)`,
      },
    ],
  },
  {
    slug: 'voice',
    title: 'Voice Conversion',
    description: 'VB-Cable, RVC install, voice models, real-time conversion, and routing into calls.',
    tier: 'complete',
    lessons: [
      {
        slug: 'vb-cable',
        title: 'Install VB-Cable (Virtual Microphone)',
        estimatedMinutes: 10,
        tier: 'complete',
        content: `# Install VB-Cable

VB-Cable creates a virtual audio device. Other apps send sound into "CABLE Input" and you (or other apps) listen to "CABLE Output" as if it were a real microphone.

1. Go to [vb-audio.com/Cable](https://vb-audio.com/Cable/) and download **VB-CABLE Driver Pack**
2. Extract the zip, right-click \`VBCABLE_Setup_x64.exe\`, then **Run as administrator**
3. Click **Install Driver**
4. **Restart your PC**

## Verify

Windows key, type **Sound settings**, then open **Input**. You should see **CABLE Output (VB-Audio Virtual Cable)** in the list.`,
      },
      {
        slug: 'rvc-install',
        title: 'Install RVC',
        estimatedMinutes: 20,
        tier: 'complete',
        content: `# Install RVC

RVC requires Python 3.12 (not 3.10). You can have both on one PC — keep 3.10 for Deep-Live-Cam.

## Install Python 3.12

Download Python 3.12 (64-bit) from [python.org/downloads/windows](https://www.python.org/downloads/windows/). During install, **do NOT tick "Add to PATH"** — this keeps \`python\` pointing to 3.10.

## Clone and set up

\`\`\`
cd Desktop
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
cd Retrieval-based-Voice-Conversion-WebUI
py -3.12 -m venv .venv
.venv\\Scripts\\activate
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r requirments_cpu_py312.txt
\`\`\`

## Download model files

\`\`\`
python -m pip install --upgrade huggingface_hub
hf download lj1995/VoiceConversionWebUI --revision main --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --revision main --local-dir assets/rmvpe
hf download lj1995/VoiceConversionWebUI rmvpe.onnx --revision main --local-dir assets/rmvpe
\`\`\`

> **Warning:** RVC changes often. Verify every command on your own machine before sharing this section.`,
      },
      {
        slug: 'voice-models',
        title: 'Get a Voice Model',
        estimatedMinutes: 15,
        tier: 'complete',
        content: `# Get a Voice Model

RVC converts your live voice into a trained voice model. You need one.

## Option A: Train on your own voice (recommended)

1. Record **10 minutes of clean speech** — quiet room, no music, no echo
2. Start the training interface: \`python webui.py\`, then open \`http://localhost:7865\`
3. Use the Train tab with your recording
4. Copy the result: \`.pth\` file to \`assets\\weights\\\` and \`.index\` file to \`assets\\indices\\\`

> **Training on a CPU is extremely slow.** Use a free cloud GPU (Google Colab) for training, then download the model files.

## Option B: Licensed or synthetic voice

Use a model whose creator explicitly states it's free to use for your purpose. Check the license. Skip anything that imitates a real person.`,
      },
      {
        slug: 'realtime-conversion',
        title: 'Real-Time Voice Conversion',
        estimatedMinutes: 10,
        tier: 'complete',
        content: `# Real-Time Voice Conversion

With the .venv active:

\`\`\`
python realtime_gui.py
\`\`\`

## Settings

- **Model (.pth):** your trained or licensed voice model
- **Index (.index):** matching index file
- **Input device:** your real microphone
- **Output device:** CABLE Input (VB-Audio Virtual Cable)
- Start with the **largest buffer size** available. Lower it only if audio crackles.

Click start and speak. You should hear your converted voice through VB-Cable.

> On a CPU expect **200–400 ms latency**. If it stutters, raise the buffer, close other apps, or use voice conversion for recorded content only.`,
      },
      {
        slug: 'voice-in-calls',
        title: 'Use Converted Voice in Calls',
        estimatedMinutes: 5,
        tier: 'complete',
        content: `# Use Converted Voice in Calls

In Zoom, Meet, Discord or WhatsApp, set the **microphone** to **CABLE Output (VB-Audio Virtual Cable)**.

## To monitor yourself

Sound settings, then More sound settings, then Recording tab, then double-click **CABLE Output**, then open the Listen tab, tick **Listen to this device**, then pick your headphones.

**Warning:** Use headphones or you will get feedback.

## Full start order

1. Deep-Live-Cam (preview running)
2. OBS (virtual camera started)
3. RVC (realtime_gui running, CABLE Input selected as output)
4. The call app`,
      },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Every error you might hit, and exactly how to fix it.',
    tier: 'starter',
    lessons: [
      {
        slug: 'error-table',
        title: 'Troubleshooting Table',
        estimatedMinutes: 5,
        tier: 'starter',
        content: `# Troubleshooting Table

| Symptom | Cause | Fix |
|---------|-------|-----|
| \`python\` not recognized | PATH not set | Reinstall Python 3.10.11 and tick "Add python.exe to PATH" |
| \`python --version\` shows 3.14 | Wrong Python in PATH | Use \`py -3.10\` or reinstall 3.10.11 |
| \`onnxruntime-gpu\` not found | Version doesn't exist | Module 3 / Install Packages / Fix A |
| Visual C++ 14.0 required | Build Tools not done | Finish Step 3, open new terminal |
| Model files are 9 bytes | Wrong download URL | Use HuggingFace links in Module 3 |
| "ffmpeg is not installed" | Not in PATH | Module 3 / Install ffmpeg |
| \`winget\` not recognized | Not on your PC | Install ffmpeg manually |
| Window says "Not Responding" | CPU loading models | Wait 2–3 minutes |
| OBS can't list the preview | Preview not open | Start Live first, then reopen the dropdown |
| OBS shows black screen | Capture method wrong | Use Windows 10 (1903+) or Display Capture |
| Call app ignores OBS camera | No camera picker | Use Zoom, Meet, or Discord |
| Very choppy video | CPU only | 640×480, close other apps, or record instead |`,
      },
    ],
  },
  {
    slug: 'bonus-commercial',
    title: 'Bonus: Commercial Workflow',
    description: 'How to use this pipeline for paid client work — consent, releases, and legal templates.',
    tier: 'business',
    lessons: [
      {
        slug: 'commercial-use',
        title: 'Commercial Use Workflow',
        estimatedMinutes: 20,
        tier: 'business',
        content: `# Commercial Use Workflow

> This module is for the Creator & Business tier.

Using an AI persona for paid content, ads, or client work requires additional care around consent, model releases, and disclosure.

## The consent-first framework

1. **Your own face/voice:** you have full rights. Get this in writing for any client work.
2. **Licensed assets:** obtain written permission covering your specific commercial use case.
3. **Synthetic assets (AI-generated, no real person):** still document that you're using synthetic assets. Clients and platforms may ask.

## Required paperwork for commercial work

### Model Release (for any face you use)
A signed document stating:
- Who the face belongs to
- What uses are permitted (streaming, ads, social, etc.)
- Duration and territory of the license
- Whether the license is exclusive or non-exclusive

### Disclosure agreement
- What you must tell clients (AI-generated persona)
- What the client must disclose to their audiences
- Platform-specific disclosure requirements (Meta, TikTok, YouTube)

## Red lines that apply regardless of tier

- Never create content that could be mistaken for a real person you don't represent
- Never create adult content with synthetic faces
- Never use for political advertising without explicit platform compliance review
- Never bypass any verification system

## Platform-specific rules

| Platform | Rule |
|----------|------|
| YouTube | Must disclose AI-altered content in description and settings |
| Meta/Instagram | AI labels required on political content; best practice on all AI content |
| TikTok | Must label AI-generated content |
| LinkedIn | No current mandate but disclosure is best practice |

> The templates and call guidance are in the materials download in your dashboard.`,
      },
    ],
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  const module = getModuleBySlug(moduleSlug);
  return module?.lessons.find((l) => l.slug === lessonSlug);
}

export function getAllLessons(): Array<Lesson & { moduleSlug: string; moduleTitle: string }> {
  return MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug, moduleTitle: m.title }))
  );
}

export function getNextLesson(
  moduleSlug: string,
  lessonSlug: string
): { moduleSlug: string; lessonSlug: string } | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug);
  if (idx === -1 || idx === allLessons.length - 1) return null;
  const next = allLessons[idx + 1];
  return { moduleSlug: next.moduleSlug, lessonSlug: next.slug };
}

export function getPrevLesson(
  moduleSlug: string,
  lessonSlug: string
): { moduleSlug: string; lessonSlug: string } | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug);
  if (idx <= 0) return null;
  const prev = allLessons[idx - 1];
  return { moduleSlug: prev.moduleSlug, lessonSlug: prev.slug };
}
