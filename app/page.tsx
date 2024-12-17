import { HomePageAnimes } from "@/components/getpopntop";
import HomepageModal from "@/components/homeModal";

export default function Home() {
  return (
    <div>
      <HomepageModal />
      <HomePageAnimes />
    </div>
  );
}
