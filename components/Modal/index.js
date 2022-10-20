import React, {useRef} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import './index.css'

const Modal = ({children, onClose, title = ''}) => {
  const ref = useRef(null);

  const closeModal = () => {
    document.querySelector("body").classList.remove("overflow-hidden");
    onClose();
  };

  useOnClickOutside(ref, () => {
    closeModal();
  });

  return (
    <div
      className="modal-container fixed overflow-auto flex items-center"
    >
      <div
        ref={ref}
        className="modal-content"
        style={{}}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
