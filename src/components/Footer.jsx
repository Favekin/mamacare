import React from 'react';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' },
  { name: 'Tracker', path: '/tracker' },
  { name: 'Chat', path: '/chat' },
  { name: 'Account', path: '/auth' }, 
];

const socialLinks = [
    { icon: FaFacebook, name: 'Facebook', url: '#facebook' },
    { icon: FaTwitter, name: 'Twitter', url: '#twitter' },
    { icon: FaInstagram, name: 'Instagram', url: '#instagram' },
    { icon: FaLinkedin, name: 'LinkedIn', url: '#linkedin' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-10 pb-4 shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-secondary/50 pb-8">
          
          {}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-bold text-secondary mb-3">Mamacare</h3>
            <p className="text-sm text-gray-200">
              Your trusted partner through pregnancy and motherhood.
            </p>
          </div>

          {}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-200 hover:text-secondary transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="text-gray-200 hover:text-secondary transition">Privacy Policy</a></li>
                <li><a href="#terms" className="text-gray-200 hover:text-secondary transition">Terms of Service</a></li>
                <li><a href="#contact" className="text-gray-200 hover:text-secondary transition">Contact Us</a></li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-secondary hover:text-white transition transform hover:scale-110"
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="pt-4 text-center text-xs text-gray-400">
          <p>&copy; {currentYear} Mamacare App. All rights reserved.</p>
          <p className="mt-1">
            Disclaimer: This application is for informational purposes only and does not constitute medical advice. Consult a healthcare professional for specific concerns.
          </p>
        </div>
      </div>
    </footer>
  );
}