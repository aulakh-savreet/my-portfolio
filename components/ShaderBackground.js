import dynamic from 'next/dynamic';

const BlackHoleText = dynamic(() => import('./BlackHoleText'), {
  ssr: false
});

export default function ShaderBackground() {
  return <BlackHoleText />;
}