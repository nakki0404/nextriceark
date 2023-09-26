import StatisticsTotal from "../../components/statistics/StatisticsTotal";
import StatisticsPartialTotal from "../../components/statistics/StatisticsPartialTotal";
import SelectGraph from "@/components/statistics/SelectGraph";
import ListTable from "@/components/statistics/ListTable";
export default function Statistics() {
  return (
    <main className="flex sm:flex-row flex-col justify-center">
      <div className="h-5/6 w-1/4 min-h-screen p-4 m-4">
        <SelectGraph />
      </div>
      <div className="h-5/6 w-1/4 min-h-screen p-4 m-4">
        <StatisticsTotal />
        <StatisticsPartialTotal />
      </div>
      <div className="h-5/6 w-1/4 min-h-screen p-4 m-4">
        <ListTable />
      </div>
    </main>
  );
}
