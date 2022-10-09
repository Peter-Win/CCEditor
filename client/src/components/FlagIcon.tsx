import * as React from "react";

const arImg = require("src/assets/ar.png");
const deImg = require("src/assets/de.png");
const elImg = require("src/assets/el.png");
const enImg = require("src/assets/en.png");
const esImg = require("src/assets/es.png");
const frImg = require("src/assets/fr.png");
const hiImg = require("src/assets/hi.png");
const itImg = require("src/assets/it.png");
const jaImg = require("src/assets/ja.png");
const laImg = require("src/assets/la.png");
const ptImg = require("src/assets/pt.png");
const ruImg = require("src/assets/ru.png");
const zhImg = require("src/assets/zh.png");

interface FlagInfo {
  img: any;
  name: string;
}

const dict: Record<string, FlagInfo> = {
  ar: { img: arImg, name: "Arabic" },
  de: { img: deImg, name: "German" },
  el: { img: elImg, name: "Greek" },
  en: { img: enImg, name: "English" },
  es: { img: esImg, name: "Spanish" },
  fr: { img: frImg, name: "French" },
  hi: { img: hiImg, name: "Hindi" },
  it: { img: itImg, name: "Italian" },
  ja: { img: jaImg, name: "Japanese" },
  la: { img: laImg, name: "Latin" },
  pt: { img: ptImg, name: "Portuguese" },
  ru: { img: ruImg, name: "Russian" },
  zh: { img: zhImg, name: "Chinese Simplified" },
};

interface PropsFlagIcon {
  localeName: string;
  size?: number;
  className?: string;
}

export const FlagIcon: React.FC<PropsFlagIcon> = ({
  localeName,
  size,
  className,
}: PropsFlagIcon) => {
  const info = dict[localeName];
  if (info) {
    return (
      <img
        src={info.img}
        width={size}
        height={size}
        className={className}
        title={info.name}
      />
    );
  }
  return <span>{localeName}</span>;
};
