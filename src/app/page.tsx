import Link from "next/link";

import CreateCheckin from "@/app/_components/create-checkin";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { format } from "date-fns";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Time Machine <span className="text-purple-400">Next</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Button>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Sign in"}
              </Link>
            </Button>
          </div>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const checkins = await api.checkin.list();

  return (
    <div className="flex w-full flex-col items-center">
      {format(new Date(), "EEEE, d LLLL yyyy")}
      {checkins.length > 0 ? (
        <p className="truncate">
          Your most recent checkin: {checkins[0]!.duration.toFixed(3)} hrs #
          {checkins[0]!.tag} {checkins[0]!.activities}
        </p>
      ) : (
        <p>You have no checkins yet.</p>
      )}

      <CreateCheckin />
    </div>
  );
}
