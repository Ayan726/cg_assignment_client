import axios from "../lib/axios";

export const createTask = async (title, description) => {
  try {
    const res = await axios.post("/api/v1/task", {
      title,
      description,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const readTasks = async () => {
  try {
    const res = await axios.get("/api/v1/task");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const readOneTask = async (id) => {
  try {
    const res = await axios.get(`/api/v1/task/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, title, description) => {
  try {
    const res = await axios.patch(`/api/v1/task/${id}`, {
      title,
      description,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`/api/v1/task/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
