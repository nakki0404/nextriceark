//./Coin/page.tsx
import Piratecoin from "@/components/coin/Piratecoin";
export default function Coin() {
  return (
    <main className="flex flex-row justify-center ">
      <div className=" min-h-screen p-4 m-4">
        <Piratecoin />
      </div>
    </main>
  );
}
