//./Calculator/page.tsx
import Edit from "@/components/board/Edit";
export default function EditPage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex flex-row justify-center ">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Edit />
      </div>
    </main>
  );
}
