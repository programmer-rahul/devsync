import { useStore } from "@/components/store/useStore";

export default function UsersPanel() {
  const connectedUsers = useStore((state) => state.projectClientsList);

  return (
    <div>
      <div>
        <h3>Available Users</h3>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        {connectedUsers.map((user) => (
          <ConnectedUser username={user.username} />
        ))}
      </div>
    </div>
  );
}

const ConnectedUser = ({ username }: { username: string }) => {
  return (
    <div className="user rounded-md border bg-lime-800 px-2 py-1 text-xl">
      {username}
    </div>
  );
};
