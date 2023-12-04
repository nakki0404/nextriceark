//./Calculator/page.tsx
import View from "@/components/board/View";
export default function ViewPage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <View />
      </div>
    </main>
  );
}
