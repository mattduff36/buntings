import Image from 'next/image';

interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 50, className }: LogoProps) {
  const intrinsicWidth = 744;
  const intrinsicHeight = 177;
  const aspectRatio = intrinsicWidth / intrinsicHeight;
  const displayWidth = Math.round(height * aspectRatio);

  return (
    <Image
      src="/images/logo.png"
      alt="Buntings Agri Ltd."
      width={intrinsicWidth}
      height={intrinsicHeight}
      className={className}
      priority
      style={{ height, width: displayWidth, objectFit: 'contain' }}
    />
  );
}
