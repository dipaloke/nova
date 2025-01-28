import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const WorkspaceIdLayout = async ({
  params: { workspaceId },
  children,
}: Props) => {
  const auth = await onAuthenticateUser();
  //without workspaceID or at-least default workspace value redirect to sign in page
  if (!auth.user?.workspaces) redirect("/auth/sign-in");
  if (!auth.user?.workspaces.length) redirect("/auth/sign-in");

  //making sure user have access to the workspace
  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  //return users to their original(first) workspace
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workspaces[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return <HydrationBoundary state={dehydrate(query)}>
    <div className="flex h-screen w-screen">
      <Sidebar activeWorkspaceId = {workspaceId} />
    </div>
  </HydrationBoundary>
};

export default WorkspaceIdLayout;
