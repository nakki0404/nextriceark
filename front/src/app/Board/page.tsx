//./Calculator/page.tsx
import Board from "@/components/board/Board";
export default function BoardPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Board />
      </div>
    </main>
  );
}
