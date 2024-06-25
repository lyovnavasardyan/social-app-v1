import React, { useState } from 'react';
import { updateUserAsync } from '../../store/slices/userUpdateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Rootstate } from '../../store/store';
import { ToastContainer } from 'react-toastify';
import PhotosPage from '../PhotosPage/PhotosPage';
import CoverPhoto from '../CoverPhoto/coverPhoto';
import { updateToast } from './toastupdate';
import Details from './Details/Details';

import './style.css';


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
            <CoverPhoto />
         
            {detailsButton ? (
                <div className="details-container">
                    <Details
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        error={error}
                        register={register}
                        errors={errors}
                    />
                    <button className="close-button" onClick={() => setDetailsButton(false)}>Close</button>
                </div>
            ):(
                <button className="details-button" onClick={detailsButtonHandler}>{detailsButton ? "Save" : "Details"}</button>
            )}
            <PhotosPage />
            <ToastContainer />
        </div>
    );
    
}

export default ProfilePage;