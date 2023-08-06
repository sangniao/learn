import { Page } from "@/components/Page";
import { useLocales } from "@/hooks";

export default function ClientSideExample() {
  useLocales(["en", "de"]);

  return (
    <Page>
      <h1>Client-side</h1>
    </Page>
  );
}
