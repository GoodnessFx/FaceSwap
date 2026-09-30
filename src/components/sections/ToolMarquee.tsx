import { Icon, type IconName } from '../ui/Icon';

const TOOLS: { name: string; icon: IconName }[] = [
  { name: 'Deep-Live-Cam', icon: 'face' },
  { name: 'OBS Studio', icon: 'video' },
  { name: 'RVC', icon: 'mic' },
  { name: 'VB-Cable', icon: 'plug' },
  { name: 'ffmpeg', icon: 'sliders' },
  { name: 'Python 3.10.11', icon: 'terminal' },
  { name: 'Git', icon: 'layers' },
  { name: 'HuggingFace', icon: 'folder' },
  { name: 'Build Tools', icon: 'cpu' },
  { name: 'Zoom', icon: 'monitor' },
  { name: 'Google Meet', icon: 'video' },
  { name: 'Discord', icon: 'users' },
];

/**
 * ToolMarquee — an infinite, accessible ticker of the free tools used in the
 * pipeline. The list is duplicated once and translated by 50% so the loop is
 * seamless; it pauses on hover and is disabled under reduced-motion.
 */
export function ToolMarquee() {
  return (
    <section
      aria-label="Free tools used in this course"
      className="border-y border-[#E2E8F0] bg-white py-6"
    >
      <div className="mx-auto mb-4 max-w-6xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
          Built entirely from free, open-source tools
        </p>
      </div>

      <div className="marquee-mask relative overflow-hidden">
        <div className="group flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
              {TOOLS.map((tool) => (
                <span
                  key={`${copy}-${tool.name}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2"
                >
                  <Icon name={tool.icon} size={14} className="text-[#4F46E5]" />
                  <span className="whitespace-nowrap text-[13px] font-semibold text-[#475569]">
                    {tool.name}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
