//./Calculator/page.tsx
import Maker from "@/components/calculator/Maker";
export default function MakerPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Maker />
      </div>
    </main>
  );
}
