import StatisticsTotal from "../../components/statistics/StatisticsTotal";
import StatisticsPartialTotal from "../../components/statistics/StatisticsPartialTotal";
import SelectGraph from "@/components/statistics/SelectGraph";
import ListTable from "@/components/statistics/ListTable";
export default function Statistics() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row">
        <SelectGraph />

        <div>
          <StatisticsTotal />
          <StatisticsPartialTotal />
        </div>
        <ListTable />
      </div>
    </main>
  );
}
