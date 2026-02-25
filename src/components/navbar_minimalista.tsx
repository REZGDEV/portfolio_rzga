import { FiArrowUpRight } from "react-icons/fi";
import logorafael from "../assets/img/logorafael.png";
import "../assets/css/navbar_minimalista.css";
import { BiMoon } from "react-icons/bi";

export default function MinimalistHeader() {
  return (
    <header className="navbar">
      <input id="nav-toggle" type="checkbox" className="burger__checkbox" aria-hidden="true" />

      <div className="navbar__inner">
        <div className="navbar__brand">
          <img src={logorafael} alt="Logo" className="logo-mark" />
        </div>

        {/* Menú centro (desktop) */}
        <nav className="navbar__center" aria-label="Primary">
          <ul className="menu">
            <li className="menu__item">
              <a href="#">Home</a>
            </li>
            <li className="menu__divider" aria-hidden="true" />
            <li className="menu__item">
              <a href="#">Properties</a>
            </li>
            <li className="menu__divider" aria-hidden="true" />
            <li className="menu__item">
              <a href="#">About</a>
            </li>
          </ul>
        </nav>

        {/* Acciones derechas */}
        <div className="navbar__actions">
          <button className="icon-btn-moon">
            <BiMoon />
          </button>
          <a href="#" className="cta">
            <span className="cta__text">Get Started</span>
            <span className="cta__dot">
              <FiArrowUpRight />
            </span>
          </a>

          {/* ✅ Botón hamburguesa (label que controla el checkbox) */}
          <label htmlFor="nav-toggle" className="burger" aria-label="Abrir/cerrar menú">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>

      {/* Overlay móvil */}
      <nav className="mobilemenu" aria-label="Mobile">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Servicios</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
