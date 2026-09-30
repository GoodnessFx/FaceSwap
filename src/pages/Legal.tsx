import { Link, useParams, Navigate } from 'react-router-dom';
import { Callout } from '../components/ui/Callout';

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
          <Link to="/" className="hover:text-[#4F46E5]">Home</Link>
          <span>/</span>
          <span>Legal</span>
        </nav>

        <Callout type="warning" className="mb-8">
          <strong>Note:</strong> These documents are drafts. They should be reviewed by a qualified lawyer before launch. The author of this course is not a lawyer, and this is not legal advice.
        </Callout>

        <h1 className="text-3xl font-black font-display text-[#0B1220] mb-2">{title}</h1>
        <p className="text-sm text-[#94A3B8] mb-10">Last updated: November 2024</p>

        <div className="prose max-w-none">
          {children}
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2E8F0]">
          <p className="text-sm text-[#94A3B8] mb-3">Other legal documents:</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Terms of Service', href: '/legal/terms' },
              { label: 'Privacy Policy', href: '/legal/privacy' },
              { label: 'Refund Policy', href: '/legal/refund' },
              { label: 'Acceptable Use', href: '/legal/acceptable-use' },
            ].map((l) => (
              <Link key={l.href} to={l.href} className="text-sm text-[#4F46E5] hover:opacity-80 underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <h2>1. Acceptance of Terms</h2>
      <p>By purchasing or accessing FaceSwap Studio ("the Course"), you agree to these Terms of Service. If you do not agree, do not purchase or access the Course.</p>

      <h2>2. License</h2>
      <p>Upon purchase, you are granted a non-exclusive, non-transferable, personal license to access the Course content for your own educational and personal use. You may not share, resell, redistribute, or sublicense the Course content.</p>

      <h2>3. Acceptable Use</h2>
      <p>You agree to use the tools and knowledge taught in this Course only in accordance with the <Link to="/legal/acceptable-use">Acceptable Use Policy</Link>. Misuse — including impersonating real people, deceiving others, committing fraud, or bypassing identity verification — is a violation of these Terms and may result in account termination without refund.</p>

      <h2>4. Payment</h2>
      <p>All prices are in Nigerian Naira (₦). Payment is processed by Paystack. We do not store your payment card details. Access is granted only after payment is confirmed by our payment processor via webhook verification — never solely based on a redirect.</p>

      <h2>5. Refunds</h2>
      <p>See the <Link to="/legal/refund">Refund Policy</Link> for full details. We offer a 7-day refund if the course tools genuinely do not run on your machine after you have followed every step.</p>

      <h2>6. Intellectual Property</h2>
      <p>All Course content — written guides, videos, screenshots, templates — is the intellectual property of FaceSwap Studio. You may not copy, reproduce, or distribute it without written permission.</p>

      <h2>7. Disclaimer</h2>
      <p>The Course is provided "as is" without warranties of any kind. Third-party tools (Deep-Live-Cam, OBS, RVC, VB-Cable, ffmpeg) are not maintained by FaceSwap Studio and their availability, features, and legal status may change. You are responsible for checking the licenses and terms of any third-party software you install.</p>

      <h2>8. Limitation of Liability</h2>
      <p>To the maximum extent permitted by applicable law, FaceSwap Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Course or the tools it describes.</p>

      <h2>9. Governing Law</h2>
      <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
    </LegalLayout>
  );
}

function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">
      <h2>1. What we collect</h2>
      <p>When you create an account, we collect your name and email address. When you purchase, we record the transaction reference, tier, amount, and timestamp. We also record lesson progress (which lessons you have marked complete).</p>

      <h2>2. How we use it</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Provide access to the Course content you purchased</li>
        <li>Send transaction receipts and order confirmations</li>
        <li>Deliver password reset emails</li>
        <li>Detect and prevent fraud or abuse</li>
        <li>Send course update notifications (you can unsubscribe)</li>
      </ul>

      <h2>3. Third parties</h2>
      <p>We use Supabase for database and authentication, Paystack for payment processing, and optionally Resend or Supabase for email. Each of these services has its own privacy policy. We do not sell your personal data.</p>

      <h2>4. Data retention</h2>
      <p>We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where retention is required by law (e.g. financial records).</p>

      <h2>5. Your rights</h2>
      <p>You can access, correct, or delete your data by contacting us at hello@faceswapcourse.com or using the account deletion feature in your account settings.</p>

      <h2>6. Cookies</h2>
      <p>We use only essential cookies for authentication. We do not use tracking or advertising cookies.</p>

      <h2>7. Security</h2>
      <p>We use industry-standard security practices including HTTPS, Row Level Security on all database tables, and short-lived signed URLs for lesson content delivery.</p>
    </LegalLayout>
  );
}

function Refund() {
  return (
    <LegalLayout title="Refund Policy">
      <h2>Our guarantee</h2>
      <p>We offer a 7-day refund if the tools taught in this Course genuinely do not run on your machine after you have followed every step in the guide correctly.</p>

      <h2>How to request a refund</h2>
      <p>Email hello@faceswapcourse.com within 7 days of purchase with:</p>
      <ul>
        <li>Your order reference number</li>
        <li>A description of the step you are stuck on</li>
        <li>The exact error message or screenshot</li>
        <li>Your system specs (Windows version, CPU, RAM)</li>
      </ul>
      <p>We will attempt to resolve the issue first. If we cannot resolve it within 3 business days, we will issue a full refund to the original payment method.</p>

      <h2>When refunds are not available</h2>
      <ul>
        <li>If you changed your mind after purchasing</li>
        <li>If you have hardware that the Course explicitly warns about (no GPU, very old CPU)</li>
        <li>If you have not followed the steps in the Course</li>
        <li>If more than 7 days have passed since purchase</li>
        <li>If your account has been terminated for Acceptable Use violations</li>
      </ul>

      <h2>Refund processing time</h2>
      <p>Refunds are processed via Paystack and typically appear within 5–10 business days depending on your bank.</p>
    </LegalLayout>
  );
}

function AcceptableUse() {
  return (
    <LegalLayout title="Acceptable Use Policy">
      <Callout type="danger" title="This is a hard limit" className="mb-8">
        Violations of this policy may result in immediate account termination without refund and referral to law enforcement where applicable.
      </Callout>

      <h2>What you may do</h2>
      <ul>
        <li>Use face-swap tools with your own face or a face you have written permission to use</li>
        <li>Use voice-conversion tools with your own voice or a voice model you have licensed</li>
        <li>Use AI-generated (synthetic) faces and voices — people who do not exist</li>
        <li>Create content for entertainment, personal projects, and (with the Creator &amp; Business tier) commercial work</li>
        <li>Stream or post content where your audience knows they are watching an AI persona</li>
      </ul>

      <h2>What you may NOT do</h2>
      <ul>
        <li><strong>Impersonate real people</strong> — Do not use any real person's face or voice without their explicit, written consent, regardless of whether they are famous or private</li>
        <li><strong>Deceive others on calls</strong> — Do not use these tools to make someone believe they are speaking to a person they are not</li>
        <li><strong>Commit fraud</strong> — Do not use AI personas to scam, defraud, or financially harm anyone</li>
        <li><strong>Harass or defame</strong> — Do not create content designed to harm another person's reputation or cause them distress</li>
        <li><strong>Bypass verification systems</strong> — Do not use AI faces or voices to bypass identity verification, age verification, or KYC systems</li>
        <li><strong>Create non-consensual intimate content</strong> — This is illegal in many jurisdictions and a strict violation</li>
        <li><strong>Violate platform terms</strong> — Each platform (YouTube, Meta, TikTok, etc.) has its own AI content policies. You are responsible for compliance</li>
      </ul>

      <h2>Disclosure requirements</h2>
      <p>You must disclose when content is made with an AI persona. On most major platforms, this is now a requirement, not just a best practice. Label AI content in descriptions, titles, or platform-provided disclosure tools.</p>

      <h2>Consequences of violation</h2>
      <p>Violations of this policy will result in immediate account termination and revocation of access to all purchased content, without refund. We reserve the right to report serious violations to the relevant authorities.</p>

      <h2>Reporting violations</h2>
      <p>If you become aware of someone using FaceSwap Studio to violate this policy, please contact us at hello@faceswapcourse.com.</p>
    </LegalLayout>
  );
}

const LEGAL_PAGES: Record<string, React.ReactNode> = {
  terms: <Terms />,
  privacy: <Privacy />,
  refund: <Refund />,
  'acceptable-use': <AcceptableUse />,
};

export function LegalPage() {
  const { page } = useParams<{ page: string }>();
  if (!page || !LEGAL_PAGES[page]) return <Navigate to="/legal/terms" replace />;
  return <>{LEGAL_PAGES[page]}</>;
}
