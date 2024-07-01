import ActivityBarBtns from "./activity-bar-btns";

export default function ActivityBar() {
  return (
    <section className="flex h-full w-auto flex-col rounded-lg bg-secondary p-2 font-secondary font-semibold">
      <ActivityBarBtns />
    </section>
  );
}
