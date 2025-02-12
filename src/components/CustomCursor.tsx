import { useEffect } from "react";
import regador from "../images/regador.png";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.style.position = "fixed";
    cursor.style.width = "32px";
    cursor.style.height = "32px";
    cursor.style.pointerEvents = "none";
    cursor.style.background = `url(${regador}) no-repeat center/contain`;
    cursor.style.zIndex = "9999";
    document.body.appendChild(cursor);

    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const moveCursor = (e: MouseEventWithClient) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null; // Este componente não precisa renderizar nada visível
};

export default CustomCursor;
