import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { Nav } from "./Nav";

export const Page: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        {children}
        <h2>Locale: {router.locale || "en"}</h2>
      </main>
      <hr style={{ margin: "2rem 0 4rem" }} />
      <Nav />
    </>
  );
};
