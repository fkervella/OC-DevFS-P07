'use client';

import { useEffect, useRef } from 'react';

export default function ModalLayout({ isOpen, onClose, title, children }) {
  const modalRef = useRef();

  // Ferme la modale en cliquant en dehors ou avec la touche Échap
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Désactive le scroll du body
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Réactive le scroll du body
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300"
      >
        {/* En-tête de la modale */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black-font">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Fermer la modale"
          >
            ✕
          </button>
        </div>

        {/* Contenu dynamique de la modale */}
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}
