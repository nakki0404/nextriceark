//./Calculator/page.tsx
import Info from "@/components/calculator/Info";
export default function InfoPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Info />
      </div>
    </main>
  );
}
