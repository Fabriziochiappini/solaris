'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { LocalPhoto } from './PhotoUploader';

interface SinglePhotoUploaderProps {
  onFileReady: (photo: LocalPhoto) => void;
  label?: string;
}

export default function SinglePhotoUploader({ onFileReady, label = "Trascina o clicca per caricare un'immagine" }: SinglePhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = async (files: FileList | File[]) => {
    const file = Array.from(files).find((f) => f.type.startsWith('image/'));
    if (!file) return;

    const preview: LocalPhoto = {
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      compressing: true,
    };
    onFileReady(preview);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1400,
        useWebWorker: true,
        fileType: 'image/webp',
        initialQuality: 0.85,
      });
      const compressedBlob = new File([compressedFile], file.name.replace(/\.\w+$/, '.webp'), {
        type: 'image/webp',
      });
      onFileReady({
        ...preview,
        file: compressedBlob,
        preview: URL.createObjectURL(compressedBlob),
        compressing: false,
      });
    } catch {
      onFileReady({ ...preview, compressing: false });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-outline-variant hover:border-primary hover:bg-surface-container-low'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && processFile(e.target.files)}
      />
      <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2 block">add_photo_alternate</span>
      <p className="text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-1">
        {label}
      </p>
      <p className="text-[10px] font-lato text-on-surface-variant">
        WebP compresso • Max 1200px
      </p>
    </div>
  );
}
