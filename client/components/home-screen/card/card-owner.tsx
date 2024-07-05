export default function CardOwner({ owner }: { owner: string }) {
  return (
    <div className="px-8 py-1 pl-4">
      <p className="flex items-end gap-1 text-neutral-300">
        <span>By</span>
        <span className="text-xl font-semibold">{owner}</span>
      </p>
    </div>
  );
}
