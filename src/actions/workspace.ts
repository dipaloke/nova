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
    const isUserInWorkspace = await db.workspace.findUnique({
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

/**
 * Retrieves all folders within a specified workspace
 * @param workspaceId - The ID of the workspace to get folders from
 * @returns Object containing status and folders data with video counts
 */
export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    // Query folders in the workspace and include count of videos in each folder
    const isFolders = await db.folder.findMany({
      where: {
        workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    // Return folders if found
    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }

    // Return empty array if no folders found
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [error] };
  }
};

/**
 * Retrieves all videos associated with a workspace or folder
 * @param workspaceId - The ID of the workspace/folder to get videos from
 * @returns Object containing status and videos data with related information
 */
export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    // Query videos that belong to either workspace or folder
    const videos = await db.video.findMany({
      where: {
        OR: [{ workspaceId }, { folderId: workspaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAd: true,
        source: true,
        processing: true,
        // Include folder information
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        // Include user information
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAd: "asc",
      },
    });

    // Return videos if found
    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }

    // Return empty array if no videos found
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 404, data: [error] };
  }
};

/**
 * Retrieves all workspaces associated with the current user
 * Including both owned workspaces and workspaces where user is a member
 * @returns Object containing status and workspaces data with subscription info
 */
export const getWorkspaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    // Query user's workspaces and membership details
    const workspaces = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        // Include subscription plan
        subscription: {
          select: {
            plan: true,
          },
        },
        // Include owned workspaces
        workspaces: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        // Include workspaces where user is a member
        members: {
          select: {
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    // Return workspaces if found
    if (workspaces) return { status: 200, data: workspaces };

    // Return empty array if no workspaces found
    return { status: 400, data: [] };
  } catch (error) {
    return { status: 403, data: [error] };
  }
};
