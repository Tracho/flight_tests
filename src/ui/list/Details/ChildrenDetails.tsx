import ArrowTop from "@/assets/icons/arrow-top.svg?react";
import "./Details.scss";
import { useState, type ReactNode } from "react";
import BgContainer from "@/ui/container/BgContainer";
import { amberBorderLight, bgdarkNeutral30, bglightgray70, borderDark, borderLign, greyBorderDark } from "@/data/desingStyle";

type props = {
  title: string;
  description?: string;
  arr?: string[];
  symbolLi?: string;
  children?: ReactNode;
  childrenClass?: string;
  BgContainerClass?: string;
  titleClass?: string;
  svgClass?: string;
  topChildren?: ReactNode;
  svgToTitle?: ReactNode;
};

function ChildrenDetails({
  title,
  svgToTitle,
  arr = [],
  description,
  children,
  symbolLi = "",
  childrenClass = "",
  BgContainerClass=`${bglightgray70} ${bgdarkNeutral30} ${borderLign} ${borderDark}`,
  titleClass = "text-2xl",
  svgClass = "w-8",
  topChildren,
}: props) {
  const [active, setActive] = useState(false);
// bglightgrayTT
  return (
    <BgContainer className={`${BgContainerClass}`}>
      <div className={`details-container ${active ? "is-active" : ""}`}>
        <button
          className={`details-trigger gap-3`}
          type="button"
          onClick={() => setActive((prev) => !prev)}
        >
          <div className="flex justify-between items-center w-full">
            <span
              className={`${titleClass} details-title flex justify-between items-center`}
            >
              {svgToTitle}
              {title}
            </span>
            <ArrowTop className={`${svgClass} details-arrow`} />
          </div>
          {description && <p>{description}</p>}
          {topChildren && topChildren}
        </button>

        {/* Обертка для плавной анимации высоты */}
        <div className={`details-content-wrapper`}>
          {!children ? (
            <ul className={`${childrenClass} children-details-list`}>
              {arr.map((item, index) => (
                <li key={index} className="details-item">
                  {symbolLi && (
                    <span className="details-symbol">{symbolLi}</span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className={`${childrenClass} children-details-list`}>{children}</div>
          )}
        </div>
      </div>
    </BgContainer>
  );
}

export default ChildrenDetails;
