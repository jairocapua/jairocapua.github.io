"use client";

import * as React from "react";
import { Feed } from "@/components/profile/feed";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs, type TabKey } from "@/components/profile/profile-tabs";
import { Sidebar } from "@/components/profile/sidebar";

export function ProfileShell() {
  const [active, setActive] = React.useState<TabKey>("all");

  return (
    <>
      {/* cover + identity + tabs as one white surface */}
      <div className="fb-card overflow-hidden">
        <ProfileHeader />
        <ProfileTabs active={active} onChange={setActive} />
      </div>

      {/* two-column body */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside>
          <Sidebar onNavigate={setActive} />
        </aside>
        <Feed active={active} />
      </div>
    </>
  );
}
