import React from "react";

const CourseCard = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" overflow-hidden bg-secondary rounded-lg shadow-lg w-full max-w-sm text-center flex flex-col items-center justify-center"
    >
      {children}
      <h2 className="flex text-lg font-semibold my-2 text-white line-clamp-1 mx-4 h-16">
        {title} {title}
      </h2>
    </div>
  );
};

export default CourseCard;
