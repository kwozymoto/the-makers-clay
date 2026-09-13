/**
 * Everything you'll want to change lives in this one file.
 */
export const SITE = {
  name: 'The Makers Clay',
  nameZh: '手作陶',
  tagline: 'Made to be used & loved.',
  taglineZh: '为日常而做,值得被爱。',
  instagram: 'https://www.instagram.com/themakersclay.lydia',
  instagramHandle: '@themakersclay.lydia',

  // TODO: put the real WhatsApp number here, international format, digits only.
  // e.g. Malaysian 012-345 6789 becomes '60123456789'
  whatsapp: '60000000000',

  // TODO: optional. Paste a form endpoint from MailerLite / Buttondown / Formspree
  // to turn on the drop waitlist. Leave empty and the site shows an Instagram
  // follow prompt instead, so nothing looks broken.
  waitlistEndpoint: '',

  email: '',
  location: 'Malaysia',
} as const;

/** Build a wa.me link with the message already typed out for the customer. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
