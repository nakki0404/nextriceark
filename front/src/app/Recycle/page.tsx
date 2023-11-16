import Recycle from "@/components/recycle/Recycle";
export default function RecyclePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <Recycle />
      </div>
    </main>
  );
}
