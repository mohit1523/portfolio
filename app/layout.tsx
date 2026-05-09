import './globals.css';
import SideNavbar from '../components/SideNavbar';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SideNavbar />
        {children}
      </body>
    </html>
  );
}
