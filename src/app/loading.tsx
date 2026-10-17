import { NoticeSkeleton } from "@/components/NoticeBoard";

export default function Loading() {
  return (
    <main className="flex flex-col gap-8 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <NoticeSkeleton />
      </div>
    </main>
  );
}
