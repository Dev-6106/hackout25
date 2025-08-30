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
    <>
    
    </>
  );
};

export default page;
