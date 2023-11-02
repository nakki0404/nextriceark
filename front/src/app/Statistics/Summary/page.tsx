import StatisticsTotal from "@/components/statistics/StatisticsTotal";
import StatisticsPartialTotal from "@/components/statistics/StatisticsPartialTotal";
import StatisticsPartialTotal2 from "@/components/statistics/StatisticsPartialTotal2";
export default function Summary() {
  return (
    <main className="flex sm:flex-row flex-col justify-center">
      <div className="min-h-screen p-4 m-4">
        <StatisticsTotal />
        <StatisticsPartialTotal />
        <StatisticsPartialTotal2 />
      </div>
    </main>
  );
}
