import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import "../assets/css/scrolllStory.css";
import MinimalistHeader from "../components/navbar_minimalista";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
          duration: 1.4,
        },
      });

      // Overlay wipe
      tl.to(".overlay", {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.8,
        ease: "expo.inOut",
      });

      // ==============================
      // 🔥 TITLE PRO EFFECT
      // ==============================

      const split = new SplitText(".title span", {
        type: "chars",
      });

      gsap.set(split.chars, {
        y: 120,
        opacity: 0,
        filter: "blur(10px)",
      });

      tl.to(
        split.chars,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: {
            each: 0.03,
            from: "start",
          },
          ease: "power4.out",
          duration: 1.4,
        },
        "-=1.2",
      );

      // Cinematic micro zoom
      tl.fromTo(
        ".title",
        { scale: 1.05 },
        {
          scale: 1,
          duration: 2,
          ease: "expo.out",
        },
        "-=1.4",
      );

      // Gold line
      tl.fromTo(
        ".line",
        { width: 0 },
        {
          width: 180,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.8",
      );

      // Subtitle
      tl.fromTo(
        ".subtitle",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.8",
      );

      // Mouse parallax
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(contentRef.current, {
          x,
          y,
          duration: 1.2,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        split.revert(); // limpia SplitText correctamente
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero" ref={sectionRef}>
        <div className="overlay"></div>
        <div className="grain"></div>
        <MinimalistHeader />

        <div className="content" ref={contentRef}>
          <h1 className="title">
            <h1>Rafael Eduardo Zambrano Gale</h1>
            <h1>Analista y Desarrollador de Software</h1>
          </h1>

          <p className="line"></p>

          <p className="subtitletwo">
            Construyo soluciones digitales eficientes, escalables y enfocadas en resultados. Transformo ideas en aplicaciones funcionales y
            experiencias web de alto impacto.
          </p>
        </div>
      </section>
    </>
  );
}
