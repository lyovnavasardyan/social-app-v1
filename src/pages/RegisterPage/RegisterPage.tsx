import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { Rootstate } from '../../store/store'
import schema from './registerSchema'
import { fetchData } from '../../api/api'
import RegisterModal from '../../components/RegisterModal/RegisterModal'
import Modal from '../../components/Modal'
import './style.css'


interface FormValues {
    name: string;
    email: string;
    password: string;
  }
  
  const RegisterPage: React.FC = () => {
    const { title } = useSelector((state: Rootstate) => state.registerData);  // save title in config file
  
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
      resolver: yupResolver(schema)
    });
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        const res = await fetchData.sendRegisterData(data);
  
        if (res.status === 200 || res.status === 201) {
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
        setIsModalOpen(true);
      } catch (error) {
        setIsRegistered(false);
        setIsModalOpen(true);
      }
    };
  
    return (
      <div className='register_page_div'>
        <Modal isOpen={isModalOpen}>
          <RegisterModal 
            setIsModalOpen = {setIsModalOpen}
            isRegistered={isRegistered as boolean} 
            setIsRegistered={setIsRegistered}
          />
        </Modal>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register_inputs_div">
            <label>
              <input
                type="text"
                placeholder='name'
                autoComplete='off'
                {...register('name', {
                  required: "name field is required"
                })}
              />
              <p>{errors.name?.message}</p>
            </label>
            <label>
              <input
                type="text"
                placeholder='email'
                autoComplete='off'
                {...register('email', {
                  required: "email field is required"
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
                  required: "password field is required"
                })}
              />
              <p>{errors.password?.message}</p>
            </label>
          </div>
          <button className='register_btn'>Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterPage;