export default function StatusBadge({ isRead }: { isRead: boolean }) {
  if (isRead) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-green-100 text-green-700 px-2 py-0.5 font-medium">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
        Read
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-yellow-100 text-yellow-700 px-2 py-0.5 font-medium">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500" />
      Wishlist
    </span>
  );
}
