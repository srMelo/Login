import React from "react";
import serveLojaLogo from "../../public/logo-serveloja.svg";

type LogoProps = {
  width?: number;
  height?: number;
};

function Logo({ width = 354, height = 102 }: LogoProps) {
  return (
    <img
      src={serveLojaLogo}
      width={width}
      height={height}
      alt="ServeLoja logo"
    />
  );
}

export default Logo;
