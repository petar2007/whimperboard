import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-3xl font-black text-zinc-900 mb-2">Terms of Service</h1>
          <p className="text-xs font-medium text-zinc-500">Last updated: November 16, 2026</p>
        </div>

        <div className="text-zinc-700 text-sm space-y-8 leading-relaxed">
          
          {/* AGREEMENT */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">Agreement to Our Legal Terms</h2>
            <p>
              We are <strong className="font-bold text-zinc-900">Petar Marinković</strong>, doing business as <strong className="font-bold text-zinc-900">Whimperboard</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), registered in Serbia at Marije Mage Magazinović 1, Užice 31000, Serbia.
            </p>
            <p>
              We operate the website <a href="https://whimperboard.vercel.app/" className="text-emerald-600 underline">https://whimperboard.vercel.app/</a> (the &quot;Site&quot;), the web application Whimperboard (the &quot;App&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
            </p>
            <p>
              Whimperboard is a cloud-based SaaS platform designed for kennel management, allowing dog boarding and daycare businesses to manage client profiles, pet records, booking schedules, and internal daily operations.
            </p>
            <p>
              You can contact us by phone at <strong className="font-semibold text-zinc-900">+381 65 3130322</strong>, by email at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>, or by mail to Marije Mage Magazinović 1, Užice 31000, Serbia.
            </p>
            <p>
              These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Petar Marinković, concerning your access to and use of the Services. By accessing the Services, you agree that you have read, understood, and agreed to be bound by all of these Legal Terms. <strong className="font-bold text-zinc-900">IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
            </p>
            <p>
              We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you via <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
            </p>
            <p>
              The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
            </p>
          </section>

          {/* TABLE OF CONTENTS */}
          <section className="space-y-3 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <h2 className="text-base font-extrabold text-zinc-900">Table of Contents</h2>
            <ol className="list-decimal pl-5 space-y-1 text-xs font-medium text-zinc-700 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <li>Our Services</li>
              <li>Intellectual Property Rights</li>
              <li>User Representations</li>
              <li>User Registration</li>
              <li>Purchases and Payment</li>
              <li>Subscriptions</li>
              <li>Prohibited Activities</li>
              <li>User Generated Contributions</li>
              <li>Contribution License</li>
              <li>Mobile Application License</li>
              <li>Third-Party Websites and Content</li>
              <li>Services Management</li>
              <li>Privacy Policy</li>
              <li>Copyright Infringements</li>
              <li>Term and Termination</li>
              <li>Modifications and Interruptions</li>
              <li>Governing Law</li>
              <li>Dispute Resolution</li>
              <li>Corrections</li>
              <li>Disclaimer</li>
              <li>Limitations of Liability</li>
              <li>Indemnification</li>
              <li>User Data</li>
              <li>Electronic Communications &amp; Signatures</li>
              <li>California Users and Residents</li>
              <li>Miscellaneous</li>
              <li>Contact Us</li>
            </ol>
          </section>

         {/* 1. OUR SERVICES */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">1. Our Services</h2>
            <p>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>
            <p>
              The Services are not tailored to comply with industry-specific regulations (such as HIPAA or FISMA), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
            </p>
            <p>
              <strong className="font-bold text-zinc-900">Animal Care &amp; Reminder Disclaimer:</strong> Whimperboard is strictly an organizational and administrative tool. It is not a veterinary, medical, or life-safety monitoring system. Notifications, feeding schedules, medication reminders, and booking alerts rely on internet connectivity, browser behavior, and third-party infrastructure, and are not guaranteed to be error-free or delivered without delay. You, as the kennel operator or pet care provider, remain solely and exclusively responsible for the physical care, feeding, medication, health, and safety of all animals under your supervision. Under no circumstances shall Whimperboard be held liable for any illness, injury, loss, or death of an animal resulting from missed reminders, technical malfunctions, or reliance on the Services.
            </p>
          </section>

          {/* 2. INTELLECTUAL PROPERTY RIGHTS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">2. Intellectual Property Rights</h2>
            
            <h3 className="text-sm font-bold text-zinc-900 pt-1">Our Intellectual Property</h3>
            <p>
              We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
            </p>
            <p>
              Our Content and Marks are protected by copyright and trademark laws and treaties around the world. The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your internal business purpose only.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 pt-1">Your Use of Our Services</h3>
            <p>
              Subject to your compliance with these Legal Terms, including the &quot;Prohibited Activities&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your internal business purpose.
            </p>
            <p>
              Except as set out in this section, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
            <p>
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section, please address your request to: <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>. We reserve all rights not expressly granted to you. Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 pt-1">Your Submissions and Contributions</h3>
            <p>
              <strong className="font-semibold text-zinc-900">Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. We shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose without acknowledgment or compensation to you.
            </p>
            <p>
              <strong className="font-semibold text-zinc-900">Contributions:</strong> The Services may allow you to create, submit, post, or store content and materials (&quot;Contributions&quot;). By posting Contributions, you represent and warrant that you own or have the necessary rights to such content and that it does not violate any third-party rights or applicable laws. We reserve the right to remove or edit any Contributions that violate these Legal Terms.
            </p>
          </section>

          {/* 3. USER REPRESENTATIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">3. User Representations</h2>
            <p>By using the Services, you represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All registration information you submit will be true, accurate, current, and complete;</li>
              <li>You will maintain the accuracy of such information and promptly update it as necessary;</li>
              <li>You have the legal capacity and agree to comply with these Legal Terms;</li>
              <li>You are not a minor in the jurisdiction in which you reside (at least 18 years old);</li>
              <li>You will not access the Services through automated or non-human means, whether through a bot, script, or otherwise;</li>
              <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
              <li>Your use of the Services will not violate any applicable law or regulation.</li>
            </ul>
            <p>
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services.
            </p>
          </section>

          {/* 4. USER REGISTRATION */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">4. User Registration</h2>
            <p>
              You are required to register an account to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
          </section>

          {/* 5. PURCHASES AND PAYMENT */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">5. Purchases and Payment</h2>
            <p>
              Our order process is conducted by our online reseller and Merchant of Record, <strong className="font-bold text-zinc-900">Paddle.com</strong>. Paddle is the Merchant of Record for all our orders, provides all customer service inquiries related to payment processing, and handles returns and VAT/sales tax compliance.
            </p>
            <p>Paddle accepts major payment methods including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>American Express</li>
              <li>Discover, Apple Pay, Google Pay, and PayPal (where available)</li>
            </ul>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. Applicable sales tax or VAT will be calculated and added by Paddle based on your billing location. All base prices are listed in <strong className="font-semibold text-zinc-900">US Dollars (USD)</strong>. We reserve the right to change prices at any time upon prior notice.
            </p>
          </section>

          {/* 6. SUBSCRIPTIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">6. Subscriptions</h2>
            
            <h3 className="text-sm font-bold text-zinc-900 pt-1">Plans, Billing, and Renewal</h3>
            <p>
              Whimperboard offers paid subscription plans billed at <strong className="font-semibold text-zinc-900">$15.00 USD per month</strong> or <strong className="font-semibold text-zinc-900">$149.00 USD per year</strong>. Your subscription will continue and automatically renew at the end of each billing cycle unless canceled prior to the renewal date. You consent to recurring charges on your chosen payment method until you cancel.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 pt-1">Free Access / Trial</h3>
            <p>
              New users may evaluate core features using our free tier or trial period before upgrading to a paid Pro subscription. Your account will not be charged until you explicitly subscribe to a paid plan.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 pt-1">Cancellation and Refunds</h3>
            <p>
              You can cancel your subscription at any time through your account billing settings or by contacting us at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>. Your cancellation will take effect at the end of the current paid billing period, and you will retain access until that period expires. For details on refund eligibility, please review our{' '}
              <Link href="/refund-policy" className="text-emerald-600 font-semibold underline">
                Refund Policy
              </Link>.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 pt-1">Fee Changes</h3>
            <p>
              We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in advance in accordance with applicable law.
            </p>
          </section>

          {/* 7. PROHIBITED ACTIVITIES */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">7. Prohibited Activities</h2>
            <p>
              You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Systematically retrieve data or other content from the Services to create or compile a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Upload or transmit viruses, Trojan horses, or other malicious material that interferes with any party&apos;s uninterrupted use of the Services.</li>
              <li>Engage in any automated use of the system, such as using scripts, bots, data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks connected to the Services.</li>
              <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or making up a part of the Services.</li>
              <li>Use the Services as part of any effort to compete with us or sell/transfer your profile to third parties.</li>
            </ul>
          </section>

          {/* 8. USER GENERATED CONTRIBUTIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">8. User Generated Contributions</h2>
            <p>
              The Services allow you to input and store business data such as pet profiles, owner contact details, booking dates, and operational notes (&quot;Contributions&quot;). You represent and warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You have the legal right, consent, and authority (including under applicable data protection laws such as GDPR) to enter and store personal data of your clients and their pets in the Services.</li>
              <li>Your Contributions do not infringe the proprietary, privacy, or publicity rights of any third party.</li>
              <li>Your Contributions are not false, unlawful, harassing, defamatory, or obscene.</li>
            </ul>
          </section>

          {/* 9. CONTRIBUTION LICENSE */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">9. Contribution License</h2>
            <p>
              You retain full ownership of all business records, client lists, and pet data that you enter into the Services. By inputting this data, you grant us a limited, non-exclusive license to host, store, back up, and process such data solely as necessary to provide, maintain, and improve the Services for you.
            </p>
            <p>
              We do not sell your customer lists or kennel data to third parties. You are solely responsible for the accuracy and legality of the records you store on the Services.
            </p>
          </section>

          {/* 10. MOBILE APPLICATION LICENSE */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">10. Mobile Application License</h2>
            <p>
              If you access the Services via a mobile application or Progressive Web App (PWA), we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on devices owned or controlled by you strictly in accordance with these Legal Terms. You shall not decompile, reverse engineer, modify, or distribute the App or use it for any unauthorized commercial purpose.
            </p>
          </section>

          {/* 11. THIRD-PARTY WEBSITES AND CONTENT */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">11. Third-Party Websites and Content</h2>
            <p>
              The Services may contain links to third-party websites or integrate with third-party infrastructure providers (such as payment processors and cloud hosting providers). We are not responsible for the content, accuracy, or privacy practices of external third-party websites not operated by us.
            </p>
          </section>

          {/* 12. SERVICES MANAGEMENT */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">12. Services Management</h2>
            <p>
              We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who violates the law or these Legal Terms; (3) restrict access to or disable files and content that are excessive in size or burdensome to our systems; and (4) manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
            </p>
          </section>

          {/* 13. PRIVACY POLICY */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">13. Privacy Policy</h2>
            <p>
              We care about data privacy and security. Please review our{' '}
              <Link href="/privacy" className="text-emerald-600 font-semibold underline">
                Privacy Policy
              </Link>
              . By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised that our cloud infrastructure is hosted in the European Union (Sweden) and the United States via industry-standard providers (Supabase and Vercel).
            </p>
          </section>

          {/* 14. COPYRIGHT INFRINGEMENTS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">14. Copyright Infringements</h2>
            <p>
              We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us at <strong className="font-semibold text-zinc-900">whimperboard@gmail.com</strong>.
            </p>
          </section>

          {/* 15. TERM AND TERMINATION */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">15. Term and Termination</h2>
            <p>
              These Legal Terms shall remain in full force and effect while you use the Services. You may delete your account and all associated data at any time directly from the application settings.
            </p>
            <p>
              <strong className="font-bold text-zinc-900">
                WE RESERVE THE RIGHT TO DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR BREACH OF THESE LEGAL TERMS OR APPLICABLE LAW, AND MAY TERMINATE OR SUSPEND YOUR ACCOUNT IF NECESSARY.
              </strong>
            </p>
          </section>

          {/* 16. MODIFICATIONS AND INTERRUPTIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">16. Modifications and Interruptions</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Services at any time for maintenance or improvement. While we strive for high availability, we cannot guarantee the Services will be available at all times without interruption and will not be liable for any loss or inconvenience caused by temporary downtime.
            </p>
          </section>

          {/* 17. GOVERNING LAW */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">17. Governing Law</h2>
            <p>
              These Legal Terms shall be governed by and defined following the laws of <strong className="font-semibold text-zinc-900">Serbia</strong>. Petar Marinković and yourself irrevocably consent that the courts of Serbia shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms, without prejudice to mandatory consumer protection laws applicable in your country of residence.
            </p>
          </section>

          {/* 18. DISPUTE RESOLUTION */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">18. Dispute Resolution</h2>
            <p>
              <strong className="font-semibold text-zinc-900">Informal Negotiations:</strong> To expedite resolution and control the cost of any dispute related to these Legal Terms, the Parties agree to first attempt to negotiate any dispute informally for at least thirty (30) days upon written notice before initiating formal proceedings.
            </p>
            <p>
              <strong className="font-semibold text-zinc-900">Arbitration &amp; Jurisdiction:</strong> If informal negotiations do not resolve the dispute, it shall be resolved in accordance with applicable arbitration rules in Užice, Serbia, in the English language, unless mandatory local consumer law provides otherwise.
            </p>
          </section>

          {/* 19. CORRECTIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">19. Corrections</h2>
            <p>
              There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
            </p>
          </section>

          {/* 20. DISCLAIMER */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">20. Disclaimer</h2>
            <p className="uppercase text-xs leading-relaxed text-zinc-600">
              THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          {/* 21. LIMITATIONS OF LIABILITY */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">21. Limitations of Liability</h2>
            <p className="uppercase text-xs leading-relaxed text-zinc-600">
              IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, OR LOSS OF DATA ARISING FROM YOUR USE OF THE SERVICES. OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID BY YOU TO US DURING THE TWELVE (12) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.
            </p>
          </section>

          {/* 22. INDEMNIFICATION */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">22. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of your use of the Services, your breach of these Legal Terms, or your violation of the rights of a third party.
            </p>
          </section>

          {/* 23. USER DATA */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">23. User Data</h2>
            <p>
              We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.
            </p>
          </section>

          {/* 24. ELECTRONIC COMMUNICATIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">24. Electronic Communications, Transactions, and Signatures</h2>
            <p>
              Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and agree to the use of electronic signatures, contracts, orders, and records.
            </p>
          </section>

          {/* 25. CALIFORNIA USERS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">25. California Users and Residents</h2>
            <p>
              If any complaint with us is not satisfactorily resolved, California residents may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210.
            </p>
          </section>

          {/* 26. MISCELLANEOUS */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900">26. Miscellaneous</h2>
            <p>
              These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. If any provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision is deemed severable and does not affect the validity and enforceability of any remaining provisions.
            </p>
          </section>

          {/* 27. CONTACT US */}
          <section className="space-y-2 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            <h2 className="text-lg font-extrabold text-zinc-900">27. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <div className="text-zinc-900 font-medium space-y-0.5 pt-1">
              <p className="font-bold">Petar Marinković (Whimperboard)</p>
              <p>Marije Mage Magazinović 1</p>
              <p>Užice 31000, Serbia</p>
              <p>Phone: +381 65 3130322</p>
              <p>
                Email:{' '}
                <a href="mailto:whimperboard@gmail.com" className="text-emerald-600 underline font-semibold">
                  whimperboard@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}