import Link from 'next/link';

export const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} target="_blank" className="underline decoration-amber-300">
      {children}
    </Link>
  );
};
