//./Calculator/page.tsx
import CalculatorForm from "../../components/calculator/CalculatorForm";
import Valuelistviewer from "../../components/calculator/Valuelistviewer";
import Poplist from "../../components/calculator/Poplist";
export default function Calculator() {
  return (
    <main className="flex min-h-screen flex-row items-center ">
      <div className="box-border h-1rem w-1rem p-4 border-8">
        <CalculatorForm />
      </div>
      <div className="box-border h-1rem w-1rem p-4 border-8">
        <Valuelistviewer />
      </div>
      <div className="box-border h-1rem w-1rem p-4 border-8">
        <Poplist />
      </div>
    </main>
  );
}
