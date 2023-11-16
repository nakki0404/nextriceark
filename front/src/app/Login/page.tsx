//./Calculator/page.tsx
import LoginForm from "../../components/login/LoginForm";
export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="border-4 border-yellow-200 rounded-3xl p-8 m-8">
        <LoginForm />
      </div>
    </main>
  );
}
