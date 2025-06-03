import { useCallback } from "react";
import html2canvas from "html2canvas";

export const useImageCapture = () => {
  const captureElement = useCallback((elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${fileName}.png`;
        link.click();
      });
    }
  }, []);

  return { captureElement };
};
