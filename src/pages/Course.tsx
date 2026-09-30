import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Icon } from '../components/ui/Icon';
import { EduWarning } from '../components/EduWarning';
import { MODULES, getLessonBySlug, getNextLesson, getPrevLesson } from '../config/courses';

function CourseIndex() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Badge variant="primary" className="mb-3">Course</Badge>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-[#0B1220] mb-3">
            AI Persona Studio
          </h1>
          <p className="text-[#64748B]">
            Select a lesson below to continue. Your progress is saved automatically.
          </p>
        </div>

        <div className="space-y-4">
          {MODULES.map((mod, i) => (
            <div key={mod.slug} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
                <span className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-xs font-bold text-[#4F46E5]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-bold font-display text-[#0B1220] text-sm">{mod.title}</p>
                  <p className="text-xs text-[#94A3B8]">{mod.description}</p>
                </div>
              </div>
              <div className="divide-y divide-[#F1F5F9]">
                {mod.lessons.map((lesson, j) => (
                  <Link
                    key={lesson.slug}
                    to={lesson.isFree ? `/free-lesson` : `/course/${mod.slug}/${lesson.slug}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full border border-[#E2E8F0] flex items-center justify-center text-xs text-[#94A3B8] flex-shrink-0">
                      {j + 1}
                    </span>
                    <span className="flex-1 text-sm text-[#374151]">{lesson.title}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[#94A3B8]">{lesson.estimatedMinutes}m</span>
                      {lesson.isFree ? (
                        <Badge variant="success">Free</Badge>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-[#CBD5E1]" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M11 7V5a3 3 0 00-6 0v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1h-1zm-5-2a2 2 0 014 0v2H6V5z" />
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonPage({ moduleSlug, lessonSlug }: { moduleSlug: string; lessonSlug: string }) {
  const lesson = getLessonBySlug(moduleSlug, lessonSlug);
  const [completed, setCompleted] = useState(false);

  if (!lesson) return <Navigate to="/course" replace />;

  const next = getNextLesson(moduleSlug, lessonSlug);
  const prev = getPrevLesson(moduleSlug, lessonSlug);
  const mod = MODULES.find((m) => m.slug === moduleSlug);

  const headings = lesson.content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace('## ', ''));

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-5 flex-wrap">
                <Link to="/course" className="hover:text-[#4F46E5]">Course</Link>
                <span>/</span>
                <Link to="/course" className="hover:text-[#4F46E5]">{mod?.title}</Link>
                <span>/</span>
                <span className="text-[#64748B]">{lesson.title}</span>
              </nav>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {lesson.isFree && <Badge variant="success">Free</Badge>}
                <span className="text-sm text-[#94A3B8]">{lesson.estimatedMinutes} min read</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black font-display text-[#0B1220] mb-8">
                {lesson.title}
              </h1>

              <div className="prose max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ src, alt }) => (
                      <div className="my-6 rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC]">
                        <img
                          src={src}
                          alt={alt || ''}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                        {alt && (
                          <p className="text-xs text-[#94A3B8] text-center py-2 px-3">{alt}</p>
                        )}
                      </div>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes('language-');
                      if (isBlock) {
                        return (
                          <div className="relative group">
                            <pre className="bg-[#0B1220] rounded-xl p-4 overflow-x-auto my-4">
                              <code className="text-[#E2E8F0] text-sm font-mono break-anywhere">{children}</code>
                            </pre>
                            <button
                              onClick={() => navigator.clipboard.writeText(String(children))}
                              className="absolute top-3 right-3 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 text-white/60 hover:text-white rounded-lg transition-all"
                            >
                              Copy
                            </button>
                          </div>
                        );
                      }
                      return (
                        <code className="rounded bg-[#EEF2FF] px-1.5 py-0.5 font-mono text-sm break-anywhere text-[#4F46E5]">
                          {children}
                        </code>
                      );
                    },
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
                  {lesson.content}
                </ReactMarkdown>
              </div>

              {/* Mark complete + navigation */}
              <div className="mt-10 pt-6 border-t border-[#E2E8F0]">
                {!completed ? (
                  <Button onClick={() => setCompleted(true)} variant="accent">
                    <Icon name="check" size={15} />
                    Mark as complete
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-[#10B981]">
                    <Icon name="checkCircle" size={18} />
                    <span className="text-sm font-semibold">Lesson completed</span>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  {prev ? (
                    <Link to={`/course/${prev.moduleSlug}/${prev.lessonSlug}`}>
                      <Button variant="ghost" size="sm">
                        <Icon name="arrowLeft" size={14} />
                        Previous
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next && (
                    <Link to={`/course/${next.moduleSlug}/${next.lessonSlug}`}>
                      <Button size="sm">
                        Next lesson
                        <Icon name="arrowRight" size={14} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Report problem */}
              <div className="mt-8">
                <a
                  href={`mailto:hello@faceswapcourse.com?subject=Problem with lesson: ${lesson.title}`}
                  className="text-xs text-[#94A3B8] hover:text-[#64748B] underline"
                >
                  Report a problem with this lesson
                </a>
              </div>

              <div className="mt-6">
                <EduWarning compact />
              </div>
            </div>

            {/* Table of contents (desktop) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-56 flex-shrink-0">
                <div className="sticky top-28">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                    On this page
                  </p>
                  <ul className="space-y-1.5">
                    {headings.map((h) => (
                      <li key={h}>
                        <a
                          href={`#${h.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-xs text-[#64748B] hover:text-[#4F46E5] transition-colors leading-snug block"
                        >
                          {h}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoursePage() {
  const { moduleSlug, lessonSlug } = useParams<{ moduleSlug?: string; lessonSlug?: string }>();

  if (moduleSlug && lessonSlug) {
    return <LessonPage moduleSlug={moduleSlug} lessonSlug={lessonSlug} />;
  }

  return <CourseIndex />;
}
