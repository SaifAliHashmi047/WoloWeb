import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import colors from "../colors";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <div className="loading-overlay">
      <div className="loading-spinner">
        <AiOutlineLoading3Quarters
          className="animate-spin"
          size={40}
          color={colors?.secondary}
        />
        <p>Loading...</p>
      </div>
    </div>,
    document.body
  );
};

export default LoadingModal;
