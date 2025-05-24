import Navbar from '@/components/Navbar';
import PageWrapper from '@/components/PageWrapper';
import { Quicksand } from 'next/font/google';

import './globals.css';

// Initialize the Quicksand font
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Luxury Car Dealership',
  description: 'Find your dream luxury car',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body
        className={` antialiased font-quicksand`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
