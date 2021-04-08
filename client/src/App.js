import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import TaskList from "./components/TaskList";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  queryCache,
} from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  const [label, setLabel] = React.useState("");

  const useTask = () => {
    return useQuery("task", async () => {
      const { data } = await axios.post("http://localhost:9000/tasks", {
        label,
      });
      debugger;
      return data;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  const handleBlur = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (event.target?.value?.length > 0) {
      newTask(label);
    }
    // this.refs["taskForm"].submit();
  };

  const newTask = (label) => {
    this.useTask(label);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Tasks</h1>
      <TaskList />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={label}
          placeholder="New task..."
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
        ></input>
      </form>
    </QueryClientProvider>
  );
}
