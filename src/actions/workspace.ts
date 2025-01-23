"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Verifies if the current user has access to the specified workspace
 * @param workspaceId - The ID of the workspace to check access for
 * @returns Object containing status and workspace data
 */

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 403 };

    // Check if user has access to workspace by:
    // 1. Being the workspace owner (user.clerkId matches)
    // 2. Being a member of the workspace
    const isUserInWorkspace = await db.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          // Check if user is the workspace owner
          {
            user: {
              clerkId: user.id,
            },
          },
          // Check if user is a workspace member
          {
            members: {
              every: {
                user: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    return { status: 403, data: { workspace: null, message: error } };
  }
};
