// components/ShaderBackground.js
import dynamic from 'next/dynamic';

const BlackHoleText = dynamic(() => import('./BlackHoleText'), {
  ssr: false
});

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto">
      <BlackHoleText />
    </div>
  );
}