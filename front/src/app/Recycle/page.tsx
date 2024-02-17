import Recycle from "@/components/recycle/Recycle";
export default function RecyclePage() {
  return (
    <main className="flex min-h-screen flex-row  justify-between ">
      <div className="border-4 border-yellow-200 rounded-3xl p-1 m-1 md:p-8 md:m-8">
        <Recycle />
      </div>
    </main>
  );
}
