import { useEffect, useState, type ReactNode } from "react";
import SVGClose from "@/assets/icons/close.svg?react";
import "./Modal.scss";
type Props = {
  open: boolean;
  title?: string;
  children: ReactNode;
  childrenClass?:string;
  onClose: () => void;
};

export default function Modal({ open, title, children,childrenClass='px-6', onClose }: Props) {
  const [visible, setVisible] = useState(open);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (open) {
      setVisible(true);

      requestAnimationFrame(() => {
        setShow(true);
      });

      document.body.style.overflow = "hidden";
    } else {
      setShow(false);

      document.body.style.overflow = "";

      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div onClick={onClose} className={`modal-overlay overflow-auto ${show ? "show" : ""}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          modal-window
          relative
          mx-4
          overflow-auto
          rounded 
          border
          border-violet-700
          bg-neutral-900
          shadow-2xl
          shadow-violet-500/20
          my-10
        "
      >
        <div className="flex items-center justify-between border-b border-violet-800 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-neutral-800 hover:text-red-400"
          >
            <SVGClose className="h-6 w-6" />
          </button>
        </div>

        <div className={`${childrenClass} py-6 text-white flex flex-col gap-4 bg-[#1c1c1c]`}>{children}</div>
      </div>
    </div>
  );
}
