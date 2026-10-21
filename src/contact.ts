const WHATSAPP_NUMBER = '5531920004624';

export const WHATSAPP_DISPLAY = '(31) 92000-4624';
export const EMAIL = 'fastupmkt@gmail.com';

export function whatsappLink(message = 'Olá! Vim pelo site da Fast Up e quero saber mais sobre os serviços.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
