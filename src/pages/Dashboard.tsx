import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { EduWarning } from '../components/EduWarning';
import { MODULES, getAllLessons } from '../config/courses';

const MOCK_USER = {
  name: 'Ada Okafor',
  email: 'ada@example.com',
  tier: 'complete',
  tierName: 'Complete Course',
  purchasedAt: '2024-11-15',
  completedLessons: new Set(['start-here/introduction', 'start-here/what-to-expect', 'install-tools/python']),
};

export function Dashboard() {
  const allLessons = getAllLessons();
  const totalLessons = allLessons.filter((l) => l.tier !== 'business').length;
  const completedCount = MOCK_USER.completedLessons.size;
  const pct = Math.round((completedCount / totalLessons) * 100);

  const continueLesson = allLessons.find(
    (l) => !MOCK_USER.completedLessons.has(`${l.moduleSlug}/${l.slug}`) && l.tier !== 'business'
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-[#94A3B8] mb-1">Welcome back</p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#0B1220]">
              {MOCK_USER.name}
            </h1>
            <Badge variant="primary">{MOCK_USER.tierName}</Badge>
          </div>
        </div>

        {/* Progress overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="sm:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-0.5">Overall progress</p>
                <p className="font-black font-display text-[#0B1220] text-2xl">{pct}% complete</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#94A3B8]">{completedCount} of {totalLessons} lessons</p>
              </div>
            </div>
            <ProgressBar value={completedCount} max={totalLessons} showPercent={false} />
            {continueLesson && (
              <div className="mt-4">
                <Link to={`/course/${continueLesson.moduleSlug}/${continueLesson.slug}`}>
                  <Button size="sm">
                    Continue: {continueLesson.title}
                    <Icon name="arrowRight" size={13} />
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Your plan</p>
              <p className="font-bold font-display text-[#0B1220]">{MOCK_USER.tierName}</p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Purchased {new Date(MOCK_USER.purchasedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <Link to="/pricing" className="mt-4">
              <Button size="sm" variant="secondary" className="w-full justify-center">Upgrade</Button>
            </Link>
          </Card>
        </div>

        {/* Modules */}
        <h2 className="text-lg font-bold font-display text-[#0B1220] mb-4">Course modules</h2>
        <div className="space-y-3 mb-8">
          {MODULES.map((mod) => {
            const tierLocked = mod.tier === 'business' && MOCK_USER.tier !== 'business';
            const completedInModule = mod.lessons.filter((l) =>
              MOCK_USER.completedLessons.has(`${mod.slug}/${l.slug}`)
            ).length;
            const modPct = Math.round((completedInModule / mod.lessons.length) * 100);

            return (
              <div
                key={mod.slug}
                className={[
                  'bg-white rounded-2xl border p-5',
                  tierLocked ? 'border-[#F1F5F9] opacity-60' : 'border-[#E2E8F0]',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold font-display text-[#0B1220] text-sm">{mod.title}</h3>
                      {tierLocked && <Badge variant="warning">Business only</Badge>}
                    </div>
                    <p className="text-xs text-[#94A3B8]">{mod.lessons.length} lessons</p>
                  </div>
                  <span className="text-sm font-bold text-[#4F46E5]">{modPct}%</span>
                </div>
                <ProgressBar value={completedInModule} max={mod.lessons.length} showPercent={false} size="sm" />
                {!tierLocked && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {mod.lessons.slice(0, 3).map((lesson) => {
                      const done = MOCK_USER.completedLessons.has(`${mod.slug}/${lesson.slug}`);
                      return (
                        <Link
                          key={lesson.slug}
                          to={`/course/${mod.slug}/${lesson.slug}`}
                          className={[
                            'text-xs px-2.5 py-1 rounded-lg transition-colors',
                            done
                              ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
                              : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#C7C4FE]',
                          ].join(' ')}
                        >
                          {done && (
                            <Icon name="check" size={11} className="mr-1 inline-block align-[-2px]" />
                          )}
                          {lesson.title}
                        </Link>
                      );
                    })}
                    {mod.lessons.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0]">
                        +{mod.lessons.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <EduWarning compact />
      </div>
    </div>
  );
}
