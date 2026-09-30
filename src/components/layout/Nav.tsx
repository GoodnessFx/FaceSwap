import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

interface NavLink {
  label: string;
  href: string;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close the menu on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navLinks: NavLink[] = [
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Mistakes', href: '/#mistakes' },
    { label: 'Commands', href: '/#commands' },
    { label: 'Course', href: '/course' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const isLight = !isHeroPage || scrolled;


  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'py-2'
          : 'py-4',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={[
            'flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300',
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border border-[#E2E8F0]'
              : isHeroPage
              ? 'bg-white/10 backdrop-blur-sm border border-white/10'
              : 'bg-white/95 backdrop-blur-md border border-[#E2E8F0]',
          ].join(' ')}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-4.5 h-4.5">
                <circle cx="10" cy="8" r="3.5" stroke="white" strokeWidth="1.5" />
                <ellipse cx="10" cy="14.5" rx="6" ry="2.5" stroke="white" strokeWidth="1.5" />
                <path d="M14.5 6.5l2-2M5.5 6.5l-2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 4.5l1-2M8 4.5l-1-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className={[
                'font-display font-bold text-lg tracking-tight transition-colors',
                isLight ? 'text-[#0B1220]' : 'text-white',
              ].join(' ')}
            >
              FaceSwap<span className="text-[#4F46E5]">Studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const isAnchor = l.href.startsWith('/#');
              const cls = [
                'touch-target flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150',
                isLight
                  ? 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0B1220]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ');

              return isAnchor ? (
                <a key={l.href} href={l.href} className={cls}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} to={l.href} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className={[
                'touch-target flex items-center rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-150',
                isLight
                  ? 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0B1220]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              Login
            </Link>
            <Link to="/pricing">
              <Button size="sm">Get Access</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={[
              'touch-target flex items-center rounded-xl transition-colors md:hidden',
              isLight ? 'text-[#64748B] hover:bg-[#F8FAFC]' : 'text-white/70 hover:bg-white/10',
            ].join(' ')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl md:hidden">
            <nav className="flex flex-col gap-1 p-3">
              {navLinks.map((l) => {
                const isAnchor = l.href.startsWith('/#');
                const cls =
                  'touch-target flex min-h-[44px] items-center rounded-xl px-4 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#0B1220]';

                return isAnchor ? (
                  <a key={l.href} href={l.href} className={cls} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} to={l.href} className={cls}>
                    {l.label}
                  </Link>
                );
              })}

              <Link
                to="/free-lesson"
                className="touch-target flex min-h-[44px] items-center rounded-xl px-4 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#0B1220]"
              >
                Free lesson
              </Link>

              <div className="mt-2 flex flex-col gap-2 border-t border-[#E2E8F0] pt-3">
                <Link
                  to="/login"
                  className="touch-target flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#0B1220]"
                >
                  Login
                </Link>
                <Link to="/pricing">
                  <Button size="sm" className="w-full">
                    Get Access
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

