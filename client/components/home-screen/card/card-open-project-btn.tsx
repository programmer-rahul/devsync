import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardOpenProjectBtn({
  projectId,
  owner,
}: {
  projectId: string;
  owner: string;
}) {
  const updatedCurrentUsername = useStore(
    (state) => state.updatedCurrentUsername,
  );
  return (
    <Link
      href={`/project/${projectId}`}
      onClick={() => {
        updatedCurrentUsername(owner);
      }}
    >
      <Button className="h-7">Open</Button>
    </Link>
  );
}
