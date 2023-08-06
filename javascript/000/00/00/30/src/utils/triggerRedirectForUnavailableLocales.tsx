import { GetServerSidePropsContext } from "next";
import { join } from "path";

export function triggerRedirectForUnavailableLocales(
  allowedLocales: string[],
  context: GetServerSidePropsContext,
  redirectTo = "/404",
  isPermanent = false
) {
  const { locale, res } = context;
  const isAllowed = allowedLocales.includes(locale || "en");

  if (!isAllowed) {
    const localeSubDirectory = locale === "en" ? "/" : `/${locale}/`;
    const statusCode = isPermanent ? 308 : 307;

    res.writeHead(statusCode, {
      Location: join(localeSubDirectory, redirectTo),
    });
    res.end();
  }
}
