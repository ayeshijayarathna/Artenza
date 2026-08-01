"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-soft">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-heading">Welcome back</h1>
            <p className="text-sm text-muted mt-2">
              Sign in to access your collection, orders, and commissions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              leftIcon={<Mail size={16} />}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              leftIcon={<Lock size={16} />}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted cursor-pointer">
                <input type="checkbox" className="accent-[#C4724A] rounded" />
                Remember me
              </label>
              <a href="#" className="text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" size="lg" className="w-full" isLoading={loading} rightIcon={<LogIn size={16} />}>
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-xs text-muted uppercase tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl })}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{" "}
            <a href="/auth/register" className="text-accent hover:underline font-medium">
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
