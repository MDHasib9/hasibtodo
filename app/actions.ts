"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


// add todo
export async function addTodos(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("user not found ");
  }

  const text = formData.get("todoText") as string;

  if (!text || text.trim() === "") return;

  await prisma.todo.create({
    data: {
      text: text.trim(),
      userId: userId,
    },
  });

  revalidatePath("/");
}

// delete todo
export async function deleteTodo(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("user not found");

  await prisma.todo.delete({
    where: { id, userId },
  });

  revalidatePath("/todos");
}