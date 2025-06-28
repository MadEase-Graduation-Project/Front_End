import { useState, useEffect } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [state, setState] = useState("register");
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(state);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
