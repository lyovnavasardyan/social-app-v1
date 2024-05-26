import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name must be at least 3 characters')
        .matches(/^(?!^\d+$)[\w\s]+$/, 'Name cannot contain only numbers')
        .required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

export default schema