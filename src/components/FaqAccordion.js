'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: 'How does Whimperboard help manage my dog boarding or daycare kennel?',
    answer:
      'Whimperboard replaces messy spreadsheets and whiteboards with a visual kennel board. You can assign dogs to specific boxes, track check-in/check-out dates, calculate daily rates automatically, set feeding or medication reminders, and keep a permanent, searchable Customer List of every dog and owner.',
  },
  {
    question: 'What happens to client details when a dog checks out?',
    answer:
      'Every dog and owner you enter is automatically saved to your permanent Customer List. Clearing or deleting a kennel box never deletes the client from your database—when they return for a future stay, you can assign them to an empty box with a single click.',
  },
  {
    question: 'How much does Whimperboard Pro cost, and is there a free trial?',
    answer:
      'New accounts can test core features before upgrading. Whimperboard Pro is $15.00 USD per month or $149.00 USD per year (saving you over 17%), unlocking unlimited kennel boxes, full customer history, and priority support.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes. There are no long-term contracts. You can cancel your monthly or annual subscription at any time from your account settings or via the link in your Paddle billing receipt. You will keep full Pro access until the end of your current paid billing period.',
  },
  {
    question: 'Who processes payments and handles invoices/VAT?',
    answer:
      'All payments, invoices, and applicable VAT/sales taxes are securely processed by our Merchant of Record, Paddle.com. You can pay using Visa, Mastercard, American Express, Apple Pay, Google Pay, or PayPal.',
  },
  {
    question: 'Is my kennel and client data safe and private?',
    answer:
      'Yes. Your data is encrypted in transit (HTTPS/SSL) and at rest, hosted on EU/US cloud infrastructure (Supabase), and protected by strict database-level Row Level Security (RLS) so only your account can view or modify your records.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-2xl bg-white overflow-hidden">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-zinc-50 transition cursor-pointer"
            >
              <span className="text-sm sm:text-base font-bold text-zinc-900">
                {item.question}
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 font-bold text-xs transition-transform duration-200 ${
                  isOpen ? 'rotate-45 bg-zinc-900 text-white border-zinc-900' : ''
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-4 pt-0.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}