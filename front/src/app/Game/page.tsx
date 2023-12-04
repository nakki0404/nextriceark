//./Calculator/page.tsx
import Game from "@/components/game/Game";
export default function GamePage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Game />
      </div>
    </main>
  );
}
