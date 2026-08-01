import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)]" />}>
      <LoginForm />
    </Suspense>
  );
}
