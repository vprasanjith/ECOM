import React from 'react';
import { useAuth } from '../components/Authentication/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Minimum 4 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    const success = login(values.email, values.password);
    if (success) {
      navigate('/');
    }
  };  

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="auth-form">
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
      <a href='/register' color='blue'>Register</a>
    </div>
  );
};

export default Login;
