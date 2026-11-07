/**
 * Pure utility functions for promotional flyer management,
 * formatting, branding calculations, and WhatsApp link generation.
 */

export interface PresetDimension {
  id: 'original' | 'feed' | 'story' | 'square';
  label: string;
  width: number;
  height: number;
  aspectRatio: string;
  recommendedFor: string;
}

export const PRESET_DIMENSIONS: Record<string, PresetDimension> = {
  original: {
    id: 'original',
    label: 'Standard Flyer (3:4)',
    width: 1200,
    height: 1600,
    aspectRatio: '3:4',
    recommendedFor: 'Original High-Res Flyer & WhatsApp share',
  },
  feed: {
    id: 'feed',
    label: 'Instagram Feed (4:5)',
    width: 1080,
    height: 1350,
    aspectRatio: '4:5',
    recommendedFor: 'Instagram & Facebook Portrait Feed',
  },
  story: {
    id: 'story',
    label: 'Story / Reel (9:16)',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    recommendedFor: 'Instagram Stories, WhatsApp Status & Reels',
  },
  square: {
    id: 'square',
    label: 'Square Post (1:1)',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    recommendedFor: 'Social Media Carousels & Catalog',
  },
};

/**
 * Format a phone number into an international WhatsApp click-to-chat URL.
 */
export function formatWhatsAppUrl(rawPhone: string, message: string = ''): string {
  // Strip all non-digits
  const cleaned = rawPhone.replace(/\D/g, '');
  if (!cleaned) return '';

  const encodedMsg = message ? encodeURIComponent(message) : '';
  const query = encodedMsg ? `?text=${encodedMsg}` : '';
  return `https://wa.me/${cleaned}${query}`;
}

/**
 * Normalizes an Instagram username (removes leading @ and whitespace).
 */
export function formatInstagramHandle(handle: string): string {
  const trimmed = handle.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('@') ? trimmed.slice(1) : trimmed;
}

/**
 * Clamps slider percentage between 0 and 100 based on mouse/touch position.
 */
export function calculateSliderPosition(clientX: number, rectLeft: number, rectWidth: number): number {
  if (rectWidth <= 0) return 50;
  const relativeX = clientX - rectLeft;
  const percentage = (relativeX / rectWidth) * 100;
  return Math.max(0, Math.min(100, Math.round(percentage * 10) / 10));
}

/**
 * Generates ready-to-copy social media ad copy & captions.
 */
export function generateSocialCaptions(brandName: string, instagramHandle: string, whatsappNumber: string) {
  const brand = brandName.trim() || 'Our Team';
  const insta = instagramHandle ? `@${formatInstagramHandle(instagramHandle)}` : '';
  const wa = whatsappNumber.trim() || '+1234567890';

  return {
    instagram: `🚀 Take your business from LOCAL to GLOBAL! 🌍\n\n` +
      `Ready to launch a high-converting e-commerce website with guaranteed results?\n\n` +
      `✨ What's included:\n` +
      `✔️ Unlimited Products & Cart\n` +
      `✔️ Secure Online Payments (Stripe, UPI, Cards, PayPal)\n` +
      `✔️ Local & Global Shipping Integration\n` +
      `✔️ 1 Year Free Maintenance & Security\n` +
      `✔️ High-Converting UI/UX Design\n` +
      `✔️ 100% Mobile Responsive & Ultra-Fast\n\n` +
      `💬 DM ${insta || 'us'} or WhatsApp us at ${wa} to get started today!\n\n` +
      `#ecommerce #webdevelopment #onlinestore #businessgrowth #webdesign #shopify #digitalmarketing`,

    whatsapp: `*🔥 Go From Local to Global With a Custom E-Commerce Website!*\n\n` +
      `Build your online store with *${brand}* today:\n\n` +
      `• Unlimited Products & Cart\n` +
      `• Secure Online Payments\n` +
      `• Local & Global Shipping\n` +
      `• 1 Year Free Support & Maintenance\n` +
      `• Mobile-first lightning-fast store\n\n` +
      `👉 Contact us now for a live demo & quotation: ${formatWhatsAppUrl(wa, 'Hi! I want to build an e-commerce website.')}`,

    facebook: `Stop losing customers to competitors. Expand your sales worldwide with a modern, high-converting E-Commerce store designed by ${brand}.\n\n` +
      `Get 1 year of free maintenance, seamless payment gateways, and global shipping capabilities.\n\n` +
      `Click below or chat directly on WhatsApp to get your free consultation! 🛍️`,
  };
}
