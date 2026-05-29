"use client";

import * as React from "react";
import Image from "next/image";

/** Live clock for Manila (Asia/Manila), 12-hour format. */
export function ManilaClock() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      title="Current time in Manila, Philippines"
      className="flex h-10 items-center gap-1.5 rounded-full bg-card px-3.5 text-sm font-medium text-fb-text shadow-md ring-1 ring-black/5 dark:ring-white/10"
    >
      <Image
        src="/flag-for-flag-philippines-svgrepo-com.svg"
        alt="Philippines flag"
        width={20}
        height={20}
        className="size-5 flex-none rounded-sm"
      />
      <span className="tabular-nums">{time ?? "--:--:-- --"}</span>

    </div>
  );
}
