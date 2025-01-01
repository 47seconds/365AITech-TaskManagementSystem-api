import {axiosInstance} from '../conf/axiosInstance.conf.js';

export class AuthService {
    userLogin = async(userLoginData) => {
      try {
        const user = await axiosInstance.post(
            '/auth/login',
            {
                username: userLoginData.username,
                password: userLoginData.password
            }
        );
        if(user.data.statusCode == 200) {
            return user.data;
        } else {
            console.log('cannot login');
        }
      } catch (error) {
          throw error;
      }
    }

    userLogout = async() => {
        try {
            const res = await axiosInstance.post('/auth/logout').then();
            if(res.data.statusCode == 200) {
                return res.data.message;
            }
        } catch (error) {
            throw error;
        }
    }

    userSignup = async(userignupFormData) => {
        try {
            const res = await axiosInstance.post('/auth/register', {
        username: userignupFormData.username,
        password: userignupFormData.password,
        email: userignupFormData.email
      });
            if(res.data.statusCode == 200) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
