export default function Loading() {
  return (
    <div className="pt-[80px] min-h-[60vh] flex items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-border-grey border-t-green rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
