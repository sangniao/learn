import Link from "next/link";

export function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "3rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h3>English (en)</h3>
        <ul>
          <li>
            <Link href="/" locale="en">
              Home
            </Link>
          </li>
          <li>
            <Link href="/client-side-example" locale="en">
              Client-side example
            </Link>
          </li>
          <li>
            <Link href="/server-side-props-example" locale="en">
              Server-side example (with getServerSideProps)
            </Link>
          </li>
          <li>
            <Link href="/server-side-middleware-example" locale="en">
              Server-side example (with middleware)
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>Spanish (es)</h3>
        <ul>
          <li>
            <Link href="/" locale="es">
              Home
            </Link>
          </li>
          <li>
            <Link href="/client-side-example" locale="es">
              Client-side example
            </Link>
          </li>
          <li>
            <Link href="/server-side-props-example" locale="es">
              Server-side example (with getServerSideProps)
            </Link>
          </li>
          <li>
            <Link href="/server-side-middleware-example" locale="es">
              Server-side example (with middleware)
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>German (de)</h3>
        <ul>
          <li>
            <Link href="/" locale="de">
              Home
            </Link>
          </li>
          <li>
            <Link href="/client-side-example" locale="de">
              Client-side example
            </Link>
          </li>
          <li>
            <Link href="/server-side-props-example" locale="de">
              Server-side example (with getServerSideProps)
            </Link>
          </li>
          <li>
            <Link href="/server-side-middleware-example" locale="de">
              Server-side example (with middleware)
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
