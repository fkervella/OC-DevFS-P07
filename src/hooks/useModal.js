import { useState } from 'react';

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
