import Image from 'next/image';
import type { Demo } from './demos-data';

export default function DeviceFrame({
  demo,
  sizes,
  priority = false,
  className = '',
}: {
  demo: Demo;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { image, frame, url } = demo;
  return (
    <div className={`device-frame device-${frame} ${className}`.trim()}>
      {frame === 'browser' ? (
        <div className="device-chrome" aria-hidden="true">
          <span className="device-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="device-url">{url}</span>
        </div>
      ) : (
        <span className="device-notch" aria-hidden="true" />
      )}
      <div className="device-screen">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </div>
      <span className="concept-badge">Concept</span>
    </div>
  );
}
