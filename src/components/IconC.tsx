import type { SVGProps } from "react";
import "../assets/css/icono.css";

type IconType = React.ComponentType<SVGProps<SVGSVGElement>>;

type NumerosProps = {
  subtitulo: string;
  icono: IconType;
};

function IconC({ icono: Icono, subtitulo }: NumerosProps) {
  return (
    <div className="item-numeros">
      <div className="iconoz">
        <Icono width={60} height={60} />
      </div>
      <div className="subtsss">{subtitulo}</div>
    </div>
  );
}

export default IconC;
