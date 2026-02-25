import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../assets/css/about_me.css";

import rafaelfoto from "../../assets/img/rafaelfoto.png";
import { Highlighter } from "../../components/ui/highlighter";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(q(".history-tag"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(q("h2"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.4")
        .fromTo(q(".history-lead"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .fromTo(
          q("p:not(.history-lead)"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .fromTo(q("h3"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.6")
        .fromTo(q(".history-image img"), { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=1");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="history" id="sobre-mi" ref={sectionRef}>
      <div className="history-container">
        <div className="history-text">
          <span className="history-tag">Sobre mí</span>
          <h2>¿Quién es Rafael Zambrano?</h2>

          <p className="history-lead">
            Soy <strong>Rafael Eduardo Zambrano Gale</strong>,
            <Highlighter action="underline" color="#cfa003" animationDuration={-5000}>
              Analista y Desarrollador de Software
            </Highlighter>{" "}
            colombiano de 20 años, apasionado por construir aplicaciones modernas, eficientes y escalables.
          </p>

          <p>
            Me especializo en el desarrollo de aplicaciones complejas utilizando tecnologías actuales y arquitecturas sólidas que garantizan
            rendimiento, sostenibilidad y crecimiento a largo plazo.
          </p>

          <p>
            Trabajo bajo principios de desarrollo limpio, escalable y sostenible, priorizando siempre la calidad del código, la optimización
            de procesos y la experiencia del usuario.
          </p>

          <p>
            Me adapto con facilidad al trabajo en equipo, colaborando de forma efectiva con diseñadores, desarrolladores y líderes de
            proyecto para alcanzar resultados estratégicos y de alto impacto.
          </p>

          <h3>
            Siempre hay una forma más inteligente de desarrollar.
            <br />
            <span>Y mi trabajo es encontrarla y construirla.</span>
          </h3>
        </div>

        <div className="history-image">
          <img src={rafaelfoto} alt="Rafael Eduardo Zambrano Gale" />
        </div>
      </div>
    </section>
  );
}
