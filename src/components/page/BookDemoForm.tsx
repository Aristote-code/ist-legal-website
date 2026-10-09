"use client";

// Book a Demo form — submits to Netlify Forms (registered in /public/__forms.html),
// so requests arrive in the site's Netlify dashboard. No fake success states.
import { useState, type FormEvent } from "react";
import { bookDemoPage, CONTACT_EMAIL } from "@/content/pages";
import { CornerMark } from "../ui";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "h-[56px] w-full border border-transparent bg-white px-2xl text-md text-bg-dark outline-none transition-colors placeholder:text-text-tertiary focus:border-bg-dark";
const labelCls = "text-sm font-medium leading-[19.6px] text-bg-dark";

export function BookDemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interests, setInterests] = useState<string[]>([]);

  const toggle = (i: string) => setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.set("interests", interests.join(", "));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-xl bg-white p-[40px]">
        <p className="text-display-xs leading-[28.8px] tracking-[-0.96px] text-bg-dark">Thank you — your request has been sent.</p>
        <p className="text-md leading-[24px] text-text-tertiary">Our team will be in touch to arrange a time that suits you.</p>
      </div>
    );
  }

  return (
    <form name="book-demo" onSubmit={onSubmit} className="flex flex-col gap-2xl">
      <input type="hidden" name="form-name" value="book-demo" />
      <p hidden>
        <label>
          Leave this empty <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-2xl sm:grid-cols-2">
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Work email *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="name@organization.com" className={field} />
        </label>
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Full name *</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Organization</span>
          <input name="organization" autoComplete="organization" placeholder="Firm, institution or company" className={field} />
        </label>
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Role</span>
          <input name="role" autoComplete="organization-title" placeholder="e.g. Associate, Legal Counsel" className={field} />
        </label>
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Country / jurisdiction</span>
          <input name="country" autoComplete="country-name" placeholder="e.g. Rwanda" className={field} />
        </label>
        <label className="flex flex-col gap-md">
          <span className={labelCls}>Team size</span>
          <select name="team-size" defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>
              Select team size
            </option>
            {bookDemoPage.teamSizes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="flex flex-col gap-md">
        <legend className={`${labelCls} mb-md`}>What are you most interested in?</legend>
        <div className="flex flex-wrap gap-md">
          {bookDemoPage.interests.map((i) => {
            const on = interests.includes(i);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`rounded-full border px-lg py-sm text-sm transition-colors ${
                  on ? "border-bg-dark bg-bg-dark text-white" : "border-line-dark bg-white text-bg-dark hover:border-bg-dark"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-md">
        <span className={labelCls}>Message (optional)</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us a little about the legal work you would like IST Legal to support."
          className="w-full border border-transparent bg-white p-2xl text-md text-bg-dark outline-none transition-colors placeholder:text-text-tertiary focus:border-bg-dark"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#b42318]">
          Something went wrong sending your request. Please try again, or email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-[56px] items-center justify-center gap-md self-start bg-bg-dark px-[28px] text-md font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a Demo"}
        <CornerMark variant="bare" dark />
      </button>
    </form>
  );
}
