import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Users.css'; 


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        const nonAdminUsers = data.filter(user => user.email !== 'admin@gmail.com');
        setUsers(nonAdminUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (userId) => {
    try {
      const userToBlock = users.find(user => user.id === userId);

      if (userToBlock) {
        const updatedUser = { blocked: !userToBlock.blocked };

        const response = await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

        if (response.status === 200) {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.id === userId ? { ...user, blocked: updatedUser.blocked } : user
            )
          );
        }
      }
    } catch (err) {
      setError('Failed to update block status.');
      console.error('Error blocking user:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="users-page">
      <h1>User Details</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th> 
            <th>Block</th> 
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.orders && user.orders.length > 0 ? (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.name}</td>
                          <td>{order.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No orders</p>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleBlock(user.id)}
                  style={{
                    backgroundColor: user.blocked ? 'green' : 'red',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {user.blocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
