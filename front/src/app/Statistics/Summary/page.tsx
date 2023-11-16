import StatisticsTotal from "@/components/statistics/StatisticsTotal";
import StatisticsPartialTotal from "@/components/statistics/StatisticsPartialTotal";
import StatisticsSummary from "@/components/statistics/StatisticsSummary";
export default function Summary() {
  return (
    <main className="flex  justify-center">
      <div className="flex md:flex-row flex-col border-4 border-yellow-200 rounded-3xl p-4 m-16">
        <StatisticsSummary />
        <StatisticsTotal />
        <StatisticsPartialTotal />
      </div>
    </main>
  );
}
