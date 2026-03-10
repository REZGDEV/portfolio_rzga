import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaGithub } from "react-icons/fa";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Marca */}
        <div className="footer-brand">
          <h3>Rafael</h3>
          <p>
            Desarrollador de software enfocado en crear aplicaciones web modernas, eficientes y escalables. Apasionado por la tecnología, el
            diseño y la creación de soluciones digitales de alto impacto.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li>
              <a href="#home">Inicio</a>
            </li>
            <li>
              <a href="#projects">Proyectos</a>
            </li>
            <li>
              <a href="#skills">Habilidades</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-contact">
          <h4>Contacto</h4>

          <p>
            <FaMapMarkerAlt /> Colombia
          </p>

          <p>
            <FaEnvelope /> loremdisenoweb@gmail.com
          </p>

          <p>
            <FaGithub /> github.com/REZGDEV
          </p>
          <div>
            {" "}
            <a
              href="https://wa.me/573044332452?text=Hola%20quiero%20información%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© {new Date().getFullYear()} Rafael Portfolio. Todos los derechos reservados.</div>
    </footer>
  );
}
