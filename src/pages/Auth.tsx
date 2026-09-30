import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Callout } from '../components/ui/Callout';

function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <circle cx="10" cy="8" r="3.5" stroke="white" strokeWidth="1.5" />
            <ellipse cx="10" cy="14.5" rx="6" ry="2.5" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <span className="font-display font-bold text-lg text-[#0B1220]">
          FaceSwap<span className="text-[#4F46E5]">Studio</span>
        </span>
      </Link>
      <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8">
        <h1 className="text-2xl font-black font-display text-[#0B1220] mb-1">{title}</h1>
        {subtitle && <p className="text-sm text-[#64748B] mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function FormField({
  label, type = 'text', placeholder, value, onChange, hint,
}: {
  label: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#374151] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1220] bg-white
          placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent
          transition-all"
      />
      {hint && <p className="text-xs text-[#94A3B8] mt-1">{hint}</p>}
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account to continue.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <FormField label="Password" type="password" placeholder="Your password" value={password} onChange={setPassword} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-[#4F46E5] hover:opacity-80">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" loading={loading} className="w-full justify-center">Sign in</Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E2E8F0]" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-[#94A3B8]">or continue with</span></div>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>
      </form>
      <p className="text-center text-xs text-[#94A3B8] mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#4F46E5] font-semibold hover:opacity-80">Sign up</Link>
      </p>
    </AuthCard>
  );
}

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  }

  return (
    <AuthCard title="Create account" subtitle="Get started with FaceSwap Studio.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full name" placeholder="Ada Okafor" value={name} onChange={setName} />
        <FormField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <FormField label="Password" type="password" placeholder="8+ characters" value={password} onChange={setPassword}
          hint="At least 8 characters" />
        <Button type="submit" loading={loading} className="w-full justify-center">Create account</Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E2E8F0]" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-[#94A3B8]">or</span></div>
        </div>
        <button type="button"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>
      </form>
      <p className="text-center text-xs text-[#94A3B8] mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-[#4F46E5] font-semibold hover:opacity-80">Sign in</Link>
      </p>
      <p className="text-center text-xs text-[#CBD5E1] mt-3">
        By creating an account you agree to our{' '}
        <Link to="/legal/terms" className="text-[#94A3B8] hover:text-[#64748B]">Terms</Link>
        {' '}and{' '}
        <Link to="/legal/privacy" className="text-[#94A3B8] hover:text-[#64748B]">Privacy Policy</Link>.
      </p>
    </AuthCard>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  }

  return (
    <AuthCard title="Reset your password" subtitle="We'll send a reset link to your email.">
      {sent ? (
        <Callout type="success" title="Check your inbox">
          We sent a password reset link to <strong>{email}</strong>. Check your spam folder too.
        </Callout>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
          <Button type="submit" loading={loading} className="w-full justify-center">Send reset link</Button>
        </form>
      )}
      <p className="mt-6 text-center text-xs text-[#94A3B8]">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-[#4F46E5] hover:opacity-80"
        >
          <Icon name="arrowLeft" size={13} />
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(() => navigate('/login'), 2000); }, 1000);
  }

  return (
    <AuthCard title="Set new password">
      {done ? (
        <Callout type="success" title="Password updated">
          Redirecting you to sign in…
        </Callout>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="New password" type="password" placeholder="8+ characters" value={password} onChange={setPassword} />
          <FormField label="Confirm password" type="password" placeholder="Repeat the password" value={confirm} onChange={setConfirm} />
          {password && confirm && password !== confirm && (
            <Callout type="danger">Passwords don't match.</Callout>
          )}
          <Button type="submit" loading={loading} disabled={!password || password !== confirm} className="w-full justify-center">
            Update password
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
