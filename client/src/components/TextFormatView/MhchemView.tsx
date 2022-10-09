import { ExportOutlined } from "@ant-design/icons";
import * as React from "react";

interface PropsMhchemView {
  code: string;
}

let ready = false;
const initMhchem = (): void => {
  if (ready) return;
  ready = true;

  const code = String.raw`
  MathJax.Ajax.config.path["mhchem"] = "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.0";
  MathJax.Hub.Config({
    tex2jax: {
      ignoreClass: "tex2jax_ignore",
      inlineMath: [["$","$"]]
    },
    TeX: {
      extensions: ["[mhchem]/mhchem.js", "color.js"],
      noErrors: { disabled: true }
    }
  });`;
  const cfgTag = document.createElement("script");
  cfgTag.setAttribute("type", "text/x-mathjax-config");
  cfgTag.textContent = code;
  document.head.appendChild(cfgTag);

  const libTag = document.createElement("script");
  libTag.setAttribute("type", "text/javascript");
  libTag.setAttribute("id", "MathJax-script");
  libTag.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  );
  document.head.appendChild(libTag);
};

const infoLink = "https://mhchem.github.io/MathJax-mhchem/";

export const MhchemView: React.FC<PropsMhchemView> = ({
  code,
}: PropsMhchemView) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(initMhchem, []);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.textContent = code;
      // @ts-ignore
      const { MathJax } = window;
      if (MathJax) MathJax.Hub.Queue(["Typeset", MathJax.Hub, ref.current]);
    }
  }, [code]);
  return (
    <div>
      <div style={{ display: "inline-block" }} ref={ref} />
      <div>
        Info:{" "}
        <a href={infoLink} target="_blank" rel="noreferrer">
          {infoLink} <ExportOutlined />
        </a>
      </div>
    </div>
  );
};
