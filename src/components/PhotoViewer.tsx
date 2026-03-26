'use client';

import { useCallback, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface PhotoViewerProps {
  photos: string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export default function PhotoViewer({ photos, initialIndex = 0, open, onClose }: PhotoViewerProps) {
  // Chiudi con ESC (già gestito da YARL internamente)
  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Lightbox
      open={open}
      close={handleClose}
      index={initialIndex}
      slides={photos.map((src) => ({ src }))}
      plugins={[Zoom, Thumbnails]}
      carousel={{ finite: false }}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
      thumbnails={{
        position: 'bottom',
        width: 80,
        height: 56,
        gap: 8,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 0,
      }}
      styles={{
        container: { backgroundColor: 'rgba(10, 12, 18, 0.97)' },
      }}
    />
  );
}
