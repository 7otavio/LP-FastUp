type LogoProps = {
  className?: string;
  tone?: 'dark' | 'light';
};

export function Logo({ className = '', tone = 'dark' }: LogoProps) {
  const dark = tone === 'dark';

  return (
    <img
      src={'/assets/logo-' + tone + '.webp'}
      alt="Fast Up — MKT Imobiliário"
      width={dark ? 891 : 1913}
      height={dark ? 225 : 659}
      className={'block h-auto object-contain ' + (dark ? 'mix-blend-lighten ' : '') + (className || 'w-[152px] sm:w-[176px]')}
    />
  );
}
