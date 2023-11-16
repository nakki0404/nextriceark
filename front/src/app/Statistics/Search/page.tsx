import SelectGraph from "@/components/statistics/SelectGraph";
export default function Search() {
  return (
    <main className="flex sm:flex-row flex-col justify-center">
      <div className="border-4 border-yellow-200 rounded-3xl p-4 m-8">
        <SelectGraph />
      </div>
    </main>
  );
}
