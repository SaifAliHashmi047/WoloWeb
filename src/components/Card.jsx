import React from "react";

const Card = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 px-12 bg-secondary rounded-lg shadow-lg w-full max-w-sm text-center flex flex-col items-center justify-center"
    >
      {children}
      <h2 className="text-2xl font-semibold mb-4 text-white mt-4">{title}</h2>
    </div>
  );
};

export default Card;
