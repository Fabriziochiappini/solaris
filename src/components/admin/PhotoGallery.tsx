'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface GalleryPhoto {
  id: string;
  url: string;       // URL Firebase Storage (foto già caricate)
  preview?: string;  // Preview locale (foto in attesa di upload)
  compressing?: boolean;
}

interface SortablePhotoProps {
  photo: GalleryPhoto;
  index: number;
  onDelete: (id: string) => void;
}

function SortablePhoto({ photo, index, onDelete }: SortablePhotoProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const imgSrc = photo.preview || photo.url;

  return (
    <div ref={setNodeRef} style={style} className="relative group aspect-square">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
      />
      <img
        src={imgSrc}
        alt={`Foto ${index + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Badge Principale */}
      {index === 0 && (
        <span className="absolute top-2 left-2 z-20 bg-secondary text-on-secondary text-[9px] font-montserrat font-bold uppercase tracking-widest px-2 py-1">
          Principale
        </span>
      )}

      {/* Compressing overlay */}
      {photo.compressing && (
        <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Delete button */}
      <button
        type="button"
        onClick={() => onDelete(photo.id)}
        className="absolute top-2 right-2 z-20 w-7 h-7 bg-error text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        title="Rimuovi foto"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>

      {/* Order badge */}
      <div className="absolute bottom-2 right-2 z-20 bg-black/60 text-white text-[9px] w-5 h-5 flex items-center justify-center font-bold">
        {index + 1}
      </div>
    </div>
  );
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onChange: (photos: GalleryPhoto[]) => void;
}

export default function PhotoGallery({ photos, onChange }: PhotoGalleryProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      onChange(arrayMove(photos, oldIndex, newIndex));
    }
  };

  const handleDelete = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  if (photos.length === 0) {
    return (
      <div className="bg-surface-container-low border border-dashed border-outline-variant p-8 text-center text-sm font-lato text-on-surface-variant">
        Nessuna foto ancora. Usa l&apos;uploader sopra per aggiungerne.
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {photos.map((photo, index) => (
            <SortablePhoto key={photo.id} photo={photo} index={index} onDelete={handleDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
