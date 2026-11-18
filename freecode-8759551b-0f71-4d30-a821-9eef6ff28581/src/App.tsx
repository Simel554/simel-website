import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WorkIndex from "./components/WorkIndex";
import About from "./components/About";
import Contact from "./components/Contact";
import { useSmoothScroll } from "./lib/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <WorkIndex />
        <About />
        <Contact />
      </main>
    </>
  );
}
