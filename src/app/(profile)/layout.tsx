import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { Sidebar } from "@/components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[1100px] px-2 py-4 sm:px-4">
      {/* cover + identity + tabs as one white surface */}
      <div className="fb-card overflow-hidden">
        <ProfileHeader />
        <ProfileTabs />
      </div>

      {/* two-column body — only the feed ({children}) swaps between tabs */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* On mobile the feed leads; the sidebar drops below it. On md+ the
            grid's source order (sidebar left, feed right) takes over. */}
        <aside className="order-last md:order-none">
          <Sidebar />
        </aside>
        <div className="order-first min-w-0 md:order-none">{children}</div>
      </div>
    </main>
  );
}
