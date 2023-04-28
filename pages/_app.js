import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@/styles/globals.css";
import NavBar from "@/components/NavBar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <SessionProvider session={session}>
      <div>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
