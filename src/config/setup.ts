/**
 * The Setup Roadmap.
 *
 * Every entry is written so a total beginner can follow it top to bottom
 * without leaving the page: where to go, what to click, how to prove it
 * worked, and the exact mistake people make at that step.
 */

export interface SetupLink {
  label: string;
  url: string;
  /** What this site is and why we open it. */
  note: string;
}

export interface SetupMistake {
  /** The mistake, written the way it will feel when it happens. */
  trap: string;
  /** The exact way out. */
  fix: string;
}

export interface SetupStep {
  id: string;
  order: number;
  phase: 'Prepare' | 'Install' | 'Machine' | 'Studio' | 'Voice' | 'Go live';
  title: string;
  /** What you will have when this step is green. */
  outcome: string;
  minutes: number;
  /** Nerd level 1-3, used for the difficulty dots. */
  difficulty: 1 | 2 | 3;
  links: SetupLink[];
  actions: string[];
  /** A command to paste, plus what success looks like. */
  verify?: { command: string; expect: string };
  mistakes: SetupMistake[];
  screenshot?: { src: string; caption: string };
  tip?: string;
}

const SCREENSHOTS = {
  pyFiles: '/imports/03-python-3.10.11-files-table.png',
  pyOk: '/imports/04-python-setup-successful.png',
  pyGit: '/imports/05-python-and-git-versions.png',
  cpp: '/imports/06-build-tools-workload.png',
  clone: '/imports/07-git-clone.png',
  folder: '/imports/08-project-folder-listing.png',
  onnxError: '/imports/09-error-onnxruntime-gpu.png',
};

export const SETUP_STEPS: SetupStep[] = [
  {
    id: 'check-machine',
    order: 1,
    phase: 'Prepare',
    title: 'Check what your machine can actually do',
    outcome: 'You know your CPU, your RAM and whether you have a GPU before downloading anything.',
    minutes: 4,
    difficulty: 1,
    links: [
      {
        label: 'Windows System Information',
        url: 'https://support.microsoft.com/windows/find-information-about-your-windows-version-and-device-specs-9b34c24c-2ef3-1e2b-1a4a-9bb0dd0f0a1a',
        note: 'Microsoft explains exactly where to read your Windows version and device specs.',
      },
    ],
    actions: [
      'Press the Windows key, type "About your PC" and open it.',
      'Write down the processor name and the installed RAM.',
      'Open Task Manager, go to the Performance tab, then click GPU. If you only see Intel or AMD integrated graphics, you are on the CPU path — which is exactly what this course was recorded on.',
      'Open File Explorer and confirm you have at least 25 GB of free space on C:. The Build Tools alone take about 6.75 GB.',
    ],
    verify: { command: 'winver', expect: 'A dialog shows Windows 10 or Windows 11.' },
    mistakes: [
      {
        trap: 'Watching a YouTube demo of a 60fps live swap and assuming your laptop is broken.',
        fix: 'Accept 2 to 5 frames per second. It is smooth enough for recorded content and honest enough to plan around.',
      },
      {
        trap: 'Trying to install everything on a low-space drive.',
        fix: 'Free up space first. A half-installed Build Tools is the number one cause of the C++ build error later.',
      },
    ],
    tip: 'Screenshot your About page. If you ever email for help, that one image answers half the support questions.',
  },
  {
    id: 'python',
    order: 2,
    phase: 'Install',
    title: 'Install Python 3.10.11 on purpose',
    outcome: 'A terminal that answers "Python 3.10.11" when you ask it nicely.',
    minutes: 10,
    difficulty: 1,
    links: [
      {
        label: 'Python 3.10.11 downloads',
        url: 'https://www.python.org/downloads/release/python-31011/',
        note: 'This is the last 3.10 release that still ships a Windows installer. Bookmark the exact page — not python.org/downloads.',
      },
    ],
    actions: [
      'Open the exact release page above. Do not use the big yellow button on python.org.',
      'Scroll to the Files table and find the row that says "Windows installer (64-bit)" — about 27.7 MB.',
      'Run the installer. On the very first screen, tick "Add python.exe to PATH" before anything else.',
      'Click Install Now, wait for the bar to finish, then click Close.',
      'Close every terminal window you had open, then open a brand new Command Prompt.',
    ],
    verify: { command: 'python --version', expect: 'It prints exactly: Python 3.10.11' },
    mistakes: [
      {
        trap: 'You landed on Python 3.14 with a yellow "Download Installer (MSIX)" button.',
        fix: 'Wrong page. Go back and use the release link above, which pins the version to 3.10.11.',
      },
      {
        trap: 'You landed on Python 3.10.21 and it says binary installers are no longer provided.',
        fix: 'That release is source-only. Step back to 3.10.11, which still has a Windows installer.',
      },
      {
        trap: 'You forgot to tick "Add python.exe to PATH".',
        fix: 'Run the installer again, choose Modify, and tick it. You cannot fix this from the terminal.',
      },
    ],
    screenshot: {
      src: SCREENSHOTS.pyFiles,
      caption: 'The Files table. "Windows installer (64-bit)" is the row you want.',
    },
    tip: 'If a tutorial tells you to install Python 3.12 for Deep-Live-Cam, ignore it. 3.12 belongs to RVC, later in this roadmap.',
  },
  {
    id: 'git',
    order: 3,
    phase: 'Install',
    title: 'Install Git so you can clone anything',
    outcome: 'A terminal that can pull code straight from GitHub with one command.',
    minutes: 6,
    difficulty: 1,
    links: [
      {
        label: 'Git for Windows',
        url: 'https://git-scm.com/download/win',
        note: 'The official installer. The default options are fine for this entire course.',
      },
    ],
    actions: [
      'Download the Git for Windows installer and run it.',
      'Click Next on every screen. Do not change a single default.',
      'Click Install, then Finish.',
      'Open a brand new Command Prompt — old windows cannot see a freshly installed PATH.',
    ],
    verify: {
      command: 'git --version',
      expect: 'It prints something like: git version 2.51.0.windows.1',
    },
    mistakes: [
      {
        trap: 'You installed Git but "git" is still "not recognized".',
        fix: 'You are in an old terminal. Close it and open a new one — PATH is only read when a terminal starts.',
      },
      {
        trap: 'You changed the "Adjusting your PATH environment" screen.',
        fix: 'Modify the install and choose "Git from the command line and also from 3rd-party software".',
      },
    ],
    screenshot: {
      src: SCREENSHOTS.pyGit,
      caption: 'Python 3.10.11 and Git answering version checks in the same terminal.',
    },
  },
  {
    id: 'cpp-build-tools',
    order: 4,
    phase: 'Install',
    title: 'Install Microsoft C++ Build Tools',
    outcome: 'Python can compile a package that ships as source code, without a "Visual C++ 14.0 required" error.',
    minutes: 25,
    difficulty: 2,
    links: [
      {
        label: 'Visual Studio Build Tools',
        url: 'https://visualstudio.microsoft.com/visual-cpp-build-tools/',
        note: 'Free, no Visual Studio IDE required. You only need one workload ticked.',
      },
    ],
    actions: [
      'Open the link and click "Download Build Tools".',
      'Run the small bootstrapper. It downloads the rest as you go.',
      'In the installer, click the "Desktop development with C++" workload card so it is ticked.',
      'Click Install and leave it alone — it is roughly 6.75 GB.',
      'Wait until the installer says "All installations are up to date" and shows Modify, Launch and Close. Only then continue.',
      'Close every open Command Prompt and open a new one.',
    ],
    verify: {
      command: 'python -c "import setuptools, sys; print(sys.version)"',
      expect: 'It prints 3.10.11 with no "Visual C++ 14.0" complaint.',
    },
    mistakes: [
      {
        trap: 'You closed the installer while it was still downloading.',
        fix: 'Reopen the installer, let it finish, and confirm the "All installations are up to date" message appears.',
      },
      {
        trap: 'You kept using the terminal you had open during the install.',
        fix: 'New terminal, always. The compiler path is injected into new shells only.',
      },
      {
        trap: 'You ticked other workloads to be safe.',
        fix: 'Only "Desktop development with C++" is needed. Extra workloads turn a 25-minute install into a two-hour one.',
      },
    ],
    screenshot: {
      src: SCREENSHOTS.cpp,
      caption: 'The only workload you need ticked: Desktop development with C++.',
    },
  },
  {
    id: 'clone-deep-live-cam',
    order: 5,
    phase: 'Machine',
    title: 'Clone Deep-Live-Cam to your Desktop',
    outcome: 'A folder on your Desktop containing run.py, requirements.txt and a models folder.',
    minutes: 5,
    difficulty: 1,
    links: [
      {
        label: 'Deep-Live-Cam on GitHub',
        url: 'https://github.com/hacksider/Deep-Live-Cam',
        note: 'The open-source real-time face swap project. Read its README consent section before you use it.',
      },
    ],
    actions: [
      'Open Command Prompt and move to your Desktop.',
      'Clone the repository with the command below.',
      'Enter the new folder and list the contents.',
      'Confirm you can see run.py, requirements.txt and a models folder.',
    ],
    verify: {
      command: 'cd Desktop && git clone https://github.com/hacksider/Deep-Live-Cam.git && cd Deep-Live-Cam && dir',
      expect: 'You see run.py, requirements.txt, models, and no error about "not a git command".',
    },
    mistakes: [
      {
        trap: 'You cloned into C:\\Windows\\System32 because the terminal opened there as administrator.',
        fix: 'Delete that folder and re-clone from your Desktop. Installing here pollutes your system folders.',
      },
      {
        trap: 'The clone is fine but you cannot see run.py.',
        fix: 'You are one level up. Run "cd Deep-Live-Cam" and list again.',
      },
    ],
    screenshot: {
      src: SCREENSHOTS.clone,
      caption: 'A clean clone finishing in the terminal. No errors, no prompts.',
    },
    tip: 'Keep this terminal open. Every command in the next two steps runs inside this folder.',
  },
  {
    id: 'install-packages',
    order: 6,
    phase: 'Machine',
    title: 'Install the Python packages and survive the two famous errors',
    outcome: 'Every dependency installed, including the one that does not exist for CPU machines.',
    minutes: 15,
    difficulty: 3,
    links: [
      {
        label: 'Deep-Live-Cam requirements.txt',
        url: 'https://github.com/hacksider/Deep-Live-Cam/blob/main/requirements.txt',
        note: 'Read the exact list of packages before you install them. Knowing what should be there makes errors obvious.',
      },
    ],
    actions: [
      'Inside the Deep-Live-Cam folder, run the install command below.',
      'Fix A: when pip fails on onnxruntime-gpu, install the CPU build instead with the second command.',
      'Fix B: if you see "Microsoft Visual C++ 14.0 or greater is required", go back to step 4, then open a new terminal and run the install again.',
      'Let pip finish completely. Do not close the window while wheels are being downloaded.',
    ],
    verify: {
      command: 'python -c "import onnxruntime; print(onnxruntime.get_available_providers())"',
      expect: 'It prints a list that includes CPUExecutionProvider.',
    },
    mistakes: [
      {
        trap: 'ERROR: Could not find a version that satisfies the requirement onnxruntime-gpu==1.26.0',
        fix: 'That GPU build is not published for your setup. Run "pip uninstall -y onnxruntime-gpu" then "pip install onnxruntime" to get the CPU build. Deep-Live-Cam falls back to CPU automatically.',
      },
      {
        trap: 'error: Microsoft Visual C++ 14.0 or greater is required',
        fix: 'The C++ Build Tools are missing or you are in a stale terminal. Finish step 4, close the terminal, open a new one, re-run the install.',
      },
      {
        trap: 'pip screams about a long path being disabled while building insightface.',
        fix: 'Enable long paths, or clone the repo closer to the drive root, for example C:\\dlc. Windows has a 260-character path limit by default.',
      },
    ],
    screenshot: {
      src: SCREENSHOTS.onnxError,
      caption: 'The exact error text you will see. Copy it into your notes — this is the one people give up on.',
    },
    tip: 'If a package fails, copy the last 20 lines of the pip output. Every fix in this course was written from that exact log.',
  },
  {
    id: 'model-files',
    order: 7,
    phase: 'Machine',
    title: 'Download the model files (and dodge the 9-byte trap)',
    outcome: 'Real model weights in the models folder — not empty placeholders.',
    minutes: 12,
    difficulty: 2,
    links: [
      {
        label: 'Model files on HuggingFace',
        url: 'https://huggingface.co/hacksider/deep-live-cam',
        note: 'The official mirror. The old GitHub release links now return an error page, so use this one.',
      },
    ],
    actions: [
      'Create the models folder inside Deep-Live-Cam if it is not there.',
      'Download inswapper_128_fp16.onnx into the models folder. Expect about 277 MB.',
      'Download GFPGANv1.4.pth into the models folder. Expect about 348 MB.',
      'Open each file and check its size before you continue.',
    ],
    verify: {
      command: 'dir models',
      expect: 'inswapper_128_fp16.onnx and GFPGANv1.4.pth are listed with sizes in the hundreds of megabytes.',
    },
    mistakes: [
      {
        trap: 'A model file is exactly 9 bytes.',
        fix: 'That is a Git LFS pointer, not a model. Delete it and re-download from HuggingFace using the link above.',
      },
      {
        trap: 'You downloaded the .onnx but named the folder "model" instead of "models".',
        fix: 'Rename the folder to models. Deep-Live-Cam looks for that exact path.',
      },
      {
        trap: 'Windows renamed the file to inswapper_128_fp16(1).onnx.',
        fix: 'Rename it back to remove the parentheses. The app matches filenames character for character.',
      },
    ],
    tip: 'Download the models last, after the packages. If the model download is slow you can still finish the software setup.',
  },
  {
    id: 'ffmpeg',
    order: 8,
    phase: 'Machine',
    title: 'Install ffmpeg and put it on your PATH',
    outcome: 'The "ffmpeg is not installed" warning is gone for good.',
    minutes: 8,
    difficulty: 2,
    links: [
      {
        label: 'ffmpeg builds for Windows',
        url: 'https://www.gyan.dev/ffmpeg/builds/',
        note: 'Pick the "release essentials" build. It is a zip, not an installer — you place it yourself.',
      },
    ],
    actions: [
      'Download the essentials zip and extract it somewhere permanent, for example C:\\ffmpeg.',
      'Open the extracted folder and go into the bin folder. Copy that full path.',
      'Press the Windows key, type "environment variables", open "Edit the system environment variables".',
      'Click Environment Variables, then under User variables select Path and click Edit.',
      'Click New, paste the bin path, then click OK on every window you opened.',
      'Close every terminal and open a new one.',
    ],
    verify: { command: 'ffmpeg -version', expect: 'It prints an ffmpeg version banner instead of "not recognized".' },
    mistakes: [
      {
        trap: 'You added the ffmpeg root folder instead of the bin folder inside it.',
        fix: 'Edit the Path entry so it ends with \\bin. The exe lives one level deeper than people expect.',
      },
      {
        trap: 'You installed it with winget and got "winget is not recognized".',
        fix: 'App Installer is missing. Download the zip manually and follow the steps above.',
      },
      {
        trap: 'You extracted ffmpeg into your Downloads folder.',
        fix: 'Move it somewhere you will never clean up, like C:\\ffmpeg. Deleting it later silently breaks the app.',
      },
    ],
    tip: 'Never put ffmpeg inside the project folder. Keep it separate so cloning a fresh repo does not wipe your setup.',
  },
  {
    id: 'first-launch',
    order: 9,
    phase: 'Machine',
    title: 'First launch: hit Live and meet yourself',
    outcome: 'A preview window showing a swapped face driven by your own webcam.',
    minutes: 10,
    difficulty: 2,
    links: [],
    actions: [
      'In the Deep-Live-Cam folder run the start command below.',
      'The first launch loads models, so the window may say "Not Responding". Wait 2 to 3 minutes before touching it.',
      'Click "Select a face" and choose a front-facing image of a face you own, licensed, or generated from thispersondoesnotexist.com.',
      'Click "Live". Allow camera access if Windows asks.',
      'Lower the resolution to 640x480 if the preview stutters, and set the execution provider to CPU.',
    ],
    verify: {
      command: 'python run.py --execution-provider cpu',
      expect: 'A window opens with source and target panels, and the Live button turns on your webcam.',
    },
    mistakes: [
      {
        trap: 'You killed the app because it said "Not Responding".',
        fix: 'That is just the CPU loading models. Give it three full minutes before you decide it has crashed.',
      },
      {
        trap: 'You used a photo of a celebrity "just to test".',
        fix: 'Do not. Test with your own face or a synthetic face. The consent rule applies from the very first run.',
      },
      {
        trap: 'The face flickers wildly on movement.',
        fix: 'That is the CPU limit. Keep head movement slow, drop to 640x480, and prefer recording over live calls.',
      },
    ],
    tip: 'Record a 15-second clip of yourself here. It becomes your "before" proof and a great thing to show a client.',
  },
  {
    id: 'obs-virtual-camera',
    order: 10,
    phase: 'Studio',
    title: 'Turn your persona into a camera any app can use',
    outcome: 'OBS Virtual Camera selected inside Zoom, Meet or Discord, showing your swapped face.',
    minutes: 15,
    difficulty: 2,
    links: [
      {
        label: 'OBS Studio download',
        url: 'https://obsproject.com/download',
        note: 'Free and open source. On Windows, accept the automatic configuration wizard defaults.',
      },
    ],
    actions: [
      'Install OBS Studio and let it run the auto-configuration wizard on first start.',
      'Leave Deep-Live-Cam running with the preview window open and the Live button active.',
      'In OBS, under Sources click the plus button and choose Window Capture, then OK.',
      'In the Window dropdown pick the Deep-Live-Cam preview entry, which appears as [python.exe]: ...',
      'If the capture is black, change Capture Method to "Windows 10 (1903 and up)".',
      'In Settings, then Video, set the base and output resolution to 640x480 and the FPS to 15.',
      'Click Start Virtual Camera in the Controls panel at the bottom right.',
    ],
    verify: {
      command: 'obs64.exe --startvirtualcam',
      expect: 'Open any camera app — OBS Virtual Camera now appears in the camera dropdown.',
    },
    mistakes: [
      {
        trap: 'The Window dropdown cannot find the Deep-Live-Cam window.',
        fix: 'Click Live in Deep-Live-Cam first, then reopen the dropdown. The preview window only exists while Live is running.',
      },
      {
        trap: 'You captured your whole monitor and shared your private desktop by accident.',
        fix: 'Use Window Capture, never Display Capture, and crop with a Crop/Pad filter if the edges look rough.',
      },
      {
        trap: 'Zoom refuses to see OBS Virtual Camera.',
        fix: 'Start the virtual camera before opening Zoom. If Zoom is already open, close and reopen it.',
      },
    ],
    tip: 'Add a second Scene with a plain background image. You can switch to it instantly if something goes wrong on a call.',
  },
  {
    id: 'vb-cable',
    order: 11,
    phase: 'Voice',
    title: 'Install VB-Cable so you own a virtual microphone',
    outcome: 'A microphone in Windows called CABLE Output that any call app can listen to.',
    minutes: 10,
    difficulty: 2,
    links: [
      {
        label: 'VB-CABLE Virtual Audio Device',
        url: 'https://vb-audio.com/Cable/',
        note: 'Free donationware from VB-Audio. Download the driver pack, not the "Hi-Fi Cables" bundle.',
      },
    ],
    actions: [
      'Download the VB-CABLE Driver Pack zip and extract it.',
      'Right-click VBCABLE_Setup_x64.exe and choose Run as administrator. It will silently fail without admin rights.',
      'Click Install Driver and accept the driver prompt.',
      'Restart your PC. This step is not optional.',
      'After the restart, right-click the speaker icon, open Sound settings, then Input, and look for CABLE Output.',
    ],
    verify: {
      command: 'control mmsys.cpl,,1',
      expect: 'A Recording tab opens listing CABLE Output (VB-Audio Virtual Cable).',
    },
    mistakes: [
      {
        trap: 'You installed it without administrator rights and nothing appeared.',
        fix: 'Re-run the installer with Right-click, Run as administrator, then reboot again.',
      },
      {
        trap: 'You skipped the restart.',
        fix: 'Reboot. Audio drivers are loaded at boot; without it the device will never appear.',
      },
      {
        trap: 'You set CABLE Input as your default playback device and lost all sound.',
        fix: 'CABLE Input is where audio goes in. CABLE Output is where you listen. Route apps deliberately, not globally.',
      },
    ],
  },
  {
    id: 'rvc',
    order: 12,
    phase: 'Voice',
    title: 'Install RVC beside Python 3.10 without breaking it',
    outcome: 'A realtime voice conversion window routing your converted voice into CABLE Input.',
    minutes: 25,
    difficulty: 3,
    links: [
      {
        label: 'Python 3.12 downloads',
        url: 'https://www.python.org/downloads/windows/',
        note: 'RVC needs 3.12. Install it WITHOUT ticking "Add to PATH" so python still means 3.10.11.',
      },
      {
        label: 'RVC WebUI on GitHub',
        url: 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI',
        note: 'The official project. Read the requirements file names carefully — one of them is spelled unusually.',
      },
      {
        label: 'RVC pretrained assets',
        url: 'https://huggingface.co/lj1995/VoiceConversionWebUI',
        note: 'hubert_base and rmvpe live here. Download with the huggingface_hub CLI, not by clicking around.',
      },
    ],
    actions: [
      'Install Python 3.12 from the link above, leaving "Add python.exe to PATH" unticked.',
      'Clone the RVC repository and create a virtual environment with "py -3.12 -m venv .venv".',
      'Activate the environment, then upgrade pip, setuptools and wheel.',
      'Install the CPU requirements file for Python 3.12.',
      'Install huggingface_hub and download hubert_base into assets, and rmvpe.pt plus rmvpe.onnx into assets/rmvpe.',
      'Copy your voice model .pth into assets/weights and its .index into assets/indices.',
      'Run realtime_gui.py and set the input to your real microphone and the output to CABLE Input.',
    ],
    verify: {
      command: 'py -3.12 -m venv .venv && .venv\\Scripts\\activate && python -m pip install -r requirments_cpu_py312.txt',
      expect: 'Packages install inside the .venv and "python --version" still reports 3.10.11 outside it.',
    },
    mistakes: [
      {
        trap: 'You ticked "Add to PATH" for Python 3.12 and now Deep-Live-Cam breaks.',
        fix: 'Uninstall 3.12, reinstall it without ticking the box, and always call it as "py -3.12".',
      },
      {
        trap: 'A requirements file name looks misspelled and you "fixed" it.',
        fix: 'Do not fix it. The repo genuinely ships a file named requirments_cpu_py312.txt — that spelling is correct.',
      },
      {
        trap: 'You trained a voice model on your CPU and waited three days.',
        fix: 'Train on a free cloud GPU instead, then download only the .pth and .index files.',
      },
      {
        trap: 'You used a voice model of a celebrity.',
        fix: 'Only your own voice or a licensed model. This is the fastest way to lose access and to break the law.',
      },
    ],
    tip: 'Start with the largest buffer size in realtime_gui. Expect 200 to 400 ms of latency on a CPU — record instead of going live if it stutters.',
  },
  {
    id: 'go-live',
    order: 13,
    phase: 'Go live',
    title: 'Run the full persona in a real call',
    outcome: 'A live call where your face and your voice are both your persona, in the right start order.',
    minutes: 12,
    difficulty: 2,
    links: [
      {
        label: 'Synthetic faces (nobody real)',
        url: 'https://thispersondoesnotexist.com',
        note: 'Refresh for a brand new face, then save the image. No real person is behind it.',
      },
    ],
    actions: [
      'Start Deep-Live-Cam and click Live so the preview is running.',
      'Start OBS and click Start Virtual Camera.',
      'Start RVC realtime_gui with your model loaded and CABLE Input as the output device.',
      'Now open the call app: set the camera to OBS Virtual Camera and the microphone to CABLE Output.',
      'Do a 30-second test call to yourself. Then disclose to your audience that the persona is AI.',
    ],
    verify: {
      command: 'control mmsys.cpl,,0',
      expect: 'CABLE Input appears under Playback and OBS Virtual Camera appears in your call app camera list.',
    },
    mistakes: [
      {
        trap: 'You opened the call app first and your real webcam got locked.',
        fix: 'Follow the start order above exactly. Whoever grabs the webcam first keeps it.',
      },
      {
        trap: 'You used speakers instead of headphones with the voice pipeline.',
        fix: 'Headphones only, or the converted voice loops back into the microphone and howls.',
      },
      {
        trap: 'You never told anyone the persona is AI.',
        fix: 'Disclose on every platform. It is required by YouTube, TikTok and Meta, and by the terms you agreed to here.',
      },
    ],
    tip: 'Keep a one-page checklist taped to your desk. On a CPU, remembering the start order saves a full reboot.',
  },
];

/** Quick lookup by phase, used by the roadmap filter chips. */
export const SETUP_PHASES = ['Prepare', 'Install', 'Machine', 'Studio', 'Voice', 'Go live'] as const;

export function getTotalSetupMinutes(): number {
  return SETUP_STEPS.reduce((sum, step) => sum + step.minutes, 0);
}

export function getTotalMistakes(): number {
  return SETUP_STEPS.reduce((sum, step) => sum + step.mistakes.length, 0);
}

/* ------------------------------------------------------------------ */
/* Download hub — every official link, with the check that proves it   */
/* ------------------------------------------------------------------ */

export interface DownloadItem {
  id: string;
  name: string;
  what: string;
  url: string;
  size: string;
  /** What you should see once it is correctly installed. */
  proof: string;
  tone: 'indigo' | 'teal' | 'amber' | 'rose' | 'emerald' | 'slate';
  icon: 'key' | 'terminal' | 'layers' | 'face' | 'plug' | 'video' | 'mic' | 'sliders' | 'image' | 'folder' | 'shield';
}

export const DOWNLOADS: DownloadItem[] = [
  {
    id: 'python310',
    name: 'Python 3.10.11',
    what: 'The exact interpreter Deep-Live-Cam was built against. Version 3.14 will not work.',
    url: 'https://www.python.org/downloads/release/python-31011/',
    size: '27.7 MB',
    proof: 'python --version prints Python 3.10.11',
    tone: 'indigo',
    icon: 'key',
  },
  {
    id: 'git',
    name: 'Git for Windows',
    what: 'Lets one command pull a whole project from GitHub onto your Desktop.',
    url: 'https://git-scm.com/download/win',
    size: '62 MB',
    proof: 'git --version prints a version number',
    tone: 'amber',
    icon: 'terminal',
  },
  {
    id: 'cpp',
    name: 'MS C++ Build Tools',
    what: 'Compiles the native code inside insightface so pip can finish.',
    url: 'https://visualstudio.microsoft.com/visual-cpp-build-tools/',
    size: '6.75 GB',
    proof: 'pip finishes without "Visual C++ 14.0 required"',
    tone: 'slate',
    icon: 'layers',
  },
  {
    id: 'dlc',
    name: 'Deep-Live-Cam',
    what: 'The open-source real-time face swap application itself.',
    url: 'https://github.com/hacksider/Deep-Live-Cam',
    size: 'Repo',
    proof: 'run.py and models exist in the cloned folder',
    tone: 'indigo',
    icon: 'face',
  },
  {
    id: 'models',
    name: 'Face swap models',
    what: 'inswapper_128_fp16.onnx and GFPGANv1.4.pth — the actual weights.',
    url: 'https://huggingface.co/hacksider/deep-live-cam',
    size: '277 MB + 348 MB',
    proof: 'Neither file is 9 bytes',
    tone: 'emerald',
    icon: 'image',
  } as DownloadItem,
  {
    id: 'ffmpeg',
    name: 'ffmpeg (essentials)',
    what: 'Handles the video plumbing. Put the bin folder on your PATH.',
    url: 'https://www.gyan.dev/ffmpeg/builds/',
    size: '85 MB zip',
    proof: 'ffmpeg -version prints a banner',
    tone: 'rose',
    icon: 'sliders',
  },
  {
    id: 'obs',
    name: 'OBS Studio',
    what: 'Captures the face-swap window and exposes it as a virtual camera.',
    url: 'https://obsproject.com/download',
    size: '150 MB',
    proof: 'OBS Virtual Camera appears in your call app',
    tone: 'slate',
    icon: 'video',
  },
  {
    id: 'vbcable',
    name: 'VB-CABLE Driver',
    what: 'A virtual microphone other apps can listen to.',
    url: 'https://vb-audio.com/Cable/',
    size: '10 MB',
    proof: 'CABLE Output is listed under Input devices',
    tone: 'teal',
    icon: 'plug',
  },
  {
    id: 'python312',
    name: 'Python 3.12',
    what: 'Needed only for RVC. Install without ticking Add to PATH.',
    url: 'https://www.python.org/downloads/windows/',
    size: '25 MB',
    proof: 'py -3.12 --version works while python stays 3.10.11',
    tone: 'indigo',
    icon: 'key',
  },
  {
    id: 'rvc',
    name: 'RVC WebUI',
    what: 'Retrieval-based voice conversion, the real-time voice pipeline.',
    url: 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI',
    size: 'Repo',
    proof: 'realtime_gui.py opens a control window',
    tone: 'teal',
    icon: 'mic',
  },
  {
    id: 'rvcmodels',
    name: 'RVC pretrained assets',
    what: 'hubert_base and rmvpe — required before any voice conversion runs.',
    url: 'https://huggingface.co/lj1995/VoiceConversionWebUI',
    size: '~1 GB',
    proof: 'assets/hubert_base and assets/rmvpe are populated',
    tone: 'amber',
    icon: 'folder',
  } as DownloadItem,
  {
    id: 'synthetic',
    name: 'Synthetic faces',
    what: 'Free AI-generated faces with nobody real behind them. Consent-safe.',
    url: 'https://thispersondoesnotexist.com',
    size: 'Free',
    proof: 'You saved a face image you are allowed to use',
    tone: 'emerald',
    icon: 'shield',
  } as DownloadItem,
];






/* ------------------------------------------------------------------ */
/* The Mistake Vault — every real failure, decoded                     */
/* ------------------------------------------------------------------ */

export interface ErrorEntry {
  id: string;
  /** Exactly what you will see on screen. */
  symptom: string;
  cause: string;
  fix: string;
  command?: string;
  severity: 'blocker' | 'annoying' | 'cosmetic';
  where: 'Install' | 'Packages' | 'Models' | 'Runtime' | 'OBS' | 'Voice';
}

export const MISTAKE_VAULT: ErrorEntry[] = [
  {
    id: 'python-not-recognized',
    symptom: "'python' is not recognized as an internal or external command",
    cause: 'The "Add python.exe to PATH" box was not ticked during install.',
    fix: 'Re-run the Python 3.10.11 installer, choose Modify, tick that box, finish, then open a brand new terminal.',
    command: 'python --version',
    severity: 'blocker',
    where: 'Install',
  },
  {
    id: 'wrong-python-version',
    symptom: 'python --version prints 3.14 or 3.12 instead of 3.10.11',
    cause: 'Another Python is first on your PATH.',
    fix: 'Call 3.10.11 explicitly, or reinstall it above the others. Never let 3.12 become the default.',
    command: 'py -3.10 --version',
    severity: 'blocker',
    where: 'Install',
  },
  {
    id: 'onnxruntime-gpu-missing',
    symptom: 'ERROR: Could not find a version that satisfies the requirement onnxruntime-gpu==1.26.0',
    cause: 'That GPU build is not published for your machine.',
    fix: 'Swap to the CPU build. Deep-Live-Cam detects it and uses CPUExecutionProvider automatically.',
    command: 'pip uninstall -y onnxruntime-gpu && pip install onnxruntime',
    severity: 'blocker',
    where: 'Packages',
  },
  {
    id: 'vcredist-14',
    symptom: 'error: Microsoft Visual C++ 14.0 or greater is required',
    cause: 'Build Tools are missing, unfinished, or the terminal predates the install.',
    fix: 'Finish the C++ Build Tools workload, close every terminal, open a new one and re-run pip.',
    severity: 'blocker',
    where: 'Packages',
  },
  {
    id: 'nine-byte-model',
    symptom: 'The face swap window opens, then closes with a model error',
    cause: 'A model file is exactly 9 bytes — a Git LFS pointer, not weights.',
    fix: 'Delete both model files and re-download them from the HuggingFace mirror in the roadmap.',
    command: 'dir models',
    severity: 'blocker',
    where: 'Models',
  },
  {
    id: 'ffmpeg-missing',
    symptom: 'ffmpeg is not installed, or "ffmpeg" is not recognized',
    cause: 'ffmpeg is not installed, or the bin folder is not on your PATH.',
    fix: 'Re-add the bin folder to Path, then open a new terminal. The exe lives inside bin, not the root folder.',
    command: 'ffmpeg -version',
    severity: 'annoying',
    where: 'Runtime',
  },
  {
    id: 'winget-missing',
    symptom: "'winget' is not recognized as an internal or external command",
    cause: 'App Installer is missing on your Windows build.',
    fix: 'Stop trying to winget-install things. Download the zip builds manually and place them yourself.',
    severity: 'annoying',
    where: 'Install',
  },
  {
    id: 'long-path',
    symptom: 'pip fails while building insightface with a path or filename error',
    cause: 'Windows 260-character path limit plus a deep clone location.',
    fix: 'Clone closer to the drive root, for example C:\\dlc, or enable long paths in Windows.',
    severity: 'blocker',
    where: 'Packages',
  },
  {
    id: 'not-responding',
    symptom: 'The Deep-Live-Cam window says "Not Responding" on launch',
    cause: 'The CPU is loading multi-hundred-megabyte models. This is expected.',
    fix: 'Wait two to three minutes. Do not click anything, and do not force-close the window.',
    severity: 'cosmetic',
    where: 'Runtime',
  },
  {
    id: 'choppy-video',
    symptom: 'The preview runs at one or two frames per second',
    cause: 'You are on the CPU path, which this course was recorded on.',
    fix: 'Drop to 640x480, close Chrome and other heavy apps, and record short clips instead of going live.',
    severity: 'annoying',
    where: 'Runtime',
  },
  {
    id: 'camera-in-use',
    symptom: 'Camera is in use by another application',
    cause: 'A call app or browser grabbed the webcam first.',
    fix: 'Close every app using the camera, then start Deep-Live-Cam first. Follow the start order.',
    severity: 'blocker',
    where: 'Runtime',
  },
  {
    id: 'obs-black',
    symptom: 'OBS window capture shows a black rectangle',
    cause: 'The capture method is wrong for your Windows build.',
    fix: 'Set Capture Method to "Windows 10 (1903 and up)". If it is still black, use Display Capture and crop.',
    severity: 'annoying',
    where: 'OBS',
  },
  {
    id: 'obs-window-missing',
    symptom: 'The OBS Window dropdown cannot find Deep-Live-Cam',
    cause: 'The preview window only exists while Live is running.',
    fix: 'Click Live in Deep-Live-Cam, then reopen the OBS dropdown without closing OBS.',
    severity: 'annoying',
    where: 'OBS',
  },
  {
    id: 'zoom-ignores-camera',
    symptom: 'Zoom does not list OBS Virtual Camera',
    cause: 'Zoom was already running when the virtual camera started.',
    fix: 'Stop the virtual camera, quit Zoom completely, start the virtual camera, then open Zoom.',
    severity: 'annoying',
    where: 'OBS',
  },
  {
    id: 'cable-missing',
    symptom: 'CABLE Output does not appear in Sound settings',
    cause: 'VB-Cable was installed without administrator rights, or the PC was never restarted.',
    fix: 'Re-run VBCABLE_Setup_x64.exe as administrator and reboot. The device only loads at boot.',
    severity: 'blocker',
    where: 'Voice',
  },
  {
    id: 'audio-feedback',
    symptom: 'A loud howling or ringing during voice conversion',
    cause: 'Your microphone is hearing your speakers.',
    fix: 'Use headphones. Never monitor the converted voice through laptop speakers.',
    severity: 'blocker',
    where: 'Voice',
  },
  {
    id: 'rvc-requirements-name',
    symptom: 'FileNotFoundError: requirments_cpu_py312.txt',
    cause: 'You "corrected" the spelling of a file that is genuinely spelled that way.',
    fix: 'Restore the original name. The typo is in the upstream repo, not on your machine.',
    severity: 'annoying',
    where: 'Voice',
  },
  {
    id: 'voice-latency',
    symptom: 'The converted voice arrives late or stutters',
    cause: 'CPU-only real-time inference, typically 200 to 400 ms plus buffer.',
    fix: 'Raise the buffer in realtime_gui, close background apps, or convert recorded audio instead of live.',
    severity: 'annoying',
    where: 'Voice',
  },
  {
    id: 'blurry-swap',
    symptom: 'The swapped face looks soft, smeared or washed out',
    cause: 'GFPGAN upscaling is off, or the source face image is low quality.',
    fix: 'Use a sharp, front-facing, well-lit source image and keep the face enhancer enabled.',
    severity: 'annoying',
    where: 'Runtime',
  },
  {
    id: 'model-not-found-dir',
    symptom: 'Model file not found, even though you downloaded it',
    cause: 'The file is in a folder named model instead of models, or nested one level too deep.',
    fix: 'Put both files directly in Deep-Live-Cam\\models with their original names.',
    command: 'dir models',
    severity: 'blocker',
    where: 'Models',
  },
  {
    id: 'zoom-crop',
    symptom: 'Your persona is visible in a tiny corner of a call window',
    cause: 'The captured window includes the whole app frame, not just the preview.',
    fix: 'Apply a Crop/Pad filter in OBS so the source fills the frame edge to edge.',
    severity: 'cosmetic',
    where: 'OBS',
  },
  {
    id: 'not-disclosing',
    symptom: 'Your content gets flagged or demonetised on a platform',
    cause: 'AI-generated media was published without the platform disclosure label.',
    fix: 'Turn on the AI-content disclosure setting and state it in the description. Consent and labels are non-negotiable here.',
    severity: 'blocker',
    where: 'Install',
  },
];

export const ERROR_LOCATIONS = ['Install', 'Packages', 'Models', 'Runtime', 'OBS', 'Voice'] as const;

/* ------------------------------------------------------------------ */
/* Command Center — copy/paste blocks grouped by phase                  */
/* ------------------------------------------------------------------ */

export interface CommandPhase {
  id: string;
  title: string;
  summary: string;
  icon: 'terminal' | 'layers' | 'folder' | 'video' | 'mic' | 'plug';
  commands: { label: string; code: string; note: string }[];
}

export const COMMAND_PHASES: CommandPhase[] = [
  {
    id: 'verify',
    title: '1. Prove the tools exist',
    summary: 'Run these in a brand new Command Prompt before you install anything else.',
    icon: 'terminal',
    commands: [
      { label: 'Python version', code: 'python --version', note: 'Must print exactly Python 3.10.11.' },
      { label: 'Git version', code: 'git --version', note: 'Any 2.x version is fine.' },
      { label: 'ffmpeg version', code: 'ffmpeg -version', note: 'A banner, not "not recognized".' },
      { label: 'Windows version', code: 'winver', note: 'Confirms Windows 10 or 11.' },
    ],
  },
  {
    id: 'clone',
    title: '2. Clone the project',
    summary: 'One command, run from your Desktop. The path matters more than people think.',
    icon: 'folder',
    commands: [
      {
        label: 'Clone Deep-Live-Cam',
        code: 'cd %USERPROFILE%\\Desktop\ngit clone https://github.com/hacksider/Deep-Live-Cam.git\ncd Deep-Live-Cam\ndir',
        note: 'You should see run.py, requirements.txt and models.',
      },
      {
        label: 'Check the models folder',
        code: 'dir models',
        note: 'Both files must be hundreds of megabytes, never 9 bytes.',
      },
    ],
  },
  {
    id: 'packages',
    title: '3. Install packages and fix the two errors',
    summary: 'The install that makes people quit. Both fixes are here, in order.',
    icon: 'layers',
    commands: [
      { label: 'Install requirements', code: 'pip install -r requirements.txt', note: 'Let it run to the very end.' },
      {
        label: 'Fix A: CPU onnxruntime',
        code: 'pip uninstall -y onnxruntime-gpu\npip install onnxruntime',
        note: 'Replaces the GPU build that does not exist for your machine.',
      },
      {
        label: 'Confirm the provider',
        code: 'python -c "import onnxruntime; print(onnxruntime.get_available_providers())"',
        note: 'Look for CPUExecutionProvider in the list.',
      },
      {
        label: 'Fix B: compiler check',
        code: 'python -c "import setuptools, sys; print(sys.version)"',
        note: 'Run this in a NEW terminal after Build Tools finishes.',
      },
    ],
  },
  {
    id: 'voice',
    title: '4. Voice pipeline setup',
    summary: 'Python 3.12 lives beside 3.10. Never let it become the default.',
    icon: 'mic',
    commands: [
      {
        label: 'Clone RVC and create the venv',
        code: 'cd %USERPROFILE%\\Desktop\ngit clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git\ncd Retrieval-based-Voice-Conversion-WebUI\npy -3.12 -m venv .venv\n.venv\\Scripts\\activate\npython -m pip install --upgrade pip setuptools wheel',
        note: 'The prompt shows (.venv) when activation works.',
      },
      {
        label: 'Install CPU requirements',
        code: 'python -m pip install -r requirments_cpu_py312.txt',
        note: 'Yes, "requirments" is spelled that way upstream. Leave it alone.',
      },
      {
        label: 'Download hubert and rmvpe',
        code: 'python -m pip install --upgrade huggingface_hub\nhf download lj1995/VoiceConversionWebUI --revision main --include "hubert_base/*" --local-dir assets\nhf download lj1995/VoiceConversionWebUI rmvpe.pt --revision main --local-dir assets/rmvpe\nhf download lj1995/VoiceConversionWebUI rmvpe.onnx --revision main --local-dir assets/rmvpe',
        note: 'Then drop your .pth into assets\\weights and your .index into assets\\indices.',
      },
      {
        label: 'Start real-time conversion',
        code: 'python realtime_gui.py',
        note: 'Input: your real microphone. Output: CABLE Input.',
      },
    ],
  },
  {
    id: 'run',
    title: '5. Start the persona',
    summary: 'Order matters. Whoever touches the webcam first keeps it.',
    icon: 'video',
    commands: [
      {
        label: 'Start the face swap on CPU',
        code: 'cd %USERPROFILE%\\Desktop\\Deep-Live-Cam\npython run.py --execution-provider cpu',
        note: 'Then click Live. Wait 2 to 3 minutes for the models to load.',
      },
      {
        label: 'Open sound settings to route audio',
        code: 'control mmsys.cpl,,0',
        note: 'Playback tab. CABLE Input should be listed.',
      },
      {
        label: 'Open the microphone list',
        code: 'control mmsys.cpl,,1',
        note: 'Recording tab. CABLE Output should be listed.',
      },
      {
        label: 'Open camera and microphone privacy',
        code: 'start ms-settings:privacy-webcam',
        note: 'If the camera is blocked, allow desktop apps here.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Call app recipes and the start order                                 */
/* ------------------------------------------------------------------ */

export interface CallRecipe {
  app: string;
  camera: string;
  microphone: string;
  gotcha: string;
}

export const CALL_RECIPES: CallRecipe[] = [
  {
    app: 'Zoom',
    camera: 'Settings, then Video, then Camera, then OBS Virtual Camera',
    microphone: 'Settings, then Audio, then Microphone, then CABLE Output',
    gotcha: 'Zoom must be closed and reopened if the virtual camera started after it.',
  },
  {
    app: 'Google Meet',
    camera: 'Camera dropdown inside the call, then OBS Virtual Camera',
    microphone: 'Microphone dropdown, then CABLE Output',
    gotcha: 'Grant camera permission to your browser or Meet silently shows a black frame.',
  },
  {
    app: 'Discord',
    camera: 'Settings, then Voice and Video, then Camera, then OBS Virtual Camera',
    microphone: 'Input Device, then CABLE Output, and turn noise suppression off',
    gotcha: 'Discord noise suppression mangles converted voices. Disable it.',
  },
  {
    app: 'Microsoft Teams',
    camera: 'Settings, then Devices, then Camera',
    microphone: 'Settings, then Devices, then Microphone',
    gotcha: 'Teams caches devices. Close it fully from the tray icon before switching.',
  },
  {
    app: 'Streaming (OBS to YouTube or Twitch)',
    camera: 'Not needed — stream the OBS scene itself',
    microphone: 'CABLE Output as the audio input source inside OBS',
    gotcha: 'Add a short AI-disclosure line to your stream title or description.',
  },
];

export const START_ORDER = [
  'Deep-Live-Cam — Live clicked, preview window open',
  'OBS — window capture added, Start Virtual Camera pressed',
  'RVC realtime_gui — model loaded, output set to CABLE Input',
  'OBS audio — CABLE Output added as the microphone source',
  'The call app — OBS Virtual Camera and CABLE Output selected last',
];


