//./Calculator/page.tsx
import Editer from "@/components/calculator/Editer";
export default function MakerPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="  border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Editer />
      </div>
    </main>
  );
}
