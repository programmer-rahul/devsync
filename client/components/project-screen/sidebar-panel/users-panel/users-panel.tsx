'use client';

import { useStore } from "@/components/store/useStore";

export default function UsersPanel() {
  const connectedUsers = useStore((state) => state.projectClientsList);

  return (
    <div>
      <div>
        <h3 className="text-2xl font-semibold">Available Users</h3>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        {connectedUsers.map((user, index) => (
          <ConnectedUser username={user.username} key={index} />
        ))}
      </div>
    </div>
  );
}

const ConnectedUser = ({ username }: { username: string }) => {
  return (
    <div className="user rounded-md border bg-main/90 px-2 py-1 text-xl font-secondary">
      {username}
    </div>
  );
};
