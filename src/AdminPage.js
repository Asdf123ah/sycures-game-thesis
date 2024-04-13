import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sycures-api.onrender.com/api/admin/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sycures-api.onrender.com/api/admin/user-status"
        );
        setUserStatus(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  // Sort users based on column and direction
  const sortedUsers = users.slice().sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * (sortDirection === "asc" ? 1 : -1);
    } else {
      return (aValue - bValue) * (sortDirection === "asc" ? 1 : -1);
    }
  });

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      // If already sorting by this column, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a different column, set column and default direction to asc
      setSortBy(column);
      setSortDirection("asc");
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
    <div className="containerAdmin">
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("course")}>Course</th>
            <th onClick={() => handleSort("position")}>Position</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("password")}>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers
            .filter(
              (user) =>
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
                <td>{user.password.length > 10 ? user.password.slice(0, 15) + "..." : user.password}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort("name")}>Name</th>
            <th>Category Skill 1</th>
            <th>Category Skill 1 Attempt</th>
            <th>Category Skill 1 Best Score</th>
            <th>Category Skill 1 Best Time</th>
            <th>Category Skill 2</th>
            <th>Category Skill 2 Attempt</th>
            <th>Category Skill 2 Best Score</th>
            <th>Category Skill 2 Best Time</th>
            <th>Category Skill 3</th>
            <th>Category Skill 3 Attempt</th>
            <th>Category Skill 3 Best Score</th>
            <th>Category Skill 3 Best Time</th>
            <th>Category Skill 4</th>
            <th>Category Skill 4 Attempt</th>
            <th>Category Skill 4 Best Score</th>
            <th>Category Skill 4 Best Time</th>
\          </tr>
        </thead>
        <tbody>
          {sortedUsers
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.categories.length > 0
                    ? user.categories[0].category
                    : ""}
                </td>
                <td>
                  {user.categories.length > 0
                    ? user.categories[0].categoryAttempt
                    : ""}
                </td>
                <td>
                  {user.categories.length > 0
                    ? user.categories[0].bestScore
                    : ""}
                </td>
                <td>
                  {user.categories.length > 0
                    ? user.categories[0].bestTime
                    : ""}
                </td>
                <td>
                  {user.categories.length > 1
                    ? user.categories[1].category
                    : ""}
                </td>
                <td>
                  {user.categories.length > 1
                    ? user.categories[1].categoryAttempt
                    : ""}
                </td>
                <td>
                  {user.categories.length > 1
                    ? user.categories[1].bestScore
                    : ""}
                </td>
                <td>
                  {user.categories.length > 1
                    ? user.categories[1].bestTime
                    : ""}
                </td>
                <td>
                  {user.categories.length > 2
                    ? user.categories[2].category
                    : ""}
                </td>
                <td>
                  {user.categories.length > 2
                    ? user.categories[2].categoryAttempt
                    : ""}
                </td>
                <td>
                  {user.categories.length > 2
                    ? user.categories[2].bestScore
                    : ""}
                </td>
                <td>
                  {user.categories.length > 2
                    ? user.categories[2].bestTime
                    : ""}
                </td>
                <td>
                  {user.categories.length > 3
                    ? user.categories[3].category
                    : ""}
                </td>
                <td>
                  {user.categories.length > 3
                    ? user.categories[3].categoryAttempt
                    : ""}
                </td>
                <td>
                  {user.categories.length > 3
                    ? user.categories[3].bestScore
                    : ""}
                </td>
                <td>
                  {user.categories.length > 3
                    ? user.categories[3].bestTime
                    : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort("name")}>Name</th>
            <th>Total Attempts</th>
            <th>Average Score</th>
            <th>Average Time</th>
            <th>Is Wheel Spinning</th>
          </tr>
        </thead>
        <tbody>
          {userStatus
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.totalAttempts}</td>
                <td>{user.overallAverageScore}</td>
                <td>{user.overallAverageTime}</td>
                <td>{String(user.isWheelSpinning)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
