import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { loginAsync } from '../../store/slices/loginSlice';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
  
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state: Rootstate) => state.loginData); 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const resultAction: = await dispatch(loginAsync(data));
        if (loginAsync.fulfilled.match(resultAction)) {
            navigate('/profile');
        }
    };

    return (
        <div className='login_page_div'>
            <h2>Login</h2>
           
            <form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className="error-message">{error}</p>}
                <div className="login_inputs_div">
                    <label>
                        <input
                            type="text"
                            placeholder='email'
                            autoComplete='off'
                            {...register('email', {
                                required: "Email field is required"
                            })}
                        />
                        <p>{errors.email?.message}</p>
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder='password'
                            autoComplete='off'
                            {...register('password', {
                                required: "Password field is required"
                            })}
                        />
                        <p>{errors.password?.message}</p>
                    </label>
                </div>
                <button type="submit" className='login_btn'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;