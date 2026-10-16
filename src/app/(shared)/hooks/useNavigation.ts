import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { URLS } from "../constants/urls";
import { trackEvent } from "../utils/trackEvent";

export const useNavigation = () => {
  const router = useRouter();

  const goToMain = useCallback(() => {
    router.push(URLS.MAIN_PAGE);
  }, [router]);

  const goToEnglishName = useCallback(() => {
    router.push(URLS.ENGLISH_NAME_PAGE);
  }, [router]);

  const goToTop100 = useCallback(() => {
    router.push(URLS.TOP100_2025_PAGE);
  }, [router]);

  const openSupport = useCallback(() => {
    trackEvent("support_click");
    window.open(URLS.SUPPORT, "_blank");
  }, []);

  return {
    goToMain,
    goToEnglishName,
    goToTop100,
    openSupport,
  };
};
