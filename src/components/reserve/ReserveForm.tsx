"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { restaurant } from "@/lib/restaurant";
import { useReservations } from "@/lib/store/reservations";

/**
 * The reservation desk.
 *
 * One short form: the day, the slot, the party, the name. The request is
 * written to this browser only — the shop does not receive it, so the card
 * says exactly that and offers the phone as the real channel.
 */

const SLOTS: string[] = [];
for (let hour = 12; hour <= 23; hour += 1) {
  for (const half of [":00", ":30"]) {
    if (hour === 23 && half === ":30") break;
    SLOTS.push(`${hour}${half}`);
  }
}

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function ReserveForm() {
  const { reservations, hydrated, request, cancel } = useReservations();
  const [date, setDate] = useState(todayISO());
  const [slot, setSlot] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);

  const active = useMemo(
    () => reservations.filter((r) => r.status === "requested"),
    [reservations],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const day = todayISO();
    if (!date || date < day || !name.trim() || !phone.trim()) {
      setFailed(true);
      return;
    }
    setFailed(false);
    request({
      date,
      slot,
      guests,
      name: name.trim(),
      phone: phone.trim(),
      note: note.trim() || undefined,
    });
    setName("");
    setPhone("");
    setNote("");
  }

  const fieldClass = "mt-2 h-12 w-full rounded-[10px] border-0 bg-paper-2 px-4 text-ink";

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="bg-paper p-7 sm:p-9">
        <h2 className="display t-head text-ink">Request a table</h2>
        <p className="mt-2 t-body text-ink-2">
          Table requests in this demo stay on this device — the shop does not
          receive them, so nothing is confirmed until the counter calls back.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="res-date" className="block t-body font-medium text-ink">
                Day
              </label>
              <input
                id="res-date"
                name="date"
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="res-slot" className="block t-body font-medium text-ink">
                Time
              </label>
              <select
                id="res-slot"
                name="slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className={`${fieldClass} pr-2`}
              >
                {SLOTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="res-guests" className="block t-body font-medium text-ink">
              Guests
            </label>
            <select
              id="res-guests"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={`${fieldClass} pr-2`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => (
                <option key={option} value={option}>
                  {option} {option === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="res-name" className="block t-body font-medium text-ink">
              Name
            </label>
            <input
              id="res-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="res-phone" className="block t-body font-medium text-ink">
              Phone
            </label>
            <input
              id="res-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="res-note" className="block t-body font-medium text-ink">
              Anything the table needs <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="res-note"
              name="note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 w-full rounded-[10px] border-0 bg-paper-2 px-4 py-3 text-ink"
            />
          </div>

          {failed ? (
            <p className="t-small text-accent-deep">
              Check the day, the name and the phone — everything three are
              needed.
            </p>
          ) : null}

          <button type="submit" className="btn mt-2 w-fit">
            Send the request
          </button>
        </form>
      </div>

      <div>
        <h3 className="display-wide t-head text-cream">Your table requests</h3>
        <p className="mt-2 max-w-[42ch] t-body text-cream/80">
          Held in this browser as a demo. Call{" "}
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="underline underline-offset-4 hover:text-accent"
          >
            {restaurant.phoneDisplay}
          </a>{" "}
          for a confirmed table.
        </p>

        <ul className="mt-6 grid gap-4">
          {active.map((r) => (
            <li key={r.id} className="bg-cream p-5">
              <p className="display-wide t-lead text-ink">
                {r.slot} · {r.guests} {r.guests === 1 ? "guest" : "guests"}
              </p>
              <p className="mt-1 t-body text-ink-2">
                {new Date(`${r.date}T12:00:00`).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
                {" · "}for {r.name}
                {r.note ? ` — “${r.note}”` : ""}
              </p>
              <p className="mt-1 t-small text-muted">
                Requested, not confirmed — the shop has not seen this.
              </p>
              <button
                type="button"
                onClick={() => cancel(r.id)}
                className="mt-3 t-small text-ink underline underline-offset-4 hover:text-accent-deep"
              >
                Cancel this request
              </button>
            </li>
          ))}
          {hydrated && active.length === 0 ? (
            <li className="t-body text-cream/70">
              No requests on this device yet.
            </li>
          ) : null}
        </ul>

        <p className="mt-8 max-w-[46ch] t-small text-on-ink-muted">
          Listening for the real thing? A booking channel has not been set up
          with the shop yet — <Link href="/contact" className="underline underline-offset-4">the contact page</Link> has the ways
          that reach them today.
        </p>
      </div>
    </div>
  );
}

export default ReserveForm;
