"use client";

import { X } from "lucide-react";

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const links = [
    { label: 'Termos de Uso', href: '/assim-ou-assado/termos-de-uso' },
    { label: 'Privacidade', href: '/assim-ou-assado/privacidade' },
  ];
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button onClick={onClose} className="mb-6 text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
          <nav className="space-y-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
