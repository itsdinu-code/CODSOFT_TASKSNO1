"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setMessage(error ? error.message : "Check your email for a secure sign-in link.");
    setBusy(false);
  }

  return (
    <main className="field-paper min-h-screen px-6 py-20">
      <div className="mx-auto max-w-md">
        <p className="t-small uppercase tracking-[0.25em] text-accent-deep">Staff access</p>
        <h1 className="display mt-4 t-display text-ink">Sign in to DineDesk</h1>
        <p className="mt-4 t-body text-muted">Use the staff email registered in Supabase Auth.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block t-body text-ink">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 block w-full border-2 border-ink bg-transparent px-3 py-3"
            />
          </label>
          <button disabled={busy} className="bg-ink px-5 py-3 t-body text-cream disabled:opacity-50">
            {busy ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
        {message ? <p className="mt-5 t-body text-ink">{message}</p> : null}
      </div>
    </main>
  );
}
