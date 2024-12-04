import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Authentication/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Minimum 4 characters').required('Password is required'),
  });

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const success = register(values.name, values.email, values.password);
          if (success) {
            navigate('/login');
          }
        }}
      >
        <Form className="auth-form">
          <label>Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error" />

          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
      <a href='/login' color='blue'>Log in</a>
    </div>
  );
};

export default Register;
