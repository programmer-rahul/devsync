"use client";

import { useStore } from "@/components/store/useStore";
import ExplorerPanel from "./file-explorer/explorer-panel";
import UsersPanel from "./users-panel/users-panel";
import ChatPanel from "./chats-panel/chats-panel";
import SettingsPanel from "./settings-panel/settings-panel";

export default function SideBarPanel() {
  const currentActivityButton = useStore(
    (state) => state.currentActivityButton,
  );

  return (
    <section className="w-full max-w-96 py-1 px-2">
      {currentActivityButton === "files" && <ExplorerPanel />}
      {currentActivityButton === "chats" && <ChatPanel />}
      {currentActivityButton === "users" && <UsersPanel />}
      {currentActivityButton === "settings" && <SettingsPanel />}
    </section>
  );
}
