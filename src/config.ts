import settings from './data/site.json';

/**
 * Fixed brand strings live here; everything Lydia can change from Pages CMS
 * lives in src/data/site.json and is merged in below. Editing that JSON in the
 * CMS is the same as editing this file, without touching code.
 */
export const SITE = {
  name: 'The Makers Clay',
  nameZh: '手作陶',

  /** Number in international format, digits only — '60123456789'. */
  whatsapp: settings.whatsapp,

  instagram: settings.instagram,
  instagramHandle: settings.instagramHandle,
  email: settings.email,

  /** MailerLite / Buttondown / Formspree endpoint. Empty hides the form. */
  waitlistEndpoint: settings.waitlistEndpoint,

  /**
   * While true the site shows a "work in progress" bar and asks search engines
   * not to index it (noindex + a robots.txt that disallows everything).
   * Turn it off in the CMS under Site settings when you are ready to be found.
   */
  preview: settings.preview,
};

/** True once a real number is set, so enquiry buttons can fall back to DMs. */
export const hasWhatsApp = !/^6?0+$/.test(SITE.whatsapp.replace(/\D/g, ''));

/** Build a wa.me link with the message already typed out for the customer. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
