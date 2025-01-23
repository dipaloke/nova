"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    // Get the current authenticated user from Clerk
    const user = await currentUser();

    // Return forbidden status if no user is authenticated
    if (!user) {
      return { status: 403 };
    }

    // Check if user already exists in our database
    const existingUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        // Include user's workspaces in the query response
        workSpaces: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    // If user exists, return their data
    if (existingUser) {
      return { status: 200, user: existingUser };
    }

    // If user doesn't exist, create new user with default settings
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        // Create default studio for the user
        studio: {
          create: {},
        },
        // Create default subscription for the user
        subscription: {
          create: {},
        },
        // Create default personal workspace
        workSpaces: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      // Include workspace and subscription info in the response
      include: {
        workSpaces: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    // Return the newly created user data
    if(newUser){
      return  { status: 201, user: newUser };
    }

    // Return bad request if user creation fails
    return {status: 400}
  } catch (error) {
    // Return server error if any exception occurs
    return {status: 500, errorMessage: error}
  }
};
