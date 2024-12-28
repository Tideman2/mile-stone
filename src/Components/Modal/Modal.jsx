import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

const Modal = forwardRef(({ children, onClose }, ref) => {
  const modal = useRef();

  useEffect(() => {
    modal.current.showModal();
  }, []);

  useImperativeHandle(ref, () => ({
    closeModal: () => {
      modal.current.close();
      onClose(); // Notify parent to unmount
    }
  }));

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => ref.current.closeModal()}></div>
      <dialog ref={modal} className="z-50">
        {children}
        <button  className="m-1 bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-600 transition duration-200"
         type="button" onClick={() => ref.current.closeModal()}>
          Close
        </button>
      </dialog>
    </>,
    document.getElementById("portal-root")
  );
});

export default Modal;
