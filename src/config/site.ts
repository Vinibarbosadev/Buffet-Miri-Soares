export const SITE_URL = 'https://buffet-miria-soares.vercel.app';
export const BUSINESS_NAME = 'Buffet Miriã Soares';
export const WHATSAPP_NUMBER = '5538992526383';
export const INSTAGRAM_URL = 'https://www.instagram.com/miriasoaresbuffet/';
export const INITIAL_WHATSAPP_MESSAGE =
  'Olá! Conheci o Buffet Miriã Soares pelo site e gostaria de solicitar um orçamento para meu evento.';

export function buildWhatsAppLink(message: string = INITIAL_WHATSAPP_MESSAGE) {
  const encoded = encodeURIComponent(message);

  if (!WHATSAPP_NUMBER) {
    return `https://api.whatsapp.com/send?text=${encoded}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
