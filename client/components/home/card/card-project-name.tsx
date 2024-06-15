export default function CardProjectName({
  projectName,
}: {
  projectName: string;
}) {
  return <div className="text-3xl font-semibold capitalize">{projectName}</div>;
}
