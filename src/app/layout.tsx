import Navbar from '@/components/Navbar';
import PageWrapper from '@/components/PageWrapper';
import { Poppins, Quicksand, Raleway } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

// Initialize the Quicksand font
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
});

const ralewayFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
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
    <html lang="en" >
      <body
        className={` antialiased ${ralewayFont.className} `}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <PageWrapper>
          {children}
          <Toaster position="top-right" richColors />
        </PageWrapper>
      </body>
    </html>
  );
}
