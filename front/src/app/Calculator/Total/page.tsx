//./Calculator/page.tsx

import Total from "@/components/calculator/Total";

export default function TotalPage() {
  return (
    <main className="flex flex-row justify-center ">
      <div className=" border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Total />
      </div>
    </main>
  );
}
