"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface FormState {
  message: string;
}

export async function createSnippet(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
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
      language,
    },
  });
  revalidatePath("/");
  redirect("/");
}

export async function editSnippet(
  id: number,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
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

  revalidatePath("/");
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
}
