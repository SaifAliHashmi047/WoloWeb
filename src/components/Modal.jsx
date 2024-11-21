import ReactDOM from "react-dom";

export const Modal = ({ children, onClose, className }) => {
  // Handle clicks outside of the modal content
  const handleOverlayClick = (e) => {
    // Close modal only if the click is on the overlay itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0  bg-black bg-opacity-30   p-3 flex flex-col items-center justify-center z-40"
      onClick={handleOverlayClick}
    >
      <div className=" flex w-96 justify-end mb-[-38px] z-50">
        <button
          onClick={() => onClose()}
          className=" top-4 right-4 justify-items-end self-end text-white rounded-full bg-grey py-1 px-2 hover:bg-gray-300 mx-2"
        >
          ✖
        </button>
      </div>
      <div className={`bg-white rounded-xl p-3  w-96    ${className}`}>
        <div className="  flex-1 px-5 pb-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};
