import { trpc } from "@/trpc/server";
import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import Client from "./Client";
import { getQueryClient } from "@/trpc/server";
import { Suspense } from "react";
import { requiredAuth } from "@/lib/auth-utils";




export default async function Home() {
  await requiredAuth();

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.hello.queryOptions())

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
        <Client />
        </Suspense>
      </HydrationBoundary>

    </div>
  );
}
