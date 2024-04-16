import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { FaSort } from "react-icons/fa";

function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [userStatus, setUserStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy1, setSortBy1] = useState(null);
  const [sortDirection1, setSortDirection1] = useState("asc");
  const [sortBy2, setSortBy2] = useState(null);
  const [sortDirection2, setSortDirection2] = useState("asc");
  // const [sortBy3, setSortBy3] = useState(null);
  // const [sortDirection3, setSortDirection3] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModeRowId, setEditModeRowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://sycures-api.onrender.com/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://sycures-api.onrender.com/api/admin/user-status");
  //       setUserStatus(response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Sort users in table 1
  const sortedUsers1 = users.slice().sort((a, b) => {
    if (!sortBy1) return 0;
    const aValue = a[sortBy1];
    const bValue = b[sortBy1];
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * (sortDirection1 === "asc" ? 1 : -1);
    } else {
      return (aValue - bValue) * (sortDirection1 === "asc" ? 1 : -1);
    }
  });

  // Sort users in table2
  const sortedUsers2 = users.slice().sort((a, b) => {
    if (!sortBy2) return 0;
    const aValue = a[sortBy2];
    const bValue = b[sortBy2];
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * (sortDirection2 === "asc" ? 1 : -1);
    } else {
      return (aValue - bValue) * (sortDirection2 === "asc" ? 1 : -1);
    }
  });

  // Sort users in table3
  // const sortedUserStatus = userStatus.slice().sort((a, b) => {
  //   if (!sortBy3) return 0;
  //   const aValue = a[sortBy3];
  //   const bValue = b[sortBy3];
  //   if (typeof aValue === "string") {
  //     return aValue.localeCompare(bValue) * (sortDirection3 === "asc" ? 1 : -1);
  //   } else {
  //     return (aValue - bValue) * (sortDirection3 === "asc" ? 1 : -1);
  //   }
  // }); 

  // Handle sorting in table1
  const handleSort1 = (column) => {
    if (sortBy1 === column) {
      setSortDirection1(sortDirection1 === "asc" ? "desc" : "asc");
    } else {
      setSortBy1(column);
      setSortDirection1("asc");
    }
  };

  // Handle sorting in table2
  const handleSort2 = (column) => {
    if (sortBy2 === column) {
      setSortDirection2(sortDirection2 === "asc" ? "desc" : "asc");
    } else {
      setSortBy2(column);
      setSortDirection2("asc");
    }
  };

  // Handle sorting in table 3
  // const handleSort3 = (column) => {
  //   if (sortBy3 === column) {
  //     setSortDirection3(sortDirection3 === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortBy3(column);
  //     setSortDirection3("asc");
  //   }
  // };

  // Pagination
  const usersPerPage = 15;
  const totalPages = Math.ceil(sortedUsers1.length / usersPerPage);

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
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
    await axios.put(`https://sycures-api.onrender.com/api/admin/users/${userId}`, updatedUserData);
    
    setEditModeRowId(null);
    
    const response = await axios.get("https://sycures-api.onrender.com/api/admin/users");
    setUsers(response.data);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Function to cancel edit
const handleCancelEdit = () => {
  setEditModeRowId(null);
};

// Function to handle delete action
const handleDelete = async (userId) => {
  try {
    await axios.delete(`https://sycures-api.onrender.com/api/admin/users/${userId}`);
    const response = await axios.get("https://sycures-api.onrender.com/api/admin/users");
    setUsers(response.data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  // Function to handle database deletion
  const handleDeleteDatabase = () => {
    if (window.confirm("Are you sure you want to delete the database?")) {
      console.log("Deleting database...");
    }
  };

  // Function to handle site deletion
  const handleDeleteSite = () => {
    if (window.confirm("Are you sure you want to delete this site?")) {
      console.log("Deleting site...");
    }
  };

  return (
    <div className="containerAdmin">
      <button
        className="backButtonAdmin"
        onClick={() => navigate("/login")}
      />
      
      <h1>User's Information</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort1("name")}>
              Name <FaSort />
            </th>
            <th onClick={() => handleSort1("age")}>
              Age <FaSort />
            </th>
            <th onClick={() => handleSort1("course")}>
              Course <FaSort />
            </th>
            <th onClick={() => handleSort1("position")}>
              Position <FaSort />
            </th>
            <th onClick={() => handleSort1("email")}>
              Email <FaSort />
            </th>
            <th onClick={() => handleSort1("password")}>
              Password <FaSort />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers1.map((user) => (
            <tr key={user._id}>
              <td>{editModeRowId === user._id ? <input type="text" value={user.name} onChange={(e) => handleEditChange(e, user._id, 'name')} /> : user.name}</td>
              <td>{editModeRowId === user._id ? <input type="text" value={user.age} onChange={(e) => handleEditChange(e, user._id, 'age')} /> : user.age}</td>
              <td>{editModeRowId === user._id ? <input type="text" value={user.course} onChange={(e) => handleEditChange(e, user._id, 'course')} /> : user.course}</td>
              <td>{editModeRowId === user._id ? <input type="text" value={user.position} onChange={(e) => handleEditChange(e, user._id, 'position')} /> : user.position}</td>
              <td>{editModeRowId === user._id ? <input type="text" value={user.email} onChange={(e) => handleEditChange(e, user._id, 'email')} /> : user.email}</td>
              <td>
                {user.password.length > 10 ? user.password.slice(0, 15) + "..." : user.password}
              </td>
              <td className="action">
                {editModeRowId === user._id ? 
                  <>
                    <button onClick={() => handleSave(user._id, user)}>Save</button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </>
                : 
                  <>
                    <button onClick={() => handleEdit(user._id)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </>
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

      <h1>User's Performance</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort2("name")}>
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
            <th>Category Skill 4 Best Time</th>{" "}
          </tr>
        </thead>
        <tbody>
          {sortedUsers2
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

      {/* <h1>User's Statistic</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead className="th">
          <tr className="tr">
            <th onClick={() => handleSort3("name")}>
              Name <FaSort />
            </th>
            <th>Total Attempts</th>
            <th>Average Score</th>
            <th>Average Time</th>
            <th>Is Wheel Spinning</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserStatus
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
      </div> */}

      <h1>Delete sycures database</h1>
      <button className="buttonDelete" onClick={handleDeleteDatabase}>Delete database</button>

      <h1>Delete sycures site</h1>
      <button className="buttonDelete" onClick={handleDeleteSite}>Delete this site</button>
    </div>
  );
}

export default AdminPage;
