import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[1100px] flex-col items-center px-4 py-24 text-center">
      <p className="text-5xl font-bold tracking-tight">404</p>
      <h1 className="mt-3 text-xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-[15px] text-fb-text-secondary">
        That page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-md bg-fb-blue px-4 py-2 text-[15px] font-semibold text-white hover:opacity-90"
      >
        Back to profile
      </Link>
    </main>
  );
}
