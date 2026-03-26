// Tipo Veicolo condiviso in tutto il progetto
export interface Veicolo {
  id: string;
  nome: string;
  categoria: string;
  prezzo: number;
  specs: Record<string, string>;
  foto: string[];   // primo elemento = copertina card
  ordine?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
