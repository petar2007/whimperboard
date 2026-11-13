import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-zinc-200 shadow-xl space-y-8">
        
        <Link 
          href="/" 
          className="inline-block text-sm text-emerald-600 hover:underline font-bold"
        >
          ← Back to App
        </Link>
        
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Refund Policy</h1>
          <p className="text-xs text-zinc-500">Last updated: November 13, 2026</p>
        </div>

        <div className="text-zinc-700 text-sm space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-black">1. Digital Products &amp; Subscriptions</h2>
            <p>
              Thank you for using Whimperboard. Due to the digital nature of our SaaS platform and the immediate access granted upon purchase, <strong>all sales are final and no refunds will be issued</strong> once a subscription or payment has been processed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-black">2. Subscription Cancellations</h2>
            <p>
              You may cancel your monthly or annual subscription at any time through your account settings or via the billing link provided in your Lemon Squeezy receipt. Upon cancellation, you will retain access to paid features until the end of your current billing period, and you will not be charged again.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-black">3. Exceptions</h2>
            <p>
              Exceptions to this policy may only be considered at our sole discretion in cases of verified technical billing errors (such as duplicate charges) or where strictly required by applicable consumer protection laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-black">4. Questions &amp; Contact</h2>
            <p>
              If you have any questions concerning our Refund Policy or your billing, please contact us at:{' '}
              <a href="mailto:whimperboard@gmail.com" className="text-emerald-600 font-semibold hover:underline">
                whimperboard@gmail.com
              </a>
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}