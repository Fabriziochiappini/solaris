'use client';

import { useState } from 'react';

interface SpecEditorProps {
  specs: { chiave: string; valore: string }[];
  onChange: (specs: { chiave: string; valore: string }[]) => void;
}

export default function SpecEditor({ specs, onChange }: SpecEditorProps) {
  const addSpec = () => {
    onChange([...specs, { chiave: '', valore: '' }]);
  };

  const removeSpec = (index: number) => {
    onChange(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: 'chiave' | 'valore', value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {specs.map((spec, i) => (
        <div key={i} className="flex gap-3 items-center">
          <input
            value={spec.chiave}
            onChange={(e) => updateSpec(i, 'chiave', e.target.value)}
            placeholder="es. Autonomia"
            className="flex-1 border border-outline-variant bg-surface px-3 py-2 text-sm font-lato focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
          />
          <input
            value={spec.valore}
            onChange={(e) => updateSpec(i, 'valore', e.target.value)}
            placeholder="es. 135 km"
            className="flex-1 border border-outline-variant bg-surface px-3 py-2 text-sm font-lato focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
          />
          <button
            type="button"
            onClick={() => removeSpec(i)}
            className="text-error hover:bg-error-container p-1.5 transition-colors"
            title="Rimuovi specifica"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSpec}
        className="flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
      >
        <span className="material-symbols-outlined text-base">add</span>
        Aggiungi Specifica
      </button>
    </div>
  );
}
