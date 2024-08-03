import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Enter Valid Email').required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

export const registerSchema = yup.object().shape({
  email: yup.string()
    .email('Enter Valid Email')
    .required('Email is required'),

  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export const eventSchema = yup.object().shape({
  event: yup.string()
    .min(3, 'Event must be at least 3 characters long')
    .required('Event name is required'),

  place: yup.string()
    .required('Place is required')
    .min(3, 'Place must be at least 3 characters long'),

  date: yup.string()
    .required('Date is required')
    .min(3, 'Enter correct date'),
})