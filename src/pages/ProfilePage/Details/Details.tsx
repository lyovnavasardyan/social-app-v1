import React from 'react'

interface DetailsProps {
    handleSubmit:void;
    onSubmit:void;
    errors: {
        name?: { message: string };
        phone?: { message: string };
        fb?: { message: string };
        location?: { message: string };
        about?: { message: string };
        instagram?: { message: string };
    };
    error?: string;
}

const Details: React.FC<DetailsProps> = ({ handleSubmit, onSubmit, error, register, errors }) => {
    return (
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
                        type="text"
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
                        type="text"
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
    );
};

export default Details;