import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";

const CustomModal = ({ children, isOpen, onClose }) => {
  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center px-4">
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50"
            onClick={onClose}
          ></div>
          <div className="bg-white rounded-lg z-50 relative py-8 px-6">
            <button className="absolute top-4 right-4" onClick={onClose}>
              <BsX className="text-3xl" />
            </button>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default CustomModal;
