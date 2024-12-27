/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { db } from "@/features/db/db"
import { z } from "zod"
import { profileFormSchema } from "../schemas"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { S3Client } from "@aws-sdk/client-s3"


const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true
});

export type ProfileFormData = z.infer<typeof profileFormSchema>

export async function getProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        phone: true,
        country: true,
        language: true,
        timezone: true,
        emailVerified: true,
      }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Convert any Date objects to ISO strings
    const serializedUser = {
      ...user,
      emailVerified: user?.emailVerified?.toISOString(),
    };

    return { user: serializedUser };
  } catch (error) {
    return { error: "Failed to fetch profile" };
  }
}

export async function updateProfile(userId: string, data: ProfileFormData) {
  try {
    // Validate the input data
    const validated = profileFormSchema.parse(data)

    // Check if username is taken (if being updated)
    if (validated?.username) {
      const existing = await db.user.findFirst({
        where: {
          username: validated?.username,
          NOT: { id: userId }
        }
      })
      if (existing) {
        return { error: "Username already taken" }
      }
    }

    // Update the user profile
    const updated = await db.user.update({
      where: { id: userId },
      data: validated,
      select: {
        username: true,
        email: true,
        phone: true,
        country: true,
        language: true,
        timezone: true,
        emailVerified: true,
      }
    })

    // Serialize the response
    const serializedUser = {
      ...updated,
      emailVerified: updated?.emailVerified?.toISOString(),
    };

    return { success: true, user: serializedUser }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data", details: error.errors }
    }
    return { error: "Failed to update profile" }
  }
} 

// export async function updateProfileImage(userId: string, imageUrl: string) {
//   try {
//     const updated = await db.user.update({
//       where: { id: userId },
//       data: { image: imageUrl },
//       select: { image: true }
//     });
//     return { success: true, image: updated.image };
//   } catch (error) {
//     console.error("Error updating profile image:", error);
//     return { error: "Failed to update profile image" };
//   }
// }

export async function getImageUploadUrl(userId: string, fileType: string): Promise<{ url: string; fields: Record<string, string>; key: string }> {
  const fileExtension = fileType.split('/')[1] || 'png';
  const key = `profile-images/${userId}-${Date.now()}.${fileExtension}`;
  
  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10MB
        ["starts-with", "$Content-Type", "image/"],
      ],
      Expires: 600, // 10 minutes
      Fields: {
        'Content-Type': fileType,
        'success_action_status': '201'
      }
    });

    console.log('Generated URL:', url); // For debugging
    console.log('Generated Fields:', fields); // For debugging

    return { 
      url: url,
      fields: {
        ...fields,
        'Content-Type': fileType,
      },
      key 
    };
  } catch (error) {
    console.error("Error generating upload URL:", error);
    throw new Error('Failed to generate upload URL');
  }
}