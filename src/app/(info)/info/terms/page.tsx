import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms",
}

export default function Page() {
  return (
    <div>
      <section aria-labelledby="info-terms-header">
        <h1 id="info-terms-header" className="sr-only">
          Terms.
        </h1>
      </section>
      <div className="p-4">
        Terms page. Under construction...
      </div>
    </div>
  )
}
