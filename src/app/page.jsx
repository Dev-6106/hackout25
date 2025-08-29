"use client";
import React, { useState, useEffect } from 'react';
import supabase from './supabase-client'

const page = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editingId, setEditingId] = useState();

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", e)

    if (error) {
      console.error("Error deleting task ", error.message)
      return;
    }
    fetchTasks()
  }

  const handleEdit = (taskItem) => {
    setTask(taskItem.tasks);
    setDesc(taskItem.desc);
    setEditingId(taskItem.id);
  };

  const fetchTasks = async () => {
    const { error, data } = await supabase.from("tasks").select("*").order("created_at", { ascending: true })

    if (error) {
      console.error("Error reading task ", error.message)
      return;
    }
    setTaskList(data);
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  console.log(taskList)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      if (editingId) {
        // Update existing task
        const { data, error } = await supabase
          .from("tasks")
          .update({ tasks: task, desc })
          .eq("id", editingId)
          .select()
          .single();
        if (error) throw error;

        setTaskList(taskList.map(t => (t.id === editingId ? data : t)));
        setEditingId(null);
      } else {
        // Add new task
        const { data, error } = await supabase
          .from("tasks")
          .insert({ tasks: task, desc })
          .select()
          .single();
        if (error) throw error;

        setTaskList([...taskList, data]);
      }
      setTask("");
      setDesc("");
    } catch (err) {
      console.error("Error saving task:", err.message);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-950 px-4 py-10 gap-10">

      {/* Input Form */}
      <div className="flex flex-col w-full max-w-md gap-3">
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-300 text-black px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Task List</h1>
        {taskList.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet</p>
        ) : (
          <ul className="space-y-4">
            {taskList.map((taskItem, key) => (
              <li
                key={key}
                className={`p-4 rounded-xl border ${taskItem.completed ? "bg-green-900 border-green-700" : "bg-gray-800 border-gray-700"
                  } shadow hover:shadow-lg transition`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-white">{taskItem.tasks}</h2>

                </div>
                <p className="text-gray-300">{taskItem.desc}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(taskItem)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(taskItem.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default page;
