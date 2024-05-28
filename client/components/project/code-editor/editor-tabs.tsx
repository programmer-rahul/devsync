import FileTab from "./file-tab";

export default function EditorTabs() {
  return (
    <div className="flex w-full gap-2 rounded-tl-lg rounded-tr-lg bg-secondary px-3 py-2">
      <FileTab isActive fileName="index.js" />
      <FileTab isActive={false} fileName="main.js" />
      <FileTab isActive={false} fileName="server.js" />
    </div>
  );
}
