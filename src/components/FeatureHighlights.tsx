import React from 'react';
import { ShoppingCart, ShieldCheck, Globe, Wrench, Sparkles, Smartphone, Code2 } from 'lucide-react';

const FEATURES = [
  {
    icon: ShoppingCart,
    title: 'Unlimited Products & Cart',
    description: 'Sell without limits. Complete cart with stock management, product variations, reviews, and discount coupons.',
    tag: 'E-Commerce Core',
  },
  {
    icon: Wrench,
    title: '1 Year Free Maintenance',
    description: 'Zero technical worries. Free bug fixes, server updates, monthly backups, and continuous 24/7 uptime monitoring.',
    tag: 'Agency Guarantee',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Online Payments',
    description: 'Accept Apple Pay, Google Pay, Credit/Debit Cards, UPI, Stripe, and PayPal with encrypted PCI-compliant checkouts.',
    tag: 'Instant Payouts',
  },
  {
    icon: Sparkles,
    title: 'High-Converting UI Design',
    description: 'Custom UI/UX crafted to turn store visitors into paying buyers with 1-click buy buttons and optimized checkout funnel.',
    tag: 'Conversion Rate',
  },
  {
    icon: Globe,
    title: 'Local & Global Shipping',
    description: 'Automated courier rates, pin-code/postal verification, multi-currency display, and real-time shipment parcel tracking.',
    tag: 'Worldwide Reach',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive & Fast',
    description: '95+ Google PageSpeed score. Silky smooth experience across iPhones, Android devices, tablets, and desktop displays.',
    tag: 'Speed Optimized',
  },
];

export const FeatureHighlights: React.FC = () => {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-emerald-500/20 p-6 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-1">
        <Code2 className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-white">Included In The E-Commerce Package</h3>
      </div>
      <p className="text-xs text-slate-400 mb-6">
        The 6 core selling points featured in your promotional flyer
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-emerald-500/20">
                  {feat.tag}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100 mb-1 flex items-center gap-1.5">
                <span className="text-emerald-400 font-mono text-xs">&lt;/&gt;</span>
                {feat.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
