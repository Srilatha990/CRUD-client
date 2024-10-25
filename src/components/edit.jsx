import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const [input, setInput] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    number: '',
    address: '',
    gender: '',
    description: ''
  });
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://crud-server-80x5.onrender.com/api/users/${id}`);
        setInput(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://crud-server-80x5.onrender.com/api/users/${id}`, input);
      console.log('User updated:', response.data);
      navigate('/'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };

  // Handle input changes
  const setData = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='container'>
      <h1 className='mt-4'>Edit User</h1>
      <form className='w-50' onSubmit={handleSubmit}>
        <div className='row mt-4'>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">First Name</label>
            <input
              type="text"
              value={input.FirstName}
              onChange={setData}
              name='FirstName'
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              value={input.LastName}
              onChange={setData}
              name='LastName'
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={input.email}
              onChange={setData}
              name='email'
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Phone</label>
            <input
              type="text"
              value={input.number}
              onChange={setData}
              name='number'
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              value={input.address}
              onChange={setData}
              name='address'
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Gender</label>
            <select
              value={input.gender}
              onChange={setData}
              name='gender'
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Description</label>
            <textarea
              value={input.description}
              onChange={setData}
              name='description'
              className="form-control"
              rows="3"
            />
          </div>
          <div className='mb-3'>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
