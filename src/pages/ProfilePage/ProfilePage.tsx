import React, { useState } from 'react';
import './style.css';
import { updateUserAsync } from '../../store/slices/userUpdateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Rootstate } from '../../store/store';
import { ToastContainer } from 'react-toastify';

import { updateToast } from './toastupdate';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    name: string;
    phone: number;
    location: number;
    about: string;
    fb: string;
    instagram: string
}

const ProfilePage: React.FC = () => {
    const { error } = useSelector((state: Rootstate) => state.updatedData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [detailsButton, setDetailsButton] = useState(false);


    const detailsButtonHandler = () => {
        setDetailsButton(!detailsButton);
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updateUserAsync(data));
        console.log("done")
        setDetailsButton(false);
        updateToast()
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    return (
        <div className="profile_page_div">
            <h2>Profile</h2>
            {detailsButton ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="profile_inputs_div">
                        <label>
                            <h2>Name</h2>
                            <input
                                type="text"
                                placeholder='Name...'
                                {...register('name', {
                                    required: "Name field is required",
                                    validate: {
                                        notOnlyNumbers: value => /^[^\d]*[a-zA-Z][^\d]*$/.test(value) || "Name cannot be only numbers"
                                    }
                                })}
                            />
                            <p>{errors.name?.message}</p>

                            <h2>Phone</h2>
                            <input
                                type="number"
                                placeholder='Phone...'
                                {...register('phone', {
                                    required: "Phone field is required"
                                })}
                            />
                            <p>{errors.phone?.message}</p>

                            <h2>Facebook</h2>
                            <input
                                type="text"
                                placeholder='Facebook...'
                                {...register('fb', {
                                    required: "Facebook field is required"
                                })}
                            />
                            <p>{errors.fb?.message}</p>

                            <h2>Location</h2>
                            <input
                                type="number"
                                placeholder='Location...'
                                {...register('location', {
                                    required: "Location field is required"
                                })}
                            />
                            <p>{errors.location?.message}</p>

                            <h2>About</h2>
                            <input
                                type="text"
                                placeholder='About...'
                                {...register('about', {
                                    required: "About field is required"
                                })}
                            />
                            <p>{errors.about?.message}</p>

                            <h2>Instagram</h2>
                            <input
                                type="text"
                                placeholder='Instagram...'
                                {...register('instagram', {
                                    required: "Instagram field is required"
                                })}
                            />
                            <p>{errors.instagram?.message}</p>
                        </label>
                        <button type="submit" className="details-button">
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <button className="details-button" onClick={detailsButtonHandler}>{detailsButton ? "Save" : "Details"}</button>
            )}
            <button onClick={() => navigate('/profile/photos')} className='move_to_photos'>Photos</button>
            <button onClick={()=>navigate('/profile/profile-photo')}className='move_to_avatar'> Upload Avatar</button>
            <ToastContainer />
        </div>
    );
}

export default ProfilePage;