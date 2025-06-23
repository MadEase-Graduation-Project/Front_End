import React, { useState } from "react";

export default function FloatingInput({
  label,
  type = "text",
  id,
  name,
  value = "", // ✅ default value set to an empty string
  onChange,
  onBlur,
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value} // ✅ always defined now
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        placeholder=" "
        {...rest}
        className="peer w-full h-[30px] sm:h-[48px] rounded-[5px] bg-transparent px-4 pt-5 pb-2
          border border-menavyoff focus:ring-2 focus:ring-menavy outline-none 
          text-xs sm:text-base md:text-lg text-menavy"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 text-gray-500 transform cursor-text
          ${
            focused || value
              ? "sm:top-[6px] text-[10px] text-gray-500"
              : "top-1/2 -translate-y-1/2 text-sm md:text-lg"
          }`}
      >
        {label}
      </label>
    </div>
  );
}
