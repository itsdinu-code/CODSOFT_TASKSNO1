import type { ReactNode } from "react";

/**
 * A plain reading page: a title band in the brand orange, then the text on
 * the cream ground. Used for the pages that are words rather than pictures.
 */
export function PageHeader({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="field-accent">
      <div className="wrap grid12 items-end gap-y-6 py-12 sm:py-16">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="display t-display text-ink">{title}</h1>
          {lede ? <p className="mt-4 max-w-[58ch] text-ink">{lede}</p> : null}
        </div>
        {children ? <div className="col-span-12 lg:col-span-4">{children}</div> : null}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <section className="field-paper section">
      <div className="wrap max-w-[68ch]">
        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function ProseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="display t-head text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-2">{children}</div>
    </section>
  );
}
