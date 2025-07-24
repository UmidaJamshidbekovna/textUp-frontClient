import { createContext, useState, useContext } from 'react';

const ImageModalContext = createContext();

export const ImageModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [rotation, setRotation] = useState(0);
  const [scaling, setScaling] = useState(1);

  const openModal = (props) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps({});
    setRotation(0)
    setScaling(1)
  };

  return (
    <ImageModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalProps,
        setModalProps,
        isLoading,
        setIsLoading,
        rotation,
        setRotation,
        scaling,
        setScaling,
      }}
    >
      {children}
    </ImageModalContext.Provider>
  );
};

export const useImageModal = () => {
  return useContext(ImageModalContext);
};
