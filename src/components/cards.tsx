import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import construimos from "../assets/img/construimos.png";
import loremfun from "../assets/img/loremfun.png";
import huevoscampesinos from "../assets/img/huevoscampesinos.png";

import ScrollTrigger from "gsap/ScrollTrigger";
import "../assets/css/cards.css";

gsap.registerPlugin(ScrollTrigger);

export default function Cards() {
  // 🔥 TIPADO CORRECTO
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return; // 🔥 Protección null

        const media = card.querySelector<HTMLElement>(".card-media");
        const glow = card.querySelector<HTMLElement>(".card-glow");

        gsap.fromTo(
          card,
          {
            y: 140,
            rotateX: 18,
            opacity: 0,
            clipPath: "inset(100% 0% 0% 0%)",
            filter: "blur(18px)",
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -18,
          scale: 1.045,
          duration: 0.6,
          ease: "power3.out",
        });

        if (media) {
          hoverTl.to(
            media,
            {
              scale: 1.18,
              duration: 0.9,
              ease: "power3.out",
            },
            0,
          );
        }

        card.addEventListener("mouseenter", () => hoverTl.play());

        card.addEventListener("mouseleave", () => {
          hoverTl.reverse();
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
          });
        });

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;

          const rx = gsap.utils.mapRange(0, bounds.height, 10, -10, y);
          const ry = gsap.utils.mapRange(0, bounds.width, -10, 10, x);

          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.4,
            ease: "power3.out",
          });

          if (glow) {
            gsap.to(glow, {
              x: x - bounds.width / 2,
              y: y - bounds.height / 2,
              opacity: 1,
              duration: 0.3,
            });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="cards">
      {[
        {
          title: "Construimos",
          text: "Software creador de presupuestos para obras con más de 2000 materiales registrados en la base de datos. También conserva diferentes roles como proveedor, administrador y cliente. Además, cuenta con una red social donde podrás encontrar constructores para tu obra soñada.",
          image: construimos,
          link: "https://construimos.lorem.fun/",
        },
        {
          title: "Lorem Fun",
          text: "Landing page creada para ofrecer la creación de páginas web de alta calidad, con un diseño moderno y una experiencia de usuario atractiva. Cuenta con un e-commerce donde podrás comprar themes para tu proyecto.",
          image: loremfun,
          link: "https://www.lorem.fun/",
        },
        {
          title: "Huevos Campesinos",
          text: "E-commerce donde podrás comprar productos locales de Huevos Campesinos, con un sistema de pago seguro.",
          image: huevoscampesinos,
          link: "https://huevoscampesinos.com/",
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card"
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
        >
          <div className="card-media" />
          <div className="card-glow" />
          <img src={item.image} alt="Imagen de un diseño digital" />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </a>
      ))}
    </section>
  );
}
