import { SliceSimulator } from '@slicemachine/adapter-next/simulator';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator>
      <SliceZone slices={[]} components={components} />
    </SliceSimulator>
  );
}
