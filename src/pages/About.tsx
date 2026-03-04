import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Header */}
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zuZICZzaG-7tolc3-yX78SSBiP_6l5uaDA4xudLvsqFkmzLRs0Kb0vJni66y8pPHjLxFamOnjYKLd5b6PUelhGBBx11_zDt3gPlN0o3YLfAM0pYYh87jjtmtmJVhrPxzUIdewnD6HAKP3WwcQE9N7g9YgJTmVWNfWxBs4PJXRtyHYQuX7NvSxTyQ-tJxEmCLQnYZPO5p099SnLMnrBqr9rQ8LNZViXyGWkN_O-HdoHAVno5PzVRZcTAWjh2S8bH3s3H9ojBU0o" alt="Sardinia landscape" />
             <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl px-6 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Crafting the Future of Sardinian Mobility.</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              We are Solaris. A team dedicated to preserving the beauty of our island through sustainable innovation.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Our Story</span>
              <h2 className="text-4xl font-bold mt-4 mb-6">Born from the Sea and Sun.</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Solaris was founded in 2020 with a simple yet ambitious vision: to replace every combustion engine vehicle in Sardinia's resorts and protected areas with silent, zero-emission alternatives.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                What started as a small fleet of 10 golf carts has grown into the island's premier electric mobility provider, serving the most exclusive destinations on the Costa Smeralda.
              </p>
              <div className="flex gap-8 mt-8">
                <div>
                  <h4 className="text-4xl font-bold text-primary">500+</h4>
                  <p className="text-sm text-slate-500">Vehicles</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary">50+</h4>
                  <p className="text-sm text-slate-500">Partners</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary">0</h4>
                  <p className="text-sm text-slate-500">Emissions</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform rotate-3"></div>
              <img className="relative rounded-2xl shadow-xl w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7hSkc425MGFAgWiIOUULsQGsE4wJuDa42jfVMP2YxU7gsSBF5lkrkEsn--IYjPVfM8FH-iGwBYwhfxZ-ZVMTXFJSIDbbWqCC0H_Y-tLqMRf7JHrNpK2tJ-45ep0oGR10sDnmhppb2roIlvNfB7pLmDX9JHhO_11NXBrbVqak3kaI9p3z55gqybXmiZ8kvABD-OUE44e9q9NkqDSpec9HIwuSUP-Q56zkqLrUex5btoEpaz3nddqMaH1645xVJc20pIQZ94LOFirk" alt="Team working" />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-slate-900 text-white py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="material-symbols-outlined text-6xl text-primary mb-8">spa</span>
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-2xl font-light leading-relaxed opacity-90">
              "To provide a seamless, luxurious, and eco-friendly transportation ecosystem that enhances the experience of Sardinia while protecting its fragile environment for generations to come."
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Meet the Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-primary transition-all">
                <img className="w-full h-full object-cover" src="https://placeholder.pics/svg/200" alt="CEO" />
              </div>
              <h3 className="text-xl font-bold">Alessandro Deledda</h3>
              <p className="text-primary text-sm uppercase tracking-wider mt-1">Founder & CEO</p>
            </div>
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-primary transition-all">
                <img className="w-full h-full object-cover" src="https://placeholder.pics/svg/200" alt="COO" />
              </div>
              <h3 className="text-xl font-bold">Elena Mura</h3>
              <p className="text-primary text-sm uppercase tracking-wider mt-1">Head of Operations</p>
            </div>
            <div className="text-center group">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-primary transition-all">
                <img className="w-full h-full object-cover" src="https://placeholder.pics/svg/200" alt="CTO" />
              </div>
              <h3 className="text-xl font-bold">Marco Piras</h3>
              <p className="text-primary text-sm uppercase tracking-wider mt-1">Fleet Manager</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
