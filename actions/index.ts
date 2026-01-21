"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface FormState {
  message: string;
}

export async function createSnippet(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "You must be signed in to create a snippet." };
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const language = formData.get("language") as string;

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title is too short" };
    }
    if (typeof code !== "string" || code.length < 3) {
      return { message: "Code is too short" };
    }
    if (typeof language !== "string" || language.length == 0) {
      return { message: "Language is required" };
    }

    await db.snippet.create({
      data: {
        title,
        code,
        language: typeof language === "string" ? language : "javascript",
        userId,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong..." };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function editSnippet(
  id: string,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "You must be signed in to create a snippet." };
  }

  const snippet = await db.snippet.findFirst({
    where: { id, userId },
  });
  if (!snippet) {
    return { message: "Snippet not found." };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const language = formData.get("language") as string;

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title is too short" };
    }
    if (typeof code !== "string" || code.length < 3) {
      return { message: "Code is too short" };
    }
    if (typeof language !== "string" || language.length == 0) {
      return { message: "Language is required" };
    }

    await db.snippet.update({
      where: { id },
      data: { code, title, language },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong..." };
    }
  }

  revalidatePath("/");
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
  const { userId } = await auth();
  if (!userId) {
    return { message: "You must be signed in to create a snippet." };
  }

  const snippet = await db.snippet.findFirst({
    where: { id, userId },
  });
  if (!snippet) {
    return { message: "Snippet not found." };
  }

  try {
    await db.snippet.delete({ where: { id } });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong..." };
    }
  }
  revalidatePath("/");
  redirect("/");
}

export async function toggleSnippetPrivacy(id: string, isPublic: boolean) {
  const { userId } = await auth();
  if (!userId) {
    return { message: "You must be signed in to create a snippet." };
  }

  const snippet = await db.snippet.findFirst({
    where: { id, userId },
  });

  if (!snippet) {
    return { message: "Snippet not found." };
  }

  try {
    await db.snippet.update({
      where: { id },
      data: { isPublic: !isPublic },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong..." };
    }
  }

  revalidatePath(`/snippets/${id}`);
}
