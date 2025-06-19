import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions",
}

export default function Page() {
  return (
    <div>
      <section aria-labelledby="info-conditions-header">
        <h1 id="info-conditions-header" className="sr-only">
          Conditions.
        </h1>
      </section>
      <div className="p-4">
        Conditions page. Under construction...
      </div>
    </div>
  )
}
