import { openDB } from "idb";

export const dbPromise = openDB("todo-db", 1,{
    upgrade(db){
        if(!db.objectStoreNames.contains("todos")){
            db.createObjectStore("todos",{
                keyPath: "id",
                autoIncrement: true,
            });
        }
    },
});

export const addTodo= async(todo) =>{
    const db=await dbPromise;
    return db.add("todos",todo);
};

export const getTodos=async()=>{
    const db=await dbPromise;
    return db.getAll("todos");
};

export const deleteTodo=async(id)=>{
    const db=await dbPromise;
    return db.delete("todos",id);
};

export const migrateGuestTodos = async (oldUserId, newUserId) => {
  const db = await dbPromise;
  const todos = await db.getAll("todos");

  const guestTodos = todos.filter(
    (todo) => todo.userId === oldUserId
  );

  for (const todo of guestTodos) {
    await db.put("todos", {
      ...todo,
      userId: newUserId,
    });
  }
};
