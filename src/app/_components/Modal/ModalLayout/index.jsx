'use client';

import { useEffect } from 'react';

import { useFocusTrap } from '@/hooks/useFocusTrap';

/**
 * Layout des fenêtres modales
 *
 * @export
 * @param {boolean} isOpen modale ouverte
 * @param {Function} onClose action à réaliser à la fermture de la modale
 * @param {string} title Titre de la modale
 * @param {string} children Contenu de la modale
 * @returns {string} Code HTML de la modale
 */

export default function ModalLayout({ isOpen, onClose, title, children }) {
  const modalRef = useFocusTrap(isOpen);

  // Ferme la modale en cliquant en dehors ou avec la touche Échap
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Fermeture de la modale par la touche Echap
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300"
      >
        {/* En-tête de la modale */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-black-font">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer min-h-2 min-w-2"
            aria-label="Fermer la modale"
          >
            X
          </button>
        </div>

        {/* Contenu dynamique de la modale */}
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}
