import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black font-display text-[#EEF2FF] mb-4">404</p>
        <h1 className="text-2xl font-black font-display text-[#0B1220] mb-3">Page not found</h1>
        <p className="text-[#64748B] mb-8">
          That page doesn't exist. It may have moved or you followed a broken link.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/"><Button>Go home</Button></Link>
          <Link to="/course"><Button variant="secondary">View course</Button></Link>
        </div>
      </div>
    </div>
  );
}
