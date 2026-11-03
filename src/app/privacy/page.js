import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl space-y-8">
        
        {/* Dugme za povratak */}
        <Link 
          href="/" 
          className="inline-block text-sm text-emerald-400 hover:underline font-medium"
        >
          ← Back to App
        </Link>
        
        {/* Naslov */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Effective Date: 03/11/2026</p>
        </div>

        {/* 1. Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Introduction and Organizational Info</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            We, at Whimperboard (operated by Petar Marinkovic), are dedicated to serving our customers and contacts to the best of our abilities. Part of our commitment involves the responsible management of personal information collected through our website <span className="text-emerald-400">whimperboard.vercel.app</span>, and any related interactions. Our primary goals in processing this information include:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
            <li>Enhancing the user experience on our platform by understanding customer needs and preferences.</li>
            <li>Providing timely support and responding to inquiries or service requests.</li>
            <li>Improving our products and services to meet the evolving demands of our users.</li>
            <li>Conducting necessary business operations, such as billing and account management.</li>
          </ul>
          <p className="text-slate-300 text-sm leading-relaxed">
            It is our policy to process personal information with the utmost respect for privacy and security. We adhere to all relevant regulations and guidelines to ensure that the data we handle is protected against unauthorized access, disclosure, alteration, and destruction.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            We do not have a designated Data Protection Officer (DPO) but remain fully committed to addressing your privacy concerns. Contact us at <strong className="text-white">whimperboard@gmail.com</strong> or <strong className="text-white">+381 653130322</strong>.
          </p>
        </section>

        {/* 2. Scope */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">2. Scope and Application</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our privacy policy is designed to protect the personal information of all our stakeholders, including website visitors, registered users, and customers. Whether you are just browsing our website whimperboard.vercel.app, using our services as a registered user, or engaging with us as a valued customer, we ensure that your personal data is processed with the highest standards of privacy and security.
          </p>
        </section>

        {/* 3. Storage & Protection */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">3. Data Storage and Protection</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">Data storage:</strong> Personal information is stored in secure servers located in Sweden (SE) and the United States (US). For services requiring international transfers, we ensure compliance with all applicable laws.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">Encryption:</strong> To protect data during transfer and at rest, we employ robust SSL/HTTPS encryption technologies and database-level security policies (RLS).
          </p>
        </section>

        {/* 4. Data Sharing & Third Parties */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Data Sharing and Third-Party Services</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            We share your information with trusted third-party service providers solely to operate our application. Below is the full breakdown of third parties:
          </p>

          <div className="overflow-x-auto border border-slate-700 rounded-lg">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-700/50 text-white uppercase font-semibold">
                <tr>
                  <th className="p-3">Service</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Purposes</th>
                  <th className="p-3">Data Collected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="p-3 font-medium text-emerald-400">Supabase</td>
                  <td className="p-3">Supabase, Inc.</td>
                  <td className="p-3">Auth, Security, Data Storage</td>
                  <td className="p-3">Name, Email/Phone, IP, Browser Info</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-emerald-400">Vercel</td>
                  <td className="p-3">Vercel Inc.</td>
                  <td className="p-3">Hosting, Analytics, Performance</td>
                  <td className="p-3">IP, Browser Info, OS, Logs</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-emerald-400">Google SMTP</td>
                  <td className="p-3">Google LLC</td>
                  <td className="p-3">Email Notifications</td>
                  <td className="p-3">Email Address, Phone Number</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. User Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">5. User Rights (GDPR)</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Under GDPR, you have the following rights regarding your data:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
            <li><strong className="text-white">Access (Art. 15):</strong> Request a copy of your personal data.</li>
            <li><strong className="text-white">Rectification (Art. 16):</strong> Correct inaccurate personal data.</li>
            <li><strong className="text-white">Erasure (Art. 17):</strong> Request deletion of your data (&quot;Right to be forgotten&quot;).</li>
            <li><strong className="text-white">Restriction (Art. 18):</strong> Restrict how we process your data.</li>
            <li><strong className="text-white">Data Portability (Art. 20):</strong> Export your data in a structured format.</li>
            <li><strong className="text-white">Objection (Art. 21):</strong> Object to processing of your personal data.</li>
          </ul>
          <p className="text-slate-300 text-sm leading-relaxed pt-2">
            To exercise any of these rights, contact us at <strong className="text-white">whimperboard@gmail.com</strong>.
          </p>
        </section>

        {/* 6. Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">6. Cookies and Tracking Technologies</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            We use essential cookies strictly necessary for application functionality, authentication, and security. Functional and analytics cookies help us measure system performance.
          </p>
        </section>

        {/* 7. Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">7. Age Requirements (Children&apos;s Privacy)</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our services are strictly not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.
          </p>
        </section>

        {/* 8. Data Breach */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">8. Data Breach Procedures</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            In the event of a security breach that risks your privacy, we are committed to notifying relevant regulatory authorities and affected users within <strong className="text-white">3 days (72 hours)</strong> via email or website notification.
          </p>
        </section>

        {/* Contact */}
        <div className="pt-4 border-t border-slate-700 text-xs text-slate-400 text-center">
          Questions? Contact us at whimperboard@gmail.com or +381 653130322.
        </div>

      </div>
    </main>
  );
}