'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';

export interface LocalPhoto {
  id: string;
  file: File;
  preview: string;
  compressing: boolean;
}

interface PhotoUploaderProps {
  onFilesReady: (photos: LocalPhoto[]) => void;
}

export default function PhotoUploader({ onFilesReady }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!fileArray.length) return;

    // Creiamo i placeholder con stato "compressing"
    const previews: LocalPhoto[] = fileArray.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
      compressing: true,
    }));
    onFilesReady(previews);

    // Comprimi ogni file in background
    const compressed: LocalPhoto[] = await Promise.all(
      previews.map(async (photo) => {
        try {
          const compressedFile = await imageCompression(photo.file, {
            maxSizeMB: 1.2,
            maxWidthOrHeight: 1400,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.82,
          });
          const compressedBlob = new File([compressedFile], photo.file.name.replace(/\.\w+$/, '.webp'), {
            type: 'image/webp',
          });
          return {
            ...photo,
            file: compressedBlob,
            preview: URL.createObjectURL(compressedBlob),
            compressing: false,
          };
        } catch {
          return { ...photo, compressing: false };
        }
      })
    );
    onFilesReady(compressed);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-colors ${
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-outline-variant hover:border-primary hover:bg-surface-container-low'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />
      <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-3 block">add_photo_alternate</span>
      <p className="text-sm font-montserrat font-bold uppercase tracking-widest text-primary mb-1">
        Trascina o clicca per aggiungere foto
      </p>
      <p className="text-xs font-lato text-on-surface-variant">
        Più file supportati · Compressione automatica WebP · Max 1200px
      </p>
    </div>
  );
}
