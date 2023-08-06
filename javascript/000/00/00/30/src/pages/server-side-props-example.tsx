import { Page } from "@/components/Page";
import { triggerRedirectForUnavailableLocales } from "@/utils";
import { GetServerSidePropsContext } from "next";

export default function ServerSidePropsExample() {
  return (
    <Page>
      <h1>Server-side (getServerSideProps)</h1>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  triggerRedirectForUnavailableLocales(["en", "de"], context);
  return { props: {} };
}
