import StatisticsTotal from "@/components/statistics/StatisticsTotal";
import StatisticsPartialTotal from "@/components/statistics/StatisticsPartialTotal";
export default function Summary() {
  return (
    <main className="flex sm:flex-row flex-col justify-center">
      <div className="min-h-screen p-4 m-4">
        <StatisticsTotal />
        <StatisticsPartialTotal />
      </div>
    </main>
  );
}
