import { useEffect } from "react";
import { MainLayout } from "../components/main-layout";
import { gtm } from "../lib/gtm";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // gtm.push({ event: 'page_view' });
    router.push("/authentication/login?disableGuard=true");
  }, []);

  return (
    <>
      <main></main>
    </>
  );
};

Home.getLayout = (page) => <>{page}</>;

export default Home;
