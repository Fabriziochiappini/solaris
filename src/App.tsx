/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rental from './pages/Rental';
import Fleet from './pages/Fleet';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noleggio" element={<Rental />} />
        <Route path="/flotta" element={<Fleet />} />
        <Route path="/chi-siamo" element={<About />} />
        <Route path="/contatti" element={<Contact />} />
      </Routes>
    </Router>
  );
}
