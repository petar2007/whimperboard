'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Lemon Squeezy variant IDs
const MONTHLY_VARIANT_ID = "2342628";
const ANNUAL_VARIANT_ID = "2342551";

function ContactForm() {
  return (
    <section className="max-w-xl mx-auto px-6 py-16 border-t border-zinc-200 my-10">
      <div className="bg-zinc-50 border-2 border-zinc-900 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-black text-black mb-2">Need Help or Have Questions?</h3>
        <p className="text-xs text-zinc-600 mb-6 font-medium">
          Send us a message and we&apos;ll get back to you as soon as possible.
        </p>

        <form
          action="https://formspree.io/f/mdeejqgq"
          method="POST"
          className="space-y-4"
        >
          <input type="hidden" name="_subject" value="Whimperboard contact request" />
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Your Email</label>
            <input
              type="email"
              id="contact-email"
              name="_replyto"
              required
              className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs py-3.5 rounded-xl transition shadow-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Auth forme state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');

  // App state
  const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const timeZoneOptions = [
    ...new Set([
      defaultTimeZone,
      'UTC',
      ...(typeof Intl.supportedValuesOf === 'function'
        ? Intl.supportedValuesOf('timeZone')
        : []),
    ]),
  ].sort();

  const defaultBoxes = [
    { id: 1, name: 'Box 1', pet: null, timeZone: defaultTimeZone },
    { id: 2, name: 'Box 2', pet: null, timeZone: defaultTimeZone },
    { id: 3, name: 'Box 3', pet: null, timeZone: defaultTimeZone },
    { id: 4, name: 'Box 4', pet: null, timeZone: defaultTimeZone },
    { id: 5, name: 'Box 5', pet: null, timeZone: defaultTimeZone },
    { id: 6, name: 'Box 6', pet: null, timeZone: defaultTimeZone },
  ];

  const [boxes, setBoxes] = useState(defaultBoxes);
  const [selectedBox, setSelectedBox] = useState(null);
  const [formData, setFormData] = useState({
    dogName: '',
    breed: '',
    pricePerDay: '',
    daysCount: '',
    notes: '',
    reminders: [],
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.id);
      } else {
        setLoadingAuth(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.id);
      } else {
        setBoxes(defaultBoxes);
        setIsPro(false);
        setLoadingAuth(false);
      }
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_boxes')
        .select('boxes_data, is_pro')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user data:', error.message);
      }

      if (data) {
        if (data.boxes_data) setBoxes(data.boxes_data);
        setIsPro(Boolean(data.is_pro));
      } else {
        setBoxes(defaultBoxes);
        setIsPro(false);
      }
    } catch (err) {
      console.error('Error while withdrawing user data:', err);
      setBoxes(defaultBoxes);
      setIsPro(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  const saveBoxes = async (newBoxes) => {
    setBoxes(newBoxes);
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_boxes')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        await supabase
          .from('user_boxes')
          .update({ boxes_data: newBoxes, updated_at: new Date() })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('user_boxes')
          .insert([{ user_id: user.id, boxes_data: newBoxes, is_pro: isPro }]);
      }
    } catch (err) {
      console.error('Error while saving boxes:', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthMessage('');

    if (isSignUp && !acceptedTerms) {
      setAuthError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    if (isSignUp && password.length < 8) {
      setAuthError('Password must be at least 8 characters long.');
      return;
    }

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthMessage('Account created! Logging in...');
        if (data?.session) {
          setShowAuthModal(false);
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError('Invalid email or password. Please check your credentials.');
      } else if (data?.user) {
        setShowAuthModal(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    if (isSignUp && !acceptedTerms) {
      setAuthError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }
    setAuthError('');
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setBoxes(defaultBoxes);
    setIsPro(false);
    setMenuOpen(false);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const userIdToDelete = user.id;

    try {
      await supabase.auth.signOut();
      setUser(null);
      setBoxes(defaultBoxes);
      setIsPro(false);
      setActiveModal(null);

      const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userIdToDelete }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete account');

      alert('Your account and all associated data have been completely deleted.');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      window.location.href = '/';
    }
  };

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert('To install on iOS: tap Share icon and select "Add to Home Screen". On Android: open browser menu and select "Install app".');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Owner phone number copied to clipboard!');
  };

  const handleOpenModal = (box) => {
    setSelectedBox(box);
    if (box.pet) {
      setFormData(box.pet);
    } else {
      setFormData({
        dogName: '',
        breed: '',
        ownerPhone: '',
        entryDate: new Date().toISOString().split('T')[0],
        pricePerDay: '',
        daysCount: '',
        notes: '',
        reminders: [],
      });
    }
  };

  const handleAddReminder = () => {
    setFormData({
      ...formData,
      reminders: [
        ...formData.reminders,
        { id: Date.now(), text: '', date: '', time: '' },
      ],
    });
  };

  const handleUpdateReminder = (id, field, value) => {
    const updated = formData.reminders.map((r) =>
      r.id === id ? { ...r, [field]: value } : r
    );
    setFormData({ ...formData, reminders: updated });
  };

  const handleRemoveReminder = (id) => {
    const updated = formData.reminders.filter((r) => r.id !== id);
    setFormData({ ...formData, reminders: updated });
  };

  const handleSavePet = (e) => {
    e.preventDefault();
    const updatedBoxes = boxes.map((b) => {
      if (b.id === selectedBox.id) {
        return { ...b, pet: formData };
      }
      return b;
    });
    saveBoxes(updatedBoxes);
    setSelectedBox(null);
  };

  const handleClearBox = () => {
    const updatedBoxes = boxes.map((b) => {
      if (b.id === selectedBox.id) {
        return { ...b, pet: null };
      }
      return b;
    });
    saveBoxes(updatedBoxes);
    setSelectedBox(null);
  };

  const handleUpdateTimeZone = (timeZone) => {
    const firstBoxId = boxes[0]?.id;
    if (selectedBox?.id !== firstBoxId) return;

    const updatedBoxes = boxes.map((box) =>
      box.id === firstBoxId ? { ...box, timeZone } : box
    );
    setSelectedBox({ ...selectedBox, timeZone });
    saveBoxes(updatedBoxes);
  };

  const handleDeleteBox = (e, boxId) => {
    e.stopPropagation();
    const updatedBoxes = boxes.filter((b) => b.id !== boxId);
    saveBoxes(updatedBoxes);
  };

  const handleAddNewBox = () => {
    const newId = boxes.length > 0 ? Math.max(...boxes.map((b) => b.id)) + 1 : 1;
    const newBox = {
      id: newId,
      name: `Box ${newId}`,
      pet: null,
      timeZone: boxes[0]?.timeZone || defaultTimeZone,
    };
    saveBoxes([...boxes, newBox]);
  };

  // Sastavljanje dinamičkog checkout URL-a za Lemon Squeezy
  const selectedVariantId = billingCycle === 'yearly' ? ANNUAL_VARIANT_ID : MONTHLY_VARIANT_ID;
  const getCheckoutUrl = () => {
    if (!user) return '#';
    return `https://whimperboard.lemonsqueezy.com/buy/${selectedVariantId}?checkout[custom][user_id]=${user.id}`;
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-6 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Whimperboard</h1>
        <p className="text-zinc-600 mb-4">Kennel Management Made Simple. Loading application...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  // 1. NEULOGOVANI KORISNIK (Landing Page)
  if (!user) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans">
        <header className="border-b border-zinc-200 py-5 px-8 bg-white sticky top-0 z-30">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">Whimperboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setIsSignUp(false); setShowAuthModal(true); setAuthError(''); }}
                className="text-xs font-bold text-zinc-700 hover:text-black transition"
              >
                Log In
              </button>
              <button
                onClick={() => { setIsSignUp(true); setShowAuthModal(true); setAuthError(''); }}
                className="bg-lime-400 hover:bg-lime-500 text-black font-black text-xs px-4 py-2.5 rounded-xl border border-lime-500 shadow-sm transition"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
          <span className="bg-lime-100 border border-lime-300 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            Designed for Small Pet Boarding Kennels
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-black tracking-tight mt-6 leading-tight">
            Manage your kennel boxes & care reminders effortlessly.
          </h1>
          <p className="text-lg text-zinc-600 mt-6 max-w-2xl mx-auto font-medium">
            Replace chaotic paper notes and whiteboards. Track pet profiles, daily rates, stay costs, and custom medication schedules in one simple mobile dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => { setIsSignUp(true); setShowAuthModal(true); setAuthError(''); }}
              className="bg-black hover:bg-zinc-800 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition"
            >
              Start 14-Day Free Trial
            </button>
          </div>
        </section>

        <section className="bg-zinc-50 border-y border-zinc-200 py-20 px-6">
          <div className="max-w-md mx-auto bg-white border-2 border-zinc-900 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute -top-4 right-6 bg-lime-400 border border-black font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full text-black">
              Standard Pass
            </div>
            <h3 className="text-2xl font-black text-black">Kennel Pro</h3>
            <p className="text-xs text-zinc-500 mt-1">Everything your kennel needs to stay organized.</p>
            
            <div className="flex bg-zinc-100 p-1 rounded-xl my-6 border border-zinc-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Monthly (€14)
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  billingCycle === 'yearly' ? 'bg-lime-400 text-black shadow-sm border border-lime-500' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Yearly (€149) ⚡
              </button>
            </div>

            <div className="my-6">
              {billingCycle === 'monthly' ? (
                <div>
                  <span className="text-5xl font-black text-black">€14</span>
                  <span className="text-sm font-bold text-zinc-500"> / month</span>
                </div>
              ) : (
                <div>
                  <span className="text-5xl font-black text-black">€149</span>
                  <span className="text-sm font-bold text-zinc-500"> / year</span>
                  <p className="text-[11px] font-bold text-emerald-600 mt-1">Save ~€19 compared to monthly billing</p>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8 border-t border-b border-zinc-100 py-6 text-xs font-semibold text-zinc-700">
              <li className="flex items-center gap-2">✓ Unlimited Kennel Boxes & Dogs</li>
              <li className="flex items-center gap-2">✓ Automatic Stay Cost Calculation (Days × Rate)</li>
              <li className="flex items-center gap-2">✓ Custom Medication & Food Alerts</li>
              <li className="flex items-center gap-2">✓ Mobile App Access (Install on iOS & Android)</li>
              <li className="flex items-center gap-2">✓ Real-time Cloud Data Sync</li>
              <li className="flex items-center gap-2">✓ 14-Day Free Trial (Cancel anytime)</li>
            </ul>

            <button
              onClick={() => { setIsSignUp(true); setShowAuthModal(true); setAuthError(''); }}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-black text-sm py-3.5 rounded-xl border border-lime-500 shadow-sm transition"
            >
              Get Started – Free for 14 Days
            </button>
          </div>
        </section>

        <ContactForm />

        {showAuthModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border-2 border-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-black">Whimperboard</h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {isSignUp ? 'Create your account to start 14-day trial' : 'Welcome back'}
                </p>
              </div>

              {isSignUp && (
                <div className="mb-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <label className="flex items-start gap-2.5 cursor-pointer text-left">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                    />
                    <span className="text-xs text-zinc-600 leading-snug">
                      I agree to the{' '}
                      <Link href="/terms" target="_blank" className="text-emerald-600 font-bold hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" target="_blank" className="text-emerald-600 font-bold hover:underline">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSignUp && !acceptedTerms}
                className={`w-full font-bold text-xs py-3 px-4 rounded-xl transition border-2 flex items-center justify-center gap-2 mb-4 shadow-xs ${
                  isSignUp && !acceptedTerms
                    ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed opacity-60'
                    : 'bg-white hover:bg-zinc-50 text-black border-zinc-200'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Or email</span>
                <div className="flex-grow border-t border-zinc-200"></div>
              </div>

              <form onSubmit={handleAuth} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
                    placeholder="••••••••"
                  />
                  {isSignUp && <p className="text-[10px] text-zinc-400 mt-1">Must be at least 8 characters long.</p>}
                </div>

                {authError && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5">
                    <p className="text-xs text-rose-600 font-bold">{authError}</p>
                  </div>
                )}

                {authMessage && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                    <p className="text-xs text-emerald-700 font-bold">{authMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSignUp && !acceptedTerms}
                  className={`w-full font-black text-xs py-3 rounded-xl border shadow-sm transition mt-2 ${
                    isSignUp && !acceptedTerms
                      ? 'bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed'
                      : 'bg-lime-400 hover:bg-lime-500 text-black border-lime-500'
                  }`}
                >
                  {isSignUp ? 'Start Free Trial' : 'Log In'}
                </button>
              </form>

              <div className="text-center mt-4">
                <button
                  onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); setAuthMessage(''); }}
                  className="text-xs font-bold text-zinc-600 hover:text-black underline"
                >
                  {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. ULOGOVAN KORISNIK KOJI NEMA AKTIVNU PRETPLATU (Paywall Gate)
  if (!isPro) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col justify-center items-center px-6 py-12">
        <div className="max-w-md w-full bg-white border-2 border-zinc-900 rounded-3xl p-8 shadow-2xl relative text-center">
          <div className="mb-4">
            <span className="bg-rose-100 border border-rose-300 text-rose-800 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              Subscription Required
            </span>
          </div>
          
          <h2 className="text-3xl font-black text-black">Start Your 14-Day Free Trial</h2>
          <p className="text-xs text-zinc-500 mt-2">
            Enter your card details to activate access. You won’t be charged during the trial and can cancel anytime.
          </p>

          <div className="flex bg-zinc-100 p-1 rounded-xl my-6 border border-zinc-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                billingCycle === 'monthly' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Monthly (€14)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                billingCycle === 'yearly' ? 'bg-lime-400 text-black shadow-sm border border-lime-500' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Yearly (€149) ⚡
            </button>
          </div>

          <div className="my-6">
            {billingCycle === 'monthly' ? (
              <div>
                <span className="text-5xl font-black text-black">€14</span>
                <span className="text-sm font-bold text-zinc-500"> / month</span>
              </div>
            ) : (
              <div>
                <span className="text-5xl font-black text-black">€149</span>
                <span className="text-sm font-bold text-zinc-500"> / year</span>
                <p className="text-[11px] font-bold text-emerald-600 mt-1">Save ~€19 compared to monthly billing</p>
              </div>
            )}
          </div>

          <ul className="space-y-2 mb-8 border-t border-b border-zinc-100 py-6 text-xs font-semibold text-zinc-700 text-left">
            <li className="flex items-center gap-2">✓ Full Access to All Kennel Features</li>
            <li className="flex items-center gap-2">✓ 14 Days Free – No Charge Today</li>
            <li className="flex items-center gap-2">✓ Cancel Anytime With 1 Click</li>
          </ul>

          <a
            href={getCheckoutUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-lime-400 hover:bg-lime-500 text-black font-black text-sm py-4 rounded-xl border border-lime-500 shadow-md transition text-center"
          >
            Enter Card & Start Trial
          </a>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center text-xs">
            <span className="text-zinc-500 truncate max-w-[180px]">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-zinc-700 hover:text-black font-bold underline"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. ULOGOVAN KORISNIK SA AKTIVNOM PRETPOLATOM (Glavni Dashboard)
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans pb-12 relative">
      <header className="bg-lime-400 px-8 py-6 border-b border-lime-500 shadow-sm relative z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 bg-black hover:bg-zinc-800 rounded-xl flex flex-col justify-center items-center gap-1.5 p-2 transition shadow-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-90 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-90 -translate-y-2' : ''}`} />
            </button>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-black">Whimperboard</h1>
              <p className="text-black/80 font-medium text-sm mt-0.5">Kennel & Care Management System</p>
            </div>
          </div>

          <button
            onClick={handleAddNewBox}
            className="bg-black hover:bg-zinc-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition shadow-md"
          >
            + Add Box
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="absolute top-24 left-8 bg-white border-2 border-zinc-900 rounded-2xl shadow-2xl w-64 py-3 z-30">
          <div className="px-4 py-2 border-b border-zinc-100">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Account</p>
            <p className="text-sm font-semibold text-zinc-900 truncate">{user.email}</p>
          </div>

          <div className="py-1 border-b border-zinc-100">
            <button
              onClick={() => { setMenuOpen(false); handleInstallApp(); }}
              className="w-full text-left px-4 py-2.5 text-sm font-bold text-lime-700 bg-lime-50 hover:bg-lime-100 transition flex items-center justify-between"
            >
              <span>Install Mobile App</span>
              <span className="text-xs font-black">↓</span>
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              Log out
            </button>
            <button
              onClick={() => { setMenuOpen(false); setActiveModal('delete'); }}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
            >
              Delete account
            </button>
          </div>
          <div className="border-t border-zinc-100 py-1">
            <Link
              href="/privacy"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              Terms and conditions
            </Link>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boxes.map((box) => {
            const calculatedTotal = box.pet && box.pet.pricePerDay && box.pet.daysCount 
              ? Number(box.pet.pricePerDay) * Number(box.pet.daysCount) 
              : null;

            return (
              <div
                key={box.id}
                onClick={() => handleOpenModal(box)}
                className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-150 hover:shadow-lg ${
                  box.pet ? 'bg-zinc-50 border-zinc-900' : 'bg-white border-zinc-200 hover:border-zinc-400'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => handleDeleteBox(e, box.id)}
                  title="Remove Box"
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-zinc-100 hover:bg-rose-100 text-zinc-500 hover:text-rose-600 flex items-center justify-center font-bold text-xs transition border border-zinc-200"
                >
                  ✕
                </button>

                <div className="mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                    {box.name}
                  </span>
                </div>

                {box.pet ? (
                  <div>
                    <h3 className="text-2xl font-black text-black mb-1">{box.pet.dogName}</h3>
                    {box.pet.breed && (
                      <p className="text-xs font-semibold text-zinc-500 mb-2">{box.pet.breed}</p>
                    )}

                    {box.pet.ownerPhone && (
                      <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-xl px-3 py-2 mb-3 shadow-xs" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs font-bold text-zinc-700">📞 {box.pet.ownerPhone}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(box.pet.ownerPhone)}
                          className="flex items-center gap-1 text-[11px] font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 px-2 py-1 rounded-lg transition"
                          title="Copy phone number"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </button>
                      </div>
                    )}

                    {box.pet.entryDate && (
                      <p className="text-[11px] font-semibold text-zinc-500 mb-3">
                        📅 Entered: <span className="text-zinc-800">{box.pet.entryDate}</span>
                      </p>
                    )}

                    {calculatedTotal !== null && (
                      <div className="bg-lime-200/70 border border-lime-400 rounded-xl p-2.5 mb-3 flex justify-between items-center">
                        <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider">Total Stay Due:</span>
                        <span className="text-sm font-black text-black">€{calculatedTotal}</span>
                      </div>
                    )}

                    {box.pet.notes && (
                      <p className="text-xs text-zinc-600 bg-zinc-100 p-2.5 rounded-lg mb-3 border border-zinc-200/80 italic">
                        &quot;{box.pet.notes}&quot;
                      </p>
                    )}

                    {box.pet.reminders && box.pet.reminders.length > 0 && (
                      <div className="space-y-1.5 mt-3 pt-3 border-t border-zinc-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Reminders ({box.pet.reminders.length})
                        </span>
                        {box.pet.reminders.map((r) => (
                          <div
                            key={r.id}
                            className="bg-lime-100 border border-lime-300 rounded-lg p-2 text-xs text-zinc-900 flex items-center justify-between"
                          >
                            <span className="font-medium truncate pr-2">{r.text || 'Reminder'}</span>
                            <span className="text-[10px] font-bold text-zinc-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">
                              {r.date} {r.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-28 flex items-center justify-center text-zinc-400 text-sm font-semibold">
                    + Click to add dog
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {selectedBox && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-zinc-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBox(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-black text-black mb-5">
              {selectedBox.name} – {selectedBox.pet ? 'Edit Details' : 'Add Dog'}
            </h2>

            {selectedBox.id === boxes[0]?.id && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Default Time Zone for New Boxes
                </label>
                <select
                  value={selectedBox.timeZone || defaultTimeZone}
                  onChange={(e) => handleUpdateTimeZone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                >
                  {timeZoneOptions.map((timeZone) => (
                    <option key={timeZone} value={timeZone}>{timeZone}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-zinc-500">
                  New boxes will use this time zone.
                </p>
              </div>
            )}

            <form onSubmit={handleSavePet} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Dog Name *</label>
                <input
                  type="text"
                  required
                  value={formData.dogName}
                  onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                  placeholder="e.g. Max"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Breed</label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                  placeholder="e.g. Golden Retriever"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Owner Phone Number</label>
                <input
                  type="tel"
                  value={formData.ownerPhone || ''}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                  placeholder="e.g. +49 151 2345678"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Entry Date</label>
                <input
                  type="date"
                  value={formData.entryDate || ''}
                  onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Price per Day (€)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                    placeholder="e.g. 15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Number of Days</label>
                  <input
                    type="number"
                    value={formData.daysCount}
                    onChange={(e) => setFormData({ ...formData, daysCount: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                    placeholder="e.g. 7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Notes & Special Care</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black"
                  placeholder="e.g. Allergic to chicken..."
                />
              </div>

              <div className="bg-lime-50 border border-lime-300 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-black uppercase tracking-wider">Custom Reminders</label>
                  <button
                    type="button"
                    onClick={handleAddReminder}
                    className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    + Add Reminder
                  </button>
                </div>

                {formData.reminders.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">No reminders set. Click above to add alerts.</p>
                ) : (
                  <div className="space-y-3">
                    {formData.reminders.map((reminder) => (
                      <div key={reminder.id} className="bg-white border border-zinc-200 rounded-lg p-3 space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveReminder(reminder.id)}
                          className="absolute top-2 right-2 text-zinc-400 hover:text-rose-600 text-xs font-bold"
                        >
                          ✕
                        </button>
                        <input
                          type="text"
                          required
                          value={reminder.text}
                          onChange={(e) => handleUpdateReminder(reminder.id, 'text', e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-black focus:outline-none focus:border-black"
                          placeholder="What to remind? (e.g. Give insulin)"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Date</label>
                            <input
                              type="date"
                              required
                              value={reminder.date}
                              onChange={(e) => handleUpdateReminder(reminder.id, 'date', e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs text-black focus:outline-none focus:border-black"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Time</label>
                            <input
                              type="time"
                              required
                              value={reminder.time}
                              onChange={(e) => handleUpdateReminder(reminder.id, 'time', e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs text-black focus:outline-none focus:border-black"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
                {selectedBox.pet ? (
                  <button
                    type="button"
                    onClick={handleClearBox}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-3.5 py-2 rounded-xl transition border border-rose-200"
                  >
                    Clear Box / Check-out
                  </button>
                ) : <div />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBox(null)}
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-lime-400 hover:bg-lime-500 text-black font-black text-xs px-5 py-2 rounded-xl transition border border-lime-500 shadow-sm"
                  >
                    Save Dog
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-zinc-400 hover:text-black font-bold text-lg">✕</button>
            
            {activeModal === 'delete' && (
              <div>
                <h3 className="text-lg font-black text-rose-600 mb-3">Delete Account & Data</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">Are you sure you want to delete your account? This action permanently wipes your email, password, pet records, and entire profile from our servers.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setActiveModal(null)} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2 rounded-xl transition">Cancel</button>
                  <button onClick={handleDeleteAccount} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition">Yes, Delete Everything</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ContactForm />
      
      <footer className="w-full border-t border-zinc-200 py-6 mt-auto text-center text-xs text-zinc-500">
  <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
    <p>© {new Date().getFullYear()} Whimperboard. All rights reserved.</p>
    <div className="space-x-4">
      <a href="/terms" className="hover:underline">Terms of Service</a>
      <a href="/privacy" className="hover:underline">Privacy Policy</a>
    </div>
  </div>
</footer>

    </div>
  );
}