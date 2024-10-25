import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [input, setInput] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    number: '',
    address: '',
    gender: '',
    description: ''
  });
  const [error, setError] = useState(''); // State for error message

  const navigate = useNavigate();

  const setData = (e) => {
    const { name, value } = e.target;
    setInput((prevVal) => ({
      ...prevVal,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(''); // Reset error before making request
      await axios.post('http://localhost:5000/api/users', input);
      navigate('/'); // Redirect to home after successful submission
    } catch (error) {
      // Check for duplicate email error
      if (error.response && error.response.data.message.includes('duplicate key error')) {
        setError('Email already in use. Please try another.'); // Set specific error message
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='container'>
      <NavLink to='/'>Home</NavLink>
      <form className='w-50' onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <div className='row mt-4'>
          {/* Form fields */}
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="FirstName" className="form-label">First Name</label>
            <input type="text" value={input.FirstName} onChange={setData} name='FirstName' className="form-control" id="FirstName" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="LastName" className="form-label">Last Name</label>
            <input type="text" value={input.LastName} onChange={setData} name='LastName' className="form-control" id="LastName" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={input.email} onChange={setData} name='email' className="form-control" id="email" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="number" className="form-label">Mobile Number</label>
            <input type="text" value={input.number} onChange={setData} name='number' className="form-control" id="number" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" value={input.address} onChange={setData} name='address' className="form-control" id="address" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input type="text" value={input.gender} onChange={setData} name='gender' className="form-control" id="gender" />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name='description' value={input.description} onChange={setData} className='form-control' rows='5'></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
