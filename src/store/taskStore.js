import { create } from "zustand";
import { readTasks } from "../api/Tasks";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: async () => {
    try {
      const { data } = await readTasks();
      set({ tasks: data.tasks });
    } catch (error) {
      console.log(error);
    }
  },
}));
