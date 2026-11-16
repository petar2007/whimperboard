import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-zinc-200 shadow-sm space-y-8">
        
        <Link 
          href="/" 
          className="inline-block text-sm text-emerald-600 hover:underline font-bold"
        >
          ← Back to App
        </Link>
        
        <div className="border-b border-zinc-100 pb-6">
          <h1 className="text-3xl font-black text-zinc-900 mb-2">Privacy Policy</h1>
          <p className="text-xs font-medium text-zinc-500">Effective Date: November 16, 2026</p>
        </div>

        <div className="text-zinc-700 text-sm space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">1. Introduction and Organizational Info</h2>
            <p>
              We, at <strong className="font-bold text-zinc-900">Whimperboard</strong> (operated by Petar Marinković, Marije Mage Magazinović 1, Užice 31000, Serbia), are dedicated to serving our customers and contacts to the best of our abilities. Part of our commitment involves the responsible management of personal information collected through our website <strong className="font-semibold text-zinc-900">whimperboard.vercel.app</strong> and any related interactions.
            </p>
            <p>Our primary goals and legal bases (GDPR Art. 6) in processing this information include:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Enhancing the user experience on our platform by understanding customer needs and preferences (Legitimate Interest).</li>
              <li>Providing timely support and responding to inquiries or service requests (Contractual Necessity).</li>
              <li>Improving our products and services to meet the evolving demands of our users (Legitimate Interest).</li>
              <li>Conducting necessary business operations, such as subscription billing and account management (Contractual Necessity &amp; Legal Obligation).</li>
            </ul>
            <p>
              We do not have a designated Data Protection Officer (DPO) but remain fully committed to addressing your privacy concerns. Contact us at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong> or <strong className="font-semibold text-zinc-900">+381 65 3130322</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">2. Scope and Application</h2>
            <p>
              Our privacy policy is designed to protect the personal information of all our stakeholders, including website visitors, registered users, and customers. Whether you are just browsing our website <strong className="font-semibold text-zinc-900">whimperboard.vercel.app</strong>, using our services as a registered user, or engaging with us as a valued customer, we ensure that your personal data is processed with the highest standards of privacy and security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">3. Data Storage and Protection</h2>
            <p>
              <strong className="font-semibold text-zinc-900">Data Storage:</strong> Personal information is stored on secure servers located in <strong className="font-semibold text-zinc-900">Sweden (EU)</strong> and the <strong className="font-semibold text-zinc-900">United States (US)</strong>. For services requiring international transfers outside the EEA, we rely on Standard Contractual Clauses (SCCs) and GDPR-compliant safeguards.
            </p>
            <p>
              <strong className="font-semibold text-zinc-900">Encryption &amp; Security:</strong> To protect data during transfer and at rest, we employ robust SSL/HTTPS encryption technologies and database-level Row Level Security (RLS) policies so each user can only access their own records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">4. Data Sharing and Third-Party Services</h2>
            <p>
              We share your information with trusted third-party service providers solely to operate our application and process payments. We never sell your personal data. Below is the full breakdown of third parties:
            </p>
            <div className="overflow-x-auto border border-zinc-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-900 font-bold">
                    <th className="p-3">Service</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Purposes</th>
                    <th className="p-3">Data Collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900">Paddle</td>
                    <td className="p-3">Paddle.com Market Ltd</td>
                    <td className="p-3">Merchant of Record, Payments, Invoicing &amp; Tax/VAT</td>
                    <td className="p-3">Email, Billing Address, Payment Method, Tax ID</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900">Supabase</td>
                    <td className="p-3">Supabase, Inc.</td>
                    <td className="p-3">Authentication, Security, Database Storage</td>
                    <td className="p-3">Email, Account ID, Kennel &amp; Client Records</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900">Vercel</td>
                    <td className="p-3">Vercel Inc.</td>
                    <td className="p-3">Hosting, Analytics, Performance</td>
                    <td className="p-3">IP Address, Browser Info, OS, Logs</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-900">Google SMTP</td>
                    <td className="p-3">Google LLC</td>
                    <td className="p-3">Transactional Email Notifications</td>
                    <td className="p-3">Email Address</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">5. User Rights (GDPR)</h2>
            <p>Under the European General Data Protection Regulation (GDPR), you have the following rights regarding your data:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="font-semibold text-zinc-900">Access (Art. 15):</strong> Request a copy of your personal data.</li>
              <li><strong className="font-semibold text-zinc-900">Rectification (Art. 16):</strong> Correct inaccurate personal data.</li>
              <li><strong className="font-semibold text-zinc-900">Erasure (Art. 17):</strong> Request deletion of your data (&quot;Right to be forgotten&quot;) or delete your account directly in the app.</li>
              <li><strong className="font-semibold text-zinc-900">Restriction (Art. 18):</strong> Restrict how we process your data.</li>
              <li><strong className="font-semibold text-zinc-900">Data Portability (Art. 20):</strong> Export your data in a structured format.</li>
              <li><strong className="font-semibold text-zinc-900">Objection (Art. 21):</strong> Object to processing of your personal data.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">6. Cookies and Tracking Technologies</h2>
            <p>
              We use essential cookies and local storage strictly necessary for application functionality, authentication sessions, and security. Functional and performance analytics help us monitor system stability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">7. Age Requirements (Children&apos;s Privacy)</h2>
            <p>
              Our services are strictly not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">8. Data Breach Procedures</h2>
            <p>
              In the event of a security breach that risks your privacy, we are committed to notifying relevant regulatory authorities and affected users within 72 hours via email or website notification.
            </p>
          </section>

          <section className="space-y-2 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <h2 className="text-lg font-extrabold text-zinc-900">9. Contact Us</h2>
            <p>
              Questions regarding this Privacy Policy or your personal data? Contact us at{' '}
              <a href="mailto:whimperboard@gmail.com" className="text-emerald-600 underline font-semibold">
                whimperboard@gmail.com
              </a>{' '}
              or by phone at <strong className="font-semibold text-zinc-900">+381 65 3130322</strong>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}