import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import FloatingCTA from '@/components/FloatingCTA';

export const metadata = {
  title: {
    default: 'Culture Cocktails | Beverage Development Consultancy',
    template: '%s | Culture Cocktails',
  },
  description:
    'We develop beverages from concept to shelf. Custom formulation, RTD cocktails, functional beverages, sodas, and more. 25+ years experience.',
  keywords:
    'beverage development, custom formulation, RTD cocktails, functional beverages, beverage consulting',
  metadataBase: new URL('https://culturecocktails.co'),
  openGraph: {
    title: 'Culture Cocktails | Beverage Development Consultancy',
    description:
      'From raw ingredient sourcing to packaging supply chain — beverage product development proven at scale.',
    url: 'https://culturecocktails.co',
    siteName: 'Culture Cocktails',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Culture Cocktails | Beverage Development Consultancy',
    description:
      'From raw ingredient sourcing to packaging supply chain — beverage product development proven at scale.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <ScrollAnimations />
      </body>
    </html>
  );
}
