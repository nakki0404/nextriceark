import ListTable from "@/components/statistics/ListTable";
export default function Comparison() {
  return (
    <main className="flex sm:flex-row flex-col justify-center">
      <div className="border-4 border-yellow-200 rounded-3xl p-4 m-8">
        <ListTable />
        이름을 누르면 단일검색 페이지로 이동
      </div>
    </main>
  );
}
