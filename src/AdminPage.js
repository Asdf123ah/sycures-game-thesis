import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { FaSort } from "react-icons/fa";

function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModeRowId, setEditModeRowId] = useState(null);

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

// Function to handle edit action
const handleEdit = (userId) => {
  setEditModeRowId(userId);
};

// Function to handle change in input fields during edit
const handleEditChange = (e, userId, field) => {
  const { value } = e.target;
  setUsers(users.map(user => user._id === userId ? { ...user, [field]: value } : user));
};

// Function to save edits
const handleSave = async (userId, updatedUserData) => {
  try {
    // Send a PUT request to update the user data on the backend
    await axios.put(`https://sycures-api.onrender.com/api/admin/users/${userId}`, updatedUserData);
    
    // Exit edit mode after successful save
    setEditModeRowId(null);
    
    // Optionally, you can fetch the updated user list after saving to ensure the UI reflects the changes
    const response = await axios.get("https://sycures-api.onrender.com/api/admin/users");
    setUsers(response.data);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Function to cancel edit
const handleCancelEdit = () => {
  setEditModeRowId(null);
  // If you need to revert any changes made during edit, you may need to reset the user data to its original state
};

// Function to handle delete action
const handleDelete = async (userId) => {
  try {
    // Send a request to your backend to delete the user with the provided ID
    await axios.delete(`https://sycures-api.onrender.com/api/admin/users/${userId}`);
    // After successful deletion, fetch the updated user list
    const response = await axios.get("https://sycures-api.onrender.com/api/admin/users");
    setUsers(response.data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  return (
    <div className="containerAdmin">
      <button
        className="backButtonForgotPassword"
        onClick={() => navigate("/login")}
      />
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
            <th onClick={() => handleSort("name")}>
              Name <FaSort />
            </th>
            <th onClick={() => handleSort("age")}>
              Age <FaSort />
            </th>
            <th onClick={() => handleSort("course")}>
              Course <FaSort />
            </th>
            <th onClick={() => handleSort("position")}>
              Position <FaSort />
            </th>
            <th onClick={() => handleSort("email")}>
              Email <FaSort />
            </th>
            <th onClick={() => handleSort("password")}>
              Password <FaSort />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
{sortedUsers.map((user) => (
  <tr key={user._id}>
    <td>{editModeRowId === user._id ? <input type="text" value={user.name} onChange={(e) => handleEditChange(e, user._id, 'name')} /> : user.name}</td>
    <td>{editModeRowId === user._id ? <input type="text" value={user.age} onChange={(e) => handleEditChange(e, user._id, 'age')} /> : user.age}</td>
    <td>{editModeRowId === user._id ? <input type="text" value={user.course} onChange={(e) => handleEditChange(e, user._id, 'course')} /> : user.course}</td>
    <td>{editModeRowId === user._id ? <input type="text" value={user.position} onChange={(e) => handleEditChange(e, user._id, 'position')} /> : user.position}</td>
    <td>{editModeRowId === user._id ? <input type="text" value={user.email} onChange={(e) => handleEditChange(e, user._id, 'email')} /> : user.email}</td>
    <td>
      {user.password.length > 10
      ? user.password.slice(0, 15) + "..."
      : user.password}
    </td>
    <td>
      {editModeRowId === user._id ? 
        <React.Fragment>
          <button onClick={() => handleSave(user._id)}>Save</button>
          <button onClick={() => handleCancelEdit()}>Cancel</button>
        </React.Fragment>
      : 
        <React.Fragment>
          <button onClick={() => handleEdit(user._id)}>Edit</button>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </React.Fragment>
      }
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
            <th onClick={() => handleSort("name")}>
              Name <FaSort />
            </th>
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
            <th>Category Skill 4 Best Time</th>\{" "}
          </tr>
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
            <th onClick={() => handleSort("name")}>
              Name <FaSort />
            </th>
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
