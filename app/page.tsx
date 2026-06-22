import { trpc } from "@/trpc/server";
import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import Client from "./Client";
import { getQueryClient } from "@/trpc/server";




export default function Home() {


  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.hello.queryOptions())

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Client />
      </HydrationBoundary>

    </div>
  );
}
