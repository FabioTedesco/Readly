export default function BooksSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-border bg-card shadow-sm overflow-hidden"
        >
          {/* Copertina fittizia */}
          <div className="aspect-[3/4] w-full bg-accent" />

          {/* Testo */}
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 rounded bg-accent" />
            <div className="h-3 w-1/2 rounded bg-accent" />
          </div>

          {/* Pulsanti */}
          <div className="flex gap-2 p-4">
            <div className="h-9 flex-1 rounded bg-accent" />
            <div className="h-9 flex-1 rounded bg-accent" />
          </div>
        </div>
      ))}
    </div>
  );
}
