export interface VeicoloAccessorio {
  id: string;
  titolo: string;
  descrizione: string;
  foto: string;
}

export interface VeicoloLanding {
  heroTitolo: string;
  heroDescrizione: string;
  heroImmagine: string;
  citazione: string;
  specificheHtml: string;
  accessori: VeicoloAccessorio[];
}

// Tipo Veicolo condiviso in tutto il progetto
export interface Veicolo {
  id: string;
  nome: string;
  categoria: string;
  prezzo: number;
  specs: Record<string, string>;
  foto: string[];   // primo elemento = copertina card
  landing?: VeicoloLanding;
  ordine?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
