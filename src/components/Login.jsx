import React , {useState }from 'react'
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin,logout } from '../store/authSlice';
import {Button, Input, Container, Loader, Logo} from './index.js'
import { AuthService } from '../appwrite/auth.js';
import { useForm } from 'react-hook-form';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);
    const login = async (data) => {
        setError(null);
        try {
            const session = await AuthService.login(data.email, data.password);
            if (session) {
                const userData= await AuthService.getCurrentUser();
                if(userData) dispatch(authLogin(session));      
                navigate('/');  
            } 
        } catch (err) {
            setError(err.message);
        }
        return (
            <div className={`min-h-screen flex items-center justify-center bg-gray-100`}>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-6">
                        <span className="text-2xl font-bold text-gray-800">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
                    <p className="text-sm text-gray-600 mb-6"> Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
                {error  && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit(login) } className='space-y-5'>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true , validate: (value) => {
                            return (
                              /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(
                                value
                              ) || "Invalid email format"
                            );
                        }})}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true, validate: (value) => {
                            return (
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Password must valid"
                            );
                        }})}
                    />
                    <Button type="submit" className='w-full'>Login</Button>
                </form>
                </div>
            </div>
        )
        }
}
export default Login