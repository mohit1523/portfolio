import Hero from '../components/Hero';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata(
    'Home',
    'Full stack developer portfolio focused on product delivery, performance, and recruiter-ready execution.',
    '/'
  );
}

export default async function Home() {
  return <Hero />;
}
