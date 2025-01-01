import { axiosInstance } from "../conf/axiosInstance.conf";

export class CategoryService {
    addCategory = async (categoryData) => {
        try {
          const res = await axiosInstance.post('/categories', {
        name: categoryData.name
      });

      if (res.data.statusCode == 200) return res.data;
      else console.log('failed to add user category');
        } catch (error) {
            throw error;
        }
    }

    getCategories = async () => {
        try {
          const categories = await axiosInstance.delete('/categories');
          if (!categories.data.statusCode == 200) return tasks.data;
          else console.log('failed to get user categories');
        } catch (error) {
            throw error;
        }
    }

    deleteCategory = async (categoryId) => {
        try {
            const res = await axiosInstance.delete(`/categories/${categoryId}`);
            if (res.data.statusCode == 200) {
                return res.data;
            } else {
                console.log('failed to delete specific task');
            }
        } catch (error) {
            throw error;
        }
    }
}

const categoryService = new CategoryService();

export default categoryService;
