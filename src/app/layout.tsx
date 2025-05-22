import Navbar from '@/components/Navbar';

import './globals.css';


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
    <html lang="en">
      <body
        className={`bg-gray-100 antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
