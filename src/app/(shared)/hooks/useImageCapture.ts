import { useCallback } from "react";
import html2canvas from "html2canvas";
import { trackEvent } from "../utils/trackEvent";

export const useImageCapture = () => {
  const captureElement = useCallback((elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    html2canvas(element)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${fileName}.png`;
        link.click();
        trackEvent("save_result_image", { file_name: fileName });
      })
      .catch((err) => {
        console.error("이미지 캡처 실패:", err);
        alert("이미지 저장에 실패했어요. 잠시 후 다시 시도해 주세요. 😢");
      });
  }, []);

  return { captureElement };
};
