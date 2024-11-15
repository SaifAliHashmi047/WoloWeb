import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const CollapseView = ({
  title,
  children,
  className,
  iconColor = false,
  childrenUpdate,
  notifyParent,
}) => {
  const [footerOpen, setFooterOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const handleClick = () => {
    setFooterOpen(!footerOpen);
    notifyParent(childrenUpdate);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(footerOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [footerOpen, childrenUpdate]);

  return (
    <div className="">
      <div
        onClick={handleClick}
        className={`bg-primary w-full h-10 text-white p-3 sm:w-auto  font-semibold flex items-center rounded-md justify-between , ${className}`}
      >
        <p className="line-clamp-1">{title}</p>
        {footerOpen ? (
          <FaChevronUp
            size={20}
            className={`${iconColor ? " text-darkGray" : "text-white"}`}
          />
        ) : (
          <FaChevronDown
            size={20}
            className={`${iconColor ? " text-darkGray" : "text-white"}`}
          />
        )}
      </div>
      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className={`bg-white overflow-hidden transition-all duration-300`}
      >
        <div className="p-5 h-auto ">{children}</div>
      </div>
    </div>
  );
};
