export default function Footer() {
  return (
    <footer className="w-full mt-20 pt-16 pb-8 bg-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
        <div className="space-y-6">
          <div className="text-xl font-bold text-sky-900">SOLARIS</div>
          <p className="font-lato text-sm tracking-normal text-slate-600 max-w-xs">
            Crafting premium electric transportation solutions inspired by the timeless beauty of the Sardinian coastline.
          </p>
          <div className="flex gap-4">
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">share</span></a>
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Explore</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Fleet</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Sustainability</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Technology</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Sardinia Heritage</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Legal</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">The Coastline Newsletter</h4>
          <p className="font-lato text-xs text-slate-600 mb-4">Subscribe to receive updates on new fleet editions and coastal luxury insights.</p>
          <div className="flex">
            <input className="bg-white border-none text-xs w-full focus:ring-1 focus:ring-sky-900 py-3 px-4" placeholder="Your email address" type="email" />
            <button className="bg-sky-900 text-white px-4 py-3"><span className="material-symbols-outlined text-sm">mail</span></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-lato text-sm tracking-normal text-slate-600">© 2024 SOLARIS Premium PTV. Inspired by the Sardinian Coast.</p>
        <div className="flex gap-8">
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="#">Fleet</a>
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="#">Sustainability</a>
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
