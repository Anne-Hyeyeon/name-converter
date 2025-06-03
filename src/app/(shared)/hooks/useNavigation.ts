import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { URLS } from "../constants/urls";

export const useNavigation = () => {
  const router = useRouter();

  const goToMain = useCallback(() => {
    router.push(URLS.MAIN_PAGE);
  }, [router]);

  const goToEnglishName = useCallback(() => {
    router.push(URLS.ENGLISH_NAME_PAGE);
  }, [router]);

  const openSupport = useCallback(() => {
    window.open(URLS.SUPPORT, "_blank");
  }, []);

  return {
    goToMain,
    goToEnglishName,
    openSupport,
  };
};
