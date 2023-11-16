//./Coin/page.tsx
import Piratecoin from "@/components/coin/Piratecoin";
export default function Coin() {
  return (
    <main className="flex flex-row justify-center ">
      <div className=" border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Piratecoin />
      </div>
    </main>
  );
}
