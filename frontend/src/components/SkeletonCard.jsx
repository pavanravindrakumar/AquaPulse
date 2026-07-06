function SkeletonCard({ className = "", lines = 2, compact = false }) {
  return (
    <div className={`animate-pulse rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl ${className}`}>
      <div className="h-3 w-24 rounded-full bg-white/10" />
      <div className={`mt-4 h-8 rounded-2xl bg-white/10 ${compact ? "w-2/3" : "w-1/2"}`} />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full bg-white/10 ${index === 0 ? "w-full" : index === 1 ? "w-5/6" : "w-2/3"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SkeletonCard;