import { onAuthenticateUser } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

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
  if (!auth.user?.workSpaces) redirect("/auth/sign-in");
  if (!auth.user?.workSpaces.length) redirect("/auth/sign-in");

  //making sure user have access to the workspace
  const hasAccess = await verifyAccessToWorkspace(workspaceId)

  //return users to their original(first) workspace
  if(hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workSpaces[0].id}`)
  }

  if(!hasAccess.data?.workspace) return null

  const query = new QueryClient()

  return <div>WorkspaceIdLayout</div>;
};

export default WorkspaceIdLayout;
