//./Calculator/page.tsx
import SignupForm from "../../../components/signup/SignupForm";
export default function Signup() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <SignupForm />
      </div>
    </main>
  );
}
