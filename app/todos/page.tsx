

'use server'

import { addTodos, deleteTodo } from "../actions";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div> please login first </div>;
  }
  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      {/* adding todo */}
      <div>
        <form action={addTodos}>
          <input type="text" name="todoText" required />
          <button type="submit">add</button>
        </form>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo.id} >
            <p>{todo.text}</p>

            <form action={deleteTodo.bind(null, todo.id)}>



                <button type="submit" >delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
