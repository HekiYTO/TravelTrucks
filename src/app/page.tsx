import type { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Campers of your dreams. You can find everything you want in our catalog.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
