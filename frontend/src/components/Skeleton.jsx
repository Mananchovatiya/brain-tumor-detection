// Simple animated placeholder pieces, built from Tailwind's `animate-pulse`.
// Compose these into page-specific skeleton layouts (see SkeletonTable,
// SkeletonCards below) instead of showing plain "Loading..." text.

export function SkeletonLine({ className = "" }) {
  return <div className={`animate-pulse rounded bg-neutral-200 ${className}`} />;
}

// Mimics a row of stat cards (e.g. Dashboard's "Total Scans" boxes).
export function SkeletonCards({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <SkeletonLine className="mx-auto h-8 w-16" />
          <SkeletonLine className="mx-auto mt-3 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

// Mimics a data table while its rows are loading.
export function SkeletonTable({ columns = 3, rows = 4 }) {
  return (
    <table className="table-base">
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: columns }).map((_, c) => (
              <td key={c}>
                <SkeletonLine className="h-4 w-full max-w-[120px]" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
