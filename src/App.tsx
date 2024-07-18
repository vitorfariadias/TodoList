import { useState, useEffect } from "react";

import { ITodo } from "./global/types/todo.types";
import { FilterType } from "./global/types/filter.types";
import { Filter, TodoForm, TodoList } from "./components";

import { Container, GlobalStyle } from "./styles";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return todo;
  });

  function addTodo(title: string, description: string): void {
    setTodos([
      ...todos,
      { id: Date.now(), title, description, completed: false },
    ]);
  }

  function toggleComplete(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(id: number, newTitle: string, newDescription?: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      )
    );
  }

  function sortByTitle() {
    todos.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
  
    const storedTodos = localStorage.getItem("todos")
      // ? JSON.parse(localStorage.getItem("todos") || "")
      // : [];
      if (storedTodos !== null)
      setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <GlobalStyle />
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} sortByTitle={sortByTitle} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
        editTodo={editTodo}
      />
    </Container>
  );
}
