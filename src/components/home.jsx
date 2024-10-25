import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      // Make sure the correct ID is being sent in the request
      console.log("Deleting user with ID:", id);
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <div className='add-btn mt-2'>
        <button className='btn btn-primary' onClick={() => navigate('/register')}>Add Data</button>
      </div>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr className='table-dark'>
            <th>S.NO</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.address}</td>
                <td className='d-flex justify-content-between'>
                  <button className='btn btn-success' onClick={() => navigate(`/details/${user._id}`)}>
                    <span className='bi bi-eye'></span>
                  </button>
                  <button className='btn btn-primary' onClick={() => navigate(`/edit/${user._id}`)}>
                    <span className='bi bi-pencil-fill'></span>
                  </button>
                  <button className='btn btn-danger' onClick={() => {
                    console.log(`Attempting to delete user ID: ${user._id}`);
                    handleDelete(user._id);
                  }}>
                    <span className='bi bi-trash3'></span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
