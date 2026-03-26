import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Upload, Trash2, X } from 'lucide-react';
import { Vehicle, getVehicles, addVehicle, uploadVehicleImage } from '../../lib/vehicles';

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stati Form
  const [showForm, setShowForm] = useState(false);
  const [marca, setMarca] = useState('');
  const [modello, setModello] = useState('');
  const [anno, setAnno] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [stato, setStato] = useState<'disponibile' | 'noleggiato' | 'manutenzione'>('disponibile');
  
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('Carica almeno un\'immagine del veicolo');
      return;
    }

    try {
      setUploading(true);
      
      // Carica tutte le immagini su Storage e ottieni gli URL
      const uploadPromises = images.map(img => uploadVehicleImage(img));
      const imageUrls = await Promise.all(uploadPromises);

      // Salva record su Firestore
      await addVehicle({
        marca,
        modello,
        anno: parseInt(anno, 10),
        prezzo: parseFloat(prezzo),
        descrizione,
        stato,
        immagini: imageUrls
      });

      // Pulisci il form e ricarica i dati
      setMarca('');
      setModello('');
      setAnno('');
      setPrezzo('');
      setDescrizione('');
      setStato('disponibile');
      setImages([]);
      setShowForm(false);
      
      await fetchData();
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Si è verificato un errore durante l\'aggiunta.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar Riservata */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center font-bold text-white shadow-sm shadow-blue-500/50">S</div>
              <h1 className="text-xl font-bold text-white tracking-wide">Solaris Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full">{currentUser?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-rose-400 bg-slate-800 rounded-md hover:bg-slate-700 hover:text-rose-300 transition-colors"
                title="Disconnetti"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Esci</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Intestazione Sezione */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Gestione Flotta</h2>
            <p className="mt-1 text-sm text-slate-500 font-medium">Visualizza, aggiungi o modifica i veicoli noleggiabili.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
            >
              {showForm ? <X className="mr-2 -ml-1 h-5 w-5" /> : <Plus className="mr-2 -ml-1 h-5 w-5" />}
              {showForm ? 'Annulla' : 'Aggiungi Veicolo'}
            </button>
          </div>
        </div>

        {/* Form Aggiunta */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800">Dettagli Nuovo Veicolo</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-slate-700">Marca</label>
                  <div className="mt-1">
                    <input
                      type="text" required value={marca} onChange={e => setMarca(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                      placeholder="es. Italcar"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-slate-700">Modello</label>
                  <div className="mt-1">
                    <input
                      type="text" required value={modello} onChange={e => setModello(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                      placeholder="es. Attiva"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Anno</label>
                  <div className="mt-1">
                    <input
                      type="number" required min="1900" max="2100" value={anno} onChange={e => setAnno(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                      placeholder="es. 2023"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Prezzo / Giorno (€)</label>
                  <div className="mt-1">
                    <input
                      type="number" required min="0" step="0.01" value={prezzo} onChange={e => setPrezzo(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Stato</label>
                  <div className="mt-1">
                    <select
                      value={stato} onChange={(e: any) => setStato(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                    >
                      <option value="disponibile">Disponibile</option>
                      <option value="noleggiato">Noleggiato</option>
                      <option value="manutenzione">In Manutenzione</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-slate-700">Descrizione</label>
                  <div className="mt-1">
                    <textarea
                      rows={3} required value={descrizione} onChange={e => setDescrizione(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 px-3 border bg-slate-50/50"
                      placeholder="Golf car a 4 posti, ideale per..."
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-slate-700">Foto del Veicolo (selezione multipla permessa)</label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer group">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Carica immagini</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">o trascina qui</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG fino a 5MB</p>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                       {images.map((img, i) => (
                           <div key={i} className="flex-shrink-0 relative w-16 h-16 rounded-md overflow-hidden border border-slate-200 shadow-sm">
                             <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="preview" />
                             {/* Mini overlay icon if needed */}
                           </div>
                       ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {uploading ? 'Aggiunta in corso...' : 'Salva Veicolo'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista Flotta */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
             <h3 className="text-lg leading-6 font-semibold text-slate-800">Elenco Veicoli Registrati</h3>
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
               {vehicles.length} in totale
             </span>
          </div>
          
          {loading ? (
             <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Caricamento flotta in corso...</p>
             </div>
          ) : vehicles.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto h-12 w-12 text-slate-300 mb-3"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
              <p className="text-slate-500">Nessun veicolo trovato nel Database.</p>
              <button onClick={() => setShowForm(true)} className="mt-4 text-blue-600 font-medium hover:underline">Aggiungi il primo veicolo</button>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {vehicles.map((v) => (
                <li key={v.id} className="p-6 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                      {v.immagini && v.immagini.length > 0 ? (
                        <img src={v.immagini[0]} alt={v.modello} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">Nessuna Info</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                         <p className="text-lg font-bold text-slate-900 truncate">
                           {v.marca} <span className="text-slate-500 font-medium ml-1">{v.modello}</span>
                         </p>
                         <p className="text-lg font-bold text-blue-600">€{v.prezzo}<span className="text-sm font-medium text-slate-500">/gg</span></p>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {v.descrizione}
                      </p>
                      
                      <div className="mt-3 flex items-center gap-3">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                           Anno {v.anno}
                         </span>
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                           v.stato === 'disponibile' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                           v.stato === 'noleggiato' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                           'bg-rose-50 text-rose-700 border-rose-200'
                         }`}>
                           {v.stato.charAt(0).toUpperCase() + v.stato.slice(1)}
                         </span>
                      </div>
                    </div>
                    <div className="hidden sm:block ml-4 flex-shrink-0">
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors opacity-0 group-hover:opacity-100" title="Elimina veicolo">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
