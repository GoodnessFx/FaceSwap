import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Icon } from '../components/ui/Icon';
import { EduWarning } from '../components/EduWarning';
import { MODULES } from '../config/courses';

const freeLesson = MODULES[0].lessons[0];

export function FreeLesson() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
            <Link to="/" className="hover:text-[#4F46E5]">Home</Link>
            <span>/</span>
            <span>Free Lesson</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success">Free</Badge>
            <span className="text-sm text-[#94A3B8]">{freeLesson.estimatedMinutes} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-display text-[#0B1220] mb-4">
            {freeLesson.title}
          </h1>

          <p className="text-[#64748B] text-lg mb-8 leading-relaxed">
            This is the first lesson of FaceSwap Studio — completely free. You'll learn the rules,
            set expectations, and understand what you're getting into.
          </p>

          <EduWarning compact />

          <div className="mt-10 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <div className="my-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                    <img src={src} alt={alt || ''} className="h-auto w-full" loading="lazy" />
                    {alt && <p className="px-3 py-2 text-center text-xs text-[#94A3B8]">{alt}</p>}
                  </div>
                ),
                table: ({ children }) => (
                  <div className="no-scrollbar my-6 overflow-x-auto rounded-xl border border-[#E2E8F0]">
                    <table className="w-full min-w-[520px] border-collapse text-sm">{children}</table>
                  </div>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="break-anywhere font-medium text-[#4F46E5] underline decoration-[#C7D2FE] underline-offset-2 hover:decoration-[#4F46E5]"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {freeLesson.content}
            </ReactMarkdown>
          </div>

          {/* Sign-up prompt */}
          <div className="mt-14 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-center sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
              <Icon name="book" size={24} />
            </div>
            <h2 className="mb-3 font-display text-xl font-black text-[#0B1220] sm:text-2xl">
              Ready for the full course?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#64748B]">
              The next lesson covers installation — Python 3.10.11, Git, and the two errors you will
              almost certainly hit. Unlock every lesson, screenshot and command in one payment.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/pricing">
                <Button size="lg" className="w-full justify-center sm:w-auto">
                  See pricing
                  <Icon name="arrowRight" size={15} />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="w-full justify-center sm:w-auto">
                  Create free account
                </Button>
              </Link>
            </div>
          </div>

          {/* What's next */}
          <div className="mt-10">
            <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Up next</p>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4 hover:border-[#C7C4FE] transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#4F46E5]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 7V5a3 3 0 00-6 0v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1h-1zm-5-2a2 2 0 014 0v2H6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0B1220] text-sm">Install Python 3.10.11</p>
                <p className="text-xs text-[#94A3B8]">Module 2, Lesson 1 · 10 min</p>
              </div>
              <Badge variant="primary">Paid</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
