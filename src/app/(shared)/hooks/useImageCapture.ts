import { useCallback } from "react";
import { trackEvent } from "../utils/trackEvent";

const DEFAULT_FAIL_MESSAGE =
  "이미지 저장에 실패했어요. 잠시 후 다시 시도해 주세요. 😢";

export const useImageCapture = () => {
  const captureElement = useCallback(
    async (
      elementId: string,
      fileName: string,
      failMessage = DEFAULT_FAIL_MESSAGE
    ) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      try {
        const { default: html2canvas } = await import("html2canvas");
        const canvas = await html2canvas(element);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${fileName}.png`;
        link.click();
        trackEvent("save_result_image", { file_name: fileName });
      } catch (err) {
        console.error("이미지 캡처 실패:", err);
        alert(failMessage);
      }
    },
    []
  );

  return { captureElement };
};
