import { useRouter } from "next/router";
import { useEffect } from "react";

export function useLocales(locales: string[]) {
  const router = useRouter();

  useEffect(() => {
    if (!locales.includes(router.locale || "en")) {
      router.push("/404");
    }
  }, [router, locales]);
}
