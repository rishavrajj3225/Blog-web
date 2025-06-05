import React,{useState} from 'react'
import  AuthService  from '../appwrite/auth'
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Container, Logo } from './index.js'
import { useDispatch } from 'react-redux';
import { authLogin } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);   
    const signup = async (data) => {
        setError(null);
        try {
            const userAccount = await AuthService.createAccount(data);
            if (userAccount) {
                const session = await AuthService.login({ email: data.email, password: data.password });
                if (session) {
                    const userData = await AuthService.getCurrentUser();
                    if (userData) dispatch(authLogin(session));
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div>
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
            <Input
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
        />
            <Input
            label="Password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
        />
        <Button type="submit" className='w-full'>Signup</Button>
        </form>
    </div>
    )
}

export default Signup