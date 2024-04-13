import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sycures-api.onrender.com/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  // Sort users based on column and direction
  const sortedUsers = users.slice().sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue) * (sortDirection === 'asc' ? 1 : -1);
    } else {
      return (aValue - bValue) * (sortDirection === 'asc' ? 1 : -1);
    }
  });

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      // If already sorting by this column, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a different column, set column and default direction to asc
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Pagination
  const usersPerPage = 20;
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='containerAdmin'>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='input'
      />
      <table className='table'>
        <thead className='th'>
          <tr className='tr'>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('course')}>Course</th>
            <th onClick={() => handleSort('position')}>Position</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('password')}>Password</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.course}</td>
                <td>{user.position}</td>
                <td>{user.email}</td>
                <td>{user.password.length > 10 ? user.password.slice(0, 10) + '...' : user.password}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default AdminPage;
