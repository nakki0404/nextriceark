//./Calculator/page.tsx
import Editer from "@/components/calculator/Editer";
export default function MakerPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="  min-h-screen p-4 m-4">
        <Editer />
      </div>
    </main>
  );
}
