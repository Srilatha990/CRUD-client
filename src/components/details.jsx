import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Details() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
      }
    };
    
    fetchUser();
  }, [id]);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1 style={{ fontWeight: 400, marginTop: 30 }}>Welcome {user.FirstName}</h1>
      <Card style={{ width: '40rem', marginTop: 20 }}>
        <Card.Body>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <Card.Img variant="top" src="../../images/user.png" style={{ width: 80 }} />
              <Card.Title><h3 className='mt-3 fs-5'>Name:<span style={{ fontWeight: 400 }}> {user.FirstName} {user.LastName}</span></h3></Card.Title>
              <h3 className='mt-3 fs-6'>Gender :<span style={{ fontWeight: 400 }}> {user.gender}</span></h3>
              <p className='bi bi-envelope'> Email : <span>{user.email}</span></p>
              <p className='bi bi-bag-fill'> Position : <span>{user.position}</span></p>
            </div>
            <div className='right_view col-lg-6 col-md-6 col-12 mt-4'>
              <div className='d-flex' style={{ justifyContent: 'flex-end' }}>
                <button className='btn btn-primary mx-2'><span className='bi bi-pencil-fill'></span></button>
                <button className='btn btn-danger'><span className='bi bi-trash3'></span></button>
              </div>
              <p className='bi bi-telephone mt-2'> Mobile : <span>{user.number}</span></p>
              <p className='bi bi-geo-alt'> Location : <span>{user.address}</span></p>
              <p> Description : <span>{user.description}</span></p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Details;
