import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DevY Emploi',
    template: '%s | DevY Emploi',
  },
  description: 'Mini application de gestion, affichage et suivi des offres.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <footer className="siteFooter">
          <Link href="/mentions" className="siteFooterLink">
            Mentions legales
          </Link>
        </footer>
      </body>
    </html>
  );
}
