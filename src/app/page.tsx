import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  // await prisma.todo.create({ data: { title: "Go to Gym", complete: true } });
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl "> Todos</h1>
        <Link
          href="/new"
          className="border border-slate-300
      text-slate-300 px-3 py-2 rounded hover:bg-slate-700
      focus-within:bg-slate-700 outline:none"
        >
          {" "}
          New{" "}
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
