import React, { useState } from "react";

const FloatingInput = React.forwardRef(
  (
    {
      label,
      type = "text",
      id,
      name,
      value = "",
      hasError = false,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className="relative w-full">
        <input
          ref={ref} // ✅ Attach the forwarded ref here
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder=" "
          {...rest}
          className={`peer w-full h-[30px] sm:h-[48px] rounded-[5px] bg-transparent px-4 pt-5 pb-2
  border ${
    hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-menavyoff focus:ring-menavy"
  }
  focus:ring-2 outline-none 
  text-xs sm:text-base md:text-lg text-menavy`}
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
);

export default FloatingInput;
