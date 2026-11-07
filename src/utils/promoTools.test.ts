import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppUrl,
  formatInstagramHandle,
  calculateSliderPosition,
  generateSocialCaptions,
  PRESET_DIMENSIONS,
} from './promoTools.ts';

test('formatWhatsAppUrl formats digits and encodes messages correctly', () => {
  const url1 = formatWhatsAppUrl('+91 98765 43210', 'Hello there');
  assert.equal(url1, 'https://wa.me/919876543210?text=Hello%20there');

  const url2 = formatWhatsAppUrl('1 (555) 019-2834');
  assert.equal(url2, 'https://wa.me/15550192834');

  const empty = formatWhatsAppUrl('');
  assert.equal(empty, '');
});

test('formatInstagramHandle strips @ and spaces', () => {
  assert.equal(formatInstagramHandle('@webdev.kerala'), 'webdev.kerala');
  assert.equal(formatInstagramHandle('  @mybrand  '), 'mybrand');
  assert.equal(formatInstagramHandle('store_craft'), 'store_craft');
  assert.equal(formatInstagramHandle(''), '');
});

test('calculateSliderPosition clamps correctly between 0 and 100', () => {
  assert.equal(calculateSliderPosition(250, 0, 500), 50);
  assert.equal(calculateSliderPosition(-50, 0, 500), 0);
  assert.equal(calculateSliderPosition(600, 0, 500), 100);
  assert.equal(calculateSliderPosition(100, 50, 200), 25);
});

test('generateSocialCaptions injects brand and phone correctly', () => {
  const captions = generateSocialCaptions('Nova Digital', '@novadigital', '+15551234567');
  assert.match(captions.instagram, /@novadigital/);
  assert.match(captions.whatsapp, /\*Nova Digital\*/);
  assert.match(captions.facebook, /Nova Digital/);
});

test('PRESET_DIMENSIONS contains required social dimensions', () => {
  assert.equal(PRESET_DIMENSIONS.original.aspectRatio, '3:4');
  assert.equal(PRESET_DIMENSIONS.feed.aspectRatio, '4:5');
  assert.equal(PRESET_DIMENSIONS.story.aspectRatio, '9:16');
  assert.equal(PRESET_DIMENSIONS.square.aspectRatio, '1:1');
});
