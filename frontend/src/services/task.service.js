import { axiosInstance } from "../conf/axiosInstance.conf";

export class TaskService {
    postTask = async (task) => {
        try {
          const res = await axiosInstance.post('/tasks', {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task,dueDate,
        category_id: task.category_id
      });

      if (res.data.statusCode == 200) return res.data;
      else console.log('failed to add user task');
        } catch (error) {
            throw error;
        }
    }

    getTasks = async () => {
        try {
          const tasks = await axiosInstance.get('/tasks');
          if (!tasks.data.statusCode == 200) return tasks.data;
          else console.log('failed to get user tasks');
        } catch (error) {
            throw error;
        }
    }

    getSpecificTask = async (taskId) => {
        try {
            const task = await axiosInstance.get(`/tasks/${taskId}`);
            if (task.data.statusCode == 200) {
                return task.data;
            } else {
                console.log('failed to get specific task');
            }
        } catch (error) {
            throw error;
        }
    }
}

const taskService = new TaskService();

export default taskService;
