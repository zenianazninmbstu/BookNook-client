export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#B9DCCB] border-t-[#0C1C15]" />

        <p className="text-sm font-medium text-[#0C1C15]">
          Loading books...
        </p>
      </div>
    </div>
  );
}