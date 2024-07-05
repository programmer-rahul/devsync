export default function CardProjectName({
  projectName,
}: {
  projectName: string;
}) {
  return (
    <div className="font-secondary text-3xl font-semibold capitalize">
      {projectName}
    </div>
  );
}
