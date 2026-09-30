import { Link } from 'react-router-dom';
import { EduWarning } from '../EduWarning';

export function Footer() {
  return (
    <footer>
      <EduWarning />
      <div className="bg-[#0B1220] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <circle cx="10" cy="8" r="3.5" stroke="white" strokeWidth="1.5" />
                    <ellipse cx="10" cy="14.5" rx="6" ry="2.5" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="font-display font-bold text-lg">
                  FaceSwap<span className="text-[#4F46E5]">Studio</span>
                </span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
                A practical course for creators who want to build AI persona pipelines using free
                tools on a standard Windows laptop.
              </p>
              <p className="mt-4 text-xs text-[#475569]">
                Copyright {new Date().getFullYear()} FaceSwap Studio. All rights reserved.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-3">Course</p>
              <ul className="space-y-2">
                {[
                  { label: 'The Setup Roadmap', href: '/#roadmap' },
                  { label: 'Download hub', href: '/#downloads' },
                  { label: 'Mistake Vault', href: '/#mistakes' },
                  { label: 'Command Center', href: '/#commands' },
                  { label: 'Curriculum', href: '/#curriculum' },
                  { label: 'Free Lesson', href: '/free-lesson' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Dashboard', href: '/dashboard' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="touch-target flex min-h-[36px] items-center text-sm text-[#94A3B8] transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-3">Legal</p>
              <ul className="space-y-2">
                {[
                  { label: 'Terms of Service', href: '/legal/terms' },
                  { label: 'Privacy Policy', href: '/legal/privacy' },
                  { label: 'Refund Policy', href: '/legal/refund' },
                  { label: 'Acceptable Use', href: '/legal/acceptable-use' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-3 mt-6">Contact</p>
              <a href="mailto:hello@faceswapcourse.com" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                hello@faceswapcourse.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
