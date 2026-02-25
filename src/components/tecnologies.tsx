import IconC from "./IconC";
import "../assets/css/tecnologies.css";
import { React } from "../components/icons/iconos";
import { TypeScript } from "../components/icons/typescriptt";
import { Vite } from "./icons/vitee";
import { GraphQL } from "./icons/graphql";
import { Figma } from "./icons/figma";
import { Sass } from "./icons/sass";
import { MySQL } from "./icons/mysql";
import { JavaScript } from "./icons/javascript";
import { Html } from "./icons/html";
import { Jest } from "./icons/jest";
import { VisualStudioCode } from "./icons/visualstudio";
import { shadcnui } from "./icons/shadcn";
import { Java } from "./icons/java";
import { CSSNew } from "./icons/css";
import { WordPress } from "./icons/wordpress";
import { Elementor } from "./icons/elementor";
import { Firebase } from "./icons/firebase";
export default function Technologies() {
  return (
    <>
      {" "}
      <div className="projects-header">
        {" "}
        <span className="projects-tag">TECNOLOGIAS</span> <h1>MIS HABILIDADES </h1>{" "}
        <p>
          {" "}
          Estos son los lenguajes de programación que he utilizado en mi trayectoria en el área de Tecnología y Desarrollo de Software.{" "}
          <br /> Cada uno refleja mi enfoque en arquitectura sólida, rendimiento y experiencias digitales bien construidas.{" "}
        </p>{" "}
        <section className="contentc">
          <IconC icono={React} subtitulo="React" />
          <IconC icono={TypeScript} subtitulo="TypeScript" />
          <IconC icono={Java} subtitulo="Java" />
          <IconC icono={GraphQL} subtitulo="GraphQL" />
          <IconC icono={MySQL} subtitulo="MySQL" />
          <IconC icono={JavaScript} subtitulo="JavaScript" />
          <IconC icono={Html} subtitulo="HTML" />
          <IconC icono={CSSNew} subtitulo="Css" />
          <IconC icono={Sass} subtitulo="Sass" />
          <IconC icono={Firebase} subtitulo="Firebase" />
          <IconC icono={Jest} subtitulo="Jest" />
          <IconC icono={Vite} subtitulo="Vite" />
          <IconC icono={Figma} subtitulo="Figma" />
          <IconC icono={VisualStudioCode} subtitulo="Visual Studio Code" />
          <IconC icono={shadcnui} subtitulo="shadcn UI" />
          <IconC icono={WordPress} subtitulo="WordPress" />
          <IconC icono={Elementor} subtitulo="Elementor" />
        </section>
      </div>{" "}
    </>
  );
}
