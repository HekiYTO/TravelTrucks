import type { Metadata } from 'next';
import CamperDetails from '@/components/CamperDetails/CamperDetails';
import { fetchCamper } from '@/lib/api/client';

type Props = { params: Promise<{ camperId: string }> };

// Наповнений head: назва та опис беруться з даних кемпера.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await fetchCamper(camperId);
    return { title: camper.name, description: camper.description?.slice(0, 160) };
  } catch {
    return { title: 'Camper' };
  }
}

export default async function CamperPage({ params }: Props) {
  const { camperId } = await params;
  return (
    <main>
      <div className="container">
        <CamperDetails camperId={camperId} />
      </div>
    </main>
  );
}
