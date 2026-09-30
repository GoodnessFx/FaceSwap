import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { FreeLesson } from './pages/FreeLesson';
import { Login, Signup, ForgotPassword, ResetPassword } from './pages/Auth';
import { Checkout, CheckoutSuccess, CheckoutFailed } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { CoursePage } from './pages/Course';
import { Account } from './pages/Account';
import { Admin } from './pages/Admin';
import { LegalPage } from './pages/Legal';
import { NotFound } from './pages/NotFound';

const NO_CHROME_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password'];

/**
 * Restores scroll position between routes: jumps to the hash target when the
 * URL carries one (/#roadmap, /#faq), otherwise resets to the top. Without
 * this, navigating from a scrolled page leaves the next page mid-scroll.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait one frame so the target section has rendered.
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const location = useLocation();
  const noChrome = NO_CHROME_ROUTES.includes(location.pathname);

  return (
    <>
      <ScrollManager />
      {!noChrome && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/free-lesson" element={<FreeLesson />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/failed" element={<CheckoutFailed />} />
        <Route path="/checkout/:tier" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course/:moduleSlug/:lessonSlug" element={<CoursePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/legal/:page" element={<LegalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!noChrome && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
