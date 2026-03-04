import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Header */}
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact SOLARIS</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              We are here to assist you with your electric mobility needs in Sardinia. Reach out to our team for inquiries, support, or partnerships.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Headquarters</h4>
                    <p className="text-slate-500">
                      Via del Mare, 45<br />
                      07026 Olbia (SS)<br />
                      Sardegna, Italia
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-slate-500">
                      <a href="tel:+390789123456" className="hover:text-primary transition-colors">+39 0789 123456</a>
                      <br />
                      <span className="text-xs text-slate-400">Mon-Fri, 9am - 6pm CET</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-slate-500">
                      <a href="mailto:info@solaris-electric.it" className="hover:text-primary transition-colors">info@solaris-electric.it</a>
                      <br />
                      <a href="mailto:support@solaris-electric.it" className="hover:text-primary transition-colors">support@solaris-electric.it</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 w-full h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zuZICZzaG-7tolc3-yX78SSBiP_6l5uaDA4xudLvsqFkmzLRs0Kb0vJni66y8pPHjLxFamOnjYKLd5b6PUelhGBBx11_zDt3gPlN0o3YLfAM0pYYh87jjtmtmJVhrPxzUIdewnD6HAKP3WwcQE9N7g9YgJTmVWNfWxBs4PJXRtyHYQuX7NvSxTyQ-tJxEmCLQnYZPO5p099SnLMnrBqr9rQ8LNZViXyGWkN_O-HdoHAVno5PzVRZcTAWjh2S8bH3s3H9ojBU0o" alt="Map" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-lg shadow-md font-bold text-sm">View on Google Maps</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">First Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Subject</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Rental Quote</option>
                    <option>Fleet Partnership</option>
                    <option>Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                  <textarea className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32"></textarea>
                </div>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
