import ActivityBarBtns from "./activity-bar-btns";

export default function ActivityBar() {
  return (
    <section className="flex h-full w-auto flex-col bg-transparent pr-2 font-secondary font-semibold border-r-2">
      <ActivityBarBtns />
    </section>
  );
}
