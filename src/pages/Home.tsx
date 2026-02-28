import "../assets/css/home.css";
import AboutMe from "./aparts/about_me";
import ScrollStory from "../components/hometwo";
import "../assets/css/home.css";
import Projects from "./aparts/projects";
import LightRays from "../sdcn/LightRays.tsx";
import { FaWhatsapp } from "react-icons/fa";
import Technologies from "../components/tecnologies";

export default function Home() {
  return (
    <>
      <LightRays
        raysOrigin="top-center"
        raysColor="#f08809"
        raysSpeed={10}
        lightSpread={1}
        rayLength={100}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={10}
        saturation={100}
      />
      <ScrollStory />
      <AboutMe />
      <Projects />
      <a
        href="https://wa.me/5730433252?text=Hola%20quiero%20información%20sobre%20sus%20servicios"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <Technologies />
    </>
  );
}
