import { useState } from 'react';

/**
 * useModal hook de gestion de l'état d'une modale
 *
 * @returns {{ modalState: any; openModal: (title: any, content: any) => void; closeModal: () => void; }}
 */

function useModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
  });

  const openModal = (title, content) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', content: null });
  };

  return { modalState, openModal, closeModal };
}

export default useModal;
