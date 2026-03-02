import './globals.css';

export const metadata = {
  title: 'Culture Cocktails | Beverage Development Consultancy',
  description: 'We develop beverages from concept to shelf. Custom formulation, RTD cocktails, functional beverages, sodas, and more. 25+ years experience.',
  keywords: 'beverage development, custom formulation, RTD cocktails, functional beverages, beverage consulting',
  openGraph: {
    title: 'Culture Cocktails | Beverage Development Consultancy',
    description: 'From raw ingredient sourcing to packaging supply chain — beverage product development proven at scale.',
    type: 'website',
  },
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
      <body>{children}</body>
    </html>
  );
}
