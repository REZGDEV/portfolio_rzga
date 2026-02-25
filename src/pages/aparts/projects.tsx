import Cards from "../../components/cards";
import "../../assets/css/project-css/project.css";

export default function Projects() {
  return (
    <>
      <div className="projects-header">
        <span className="projects-tag">PROYECTOS</span>

        <h1>Proyectos Destacados</h1>

        <p>
          Una selección de los proyectos que he desarrollado a lo largo de mi trayectoria en el área de Tecnología y Desarrollo de Software.
          <br />
          Cada uno refleja mi enfoque en arquitectura sólida, rendimiento y experiencias digitales bien construidas.
        </p>
        <span className="click-tag">DAR CLICK PARA VISITAR LA PAGINA</span>
      </div>

      <Cards />
    </>
  );
}
