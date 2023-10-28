//./Coin/page.tsx
import Piratecoin from "@/components/coin/Piratecoin";
import Bravecoin from "@/components/coin/Bravecoin";
import Bloodcoin from "@/components/coin/Bloodcoin";
export default function Coin() {
  return (
    <main className="flex flex-row justify-center ">
      <div className=" min-h-screen p-4 m-4">
        <Bravecoin />
        <Piratecoin />
        <Bloodcoin />
      </div>
    </main>
  );
}
