//./Calculator/page.tsx
import CalculatorForm from "../../components/calculator/CalculatorForm";
import Valuelistviewer from "../../components/calculator/Valuelistviewer";
import Poplist from "../../components/calculator/Poplist";
export default function Calculator() {
  return (
    <main className="flex flex-row justify-center ">
      <div className=" h-5/6 w-1/4 min-h-screen p-4 m-4">
        <CalculatorForm />
      </div>
      <div className=" h-5/6 w-1/4 min-h-screen p-4 m-4">
        <Valuelistviewer />
      </div>
      <div className=" h-5/6 w-1/4 min-h-screen p-4 m-4">
        <Poplist />
      </div>
    </main>
  );
}
