const TextTitle = ({ text, className = "" }) => (
  <p
    className={`font-jost font-light text-sm md:text-md lg:text-lg text-menavy ${className}`}
  >
    {text}
  </p>
);
export default TextTitle;
