import React, { useState, useEffect } from "react";

interface FlashMessageProps {
  message: string;
  type: "success" | "error"; // success or error type
  onClose: () => void; // Callback to hide the flash message
  duration?: number; // Duration in milliseconds (default 3 seconds)
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Trigger callback to remove the message
      }, duration);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      className={`fixed top-20 right-2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg ${
        type === "success" ? " bg-primary" : "bg-red"
      } text-white`}
    >
      <p>{message}</p>
    </div>
  );
};

export default FlashMessage;
