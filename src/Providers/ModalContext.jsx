import { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const openModal = (props) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalState({});
    setIsLoading(false);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{
      isOpen,
      openModal,
      closeModal,
      modalProps,
      setModalProps,
      isLoading,
      setIsLoading,
      modalState,
      setModalState,
      setIsDisabled,
      isDisabled,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
