import { Page } from "@/components/Page";
import { triggerRedirectForUnavailableLocales } from "@/utils";
import { GetServerSidePropsContext } from "next";

export default function ServerSideMiddlewareExample() {
  return (
    <Page>
      <h1>Server-side (middleware)</h1>
    </Page>
  );
}
