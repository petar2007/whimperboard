import Link from 'next/link';

export default function RefundPolicyPage() {
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
          <h1 className="text-3xl font-black text-zinc-900 mb-2">Refund Policy</h1>
          <p className="text-xs font-medium text-zinc-500">Last updated: November 16, 2026</p>
        </div>

        <div className="text-zinc-700 text-sm space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">1. Digital Products &amp; Subscriptions</h2>
            <p>
              Thank you for using <strong className="font-bold text-zinc-900">Whimperboard</strong>. Our order process is conducted by our online reseller and Merchant of Record, <strong className="font-bold text-zinc-900">Paddle.com</strong>. Because Whimperboard is a digital cloud-based SaaS platform providing immediate access to paid features upon purchase (and offers a free tier/trial to evaluate the service beforehand), subscription payments are generally non-refundable once processed, except as outlined below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">2. Subscription Cancellations</h2>
            <p>
              You may cancel your monthly ($15.00 USD) or annual ($149.00 USD) subscription at any time through your account settings, via the cancellation link in your <strong className="font-semibold text-zinc-900">Paddle</strong> billing receipt, or by contacting us at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>.
            </p>
            <p>
              Upon cancellation, you will retain full access to Pro features until the end of your current paid billing period, and you will not be charged for subsequent billing cycles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">3. Refund Eligibility &amp; Consumer Rights</h2>
            <p>
              Refund requests are handled in accordance with Paddle&apos;s Buyer Terms and applicable consumer protection laws. Refunds may be granted in the following cases:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="font-semibold text-zinc-900">Technical or Billing Errors:</strong> Verified duplicate charges or technical malfunctions that prevent access to the Service.
              </li>
              <li>
                <strong className="font-semibold text-zinc-900">Statutory Consumer Rights:</strong> Where required by mandatory consumer protection laws in your jurisdiction (such as EU/UK statutory rights, where applicable prior to full digital service performance, or within 14 days of initial purchase if requested).
              </li>
            </ul>
          </section>

          <section className="space-y-2 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <h2 className="text-lg font-extrabold text-zinc-900">4. Questions &amp; Contact</h2>
            <p>
              If you have any questions concerning our Refund Policy, billing, or subscription management, please contact us at{' '}
              <a href="mailto:whimperboard@gmail.com" className="text-emerald-600 underline font-semibold">
                whimperboard@gmail.com
              </a>{' '}
              or reach out directly via your Paddle order receipt.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}