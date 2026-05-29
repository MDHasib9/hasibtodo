"use server";

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
    <div className="w-screen flex-col h-screen ">
      {/* adding todo */}
      <div className="w-screen flex pt-40 justify-center items-center ">
        <form action={addTodos}>
          <input placeholder="Enter a todo" className=" border border-gray-700 rounded-md py-1.5 px-6" type="text" name="todoText" required />
          <button className="bg-blue-600 py-1 px-3 rounded-md mx-3" type="submit">add</button>
        </form>{" "}
      </div>
      <div className=" w-screen  ">
        {todos.map((todo) => (
          <div className="w-screen flex pt-3 justify-center items-center">
            <div className=" w-90 flex  justify-between p-4 rounded-lg  items-center bg-gray-600 overflow-auto "  key={todo.id}>
              <p className="" >{todo.text}</p>

              <form className="" action={deleteTodo.bind(null, todo.id)}>
                <button className="bg-red-800 py-1 px-3 rounded-md  text-white" type="submit">delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
