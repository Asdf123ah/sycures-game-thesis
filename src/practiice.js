import React, { useState } from "react";
import './practiice.css';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import SycuresLogoLogin from "./Photos/SycuresLogoLogin.png";
import SyGIF from "./Photos/sy.gif";
import LoadingLoginModal from "./Modal/LoadingLoginModal";

function Practiice() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalAlreadyUse, setShowModalAlreadyUse] = useState(false);
    const [showModalInvalid, setShowModalInvalid] = useState(false);
    const [showModalLoginSuccess, setShowModalLoginSuccess] = useState(false);
  
    const handleButtonClick = (destination) => {
      navigate(destination);
    };
  
    const Login = ({ onRegisterClick }) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isLoading, setIsLoading] = useState(false);
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModalInvalid(false);
        setIsLoading(true);
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://sycures-api-0wof.onrender.com/api/user/login",
            {
              email: email,
              password: password,
            }
          );
  
          const userData = response.data;
  
          if (userData.position === "student") {
            setShowModalLoginSuccess(true);
            setTimeout(() => {
              navigate(`/category-selection/${userData._id}`);
            }, 1000);
          } else if (userData.position === "admin") {
            navigate(`/admin-page`);
          }
        } catch (error) {
          setShowModalInvalid(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      return (
        <>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-container">
              <label htmlFor="email" className="label-email">
                Enter your Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder={"Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-style-email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label-password">
                Enter your Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder={"Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-style-password"
                required
              />
            </div>
            <button className="start-button-style-login" type="submit">
            {isLoading ? ( <><LoadingLoginModal /> Login</> ) : ("Login")}
            </button>
          </form>
          <div className="forgot-password">
            <Link to="/forgot-password" style={{ color: "#FFFFFF" }}>
              Forgot Password?
            </Link>
          </div>
          <p className="p-login">
            Don't have an account?{" "}
            <u>
              <b
                className="b-register"
                onClick={onRegisterClick}
                style={{ color: "#2CCCD7" }}
              >
                Register
              </b>
            </u>
          </p>
        </>
      );
    };
  
    const Register = () => {
      const [name, setName] = useState("");
      const [birthDate, setBirthDate] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [course, setCourse] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [passwordMismatch, setPasswordMismatch] = useState(false);
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModalAlreadyUse(false);

        // Password validation: Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
          setIsLoading(true);
          const age = calculateAge(birthDate);
          const response = await axios.post(
            "https://sycures-api-0wof.onrender.com/api/user/register",
            {
              name: name,
              age: age,
              email: email,
              password: password,
              course: course,
            }
          );
  
          const savedUser = response.data;
  
          console.log("Register Successful!");
          console.log("User details:", {
            _id: savedUser._id,
          });
  
          setShowModalRegister(true);
          setActiveTab("login");
        } catch (error) {
          setShowModalAlreadyUse(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      return (
        <>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <label htmlFor="name" className="label-name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder={"Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-style-name"
                required
              />
              <div>
                <label htmlFor="birthDate" className="label-age">
                  Birth Date:
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-style-age"
                  required
                />
              </div>
              <div>
                <label htmlFor="course" className="label-course">
                  Course/Strand:
                </label>
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="input-style-course"
                  required
                >
                  <option value="">Select course</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                  <option value="TVL">TVL</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="label-regEmail">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={"Enter your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style-regEmail"
                  required
                />
              </div>
              <div>
                <label htmlFor="regPassword" className="label-regPass">
                  Password:
                </label>
                <input
                  type="password"
                  id="regPassword"
                  value={password}
                  placeholder={"Enter your password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style-regPass"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmRegPassword" className="label-confirmRegPass">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmRegPassword"
                  value={confirmPassword}
                  placeholder={"Confirm password"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMismatch(false);
                  }}
                  className={`input-style-confirmRegPass ${passwordMismatch ? 'input-error' : ''}`}
                  required
                />
                {passwordMismatch && <p className="error-message">Confirm password does not match</p>}
              </div>
              <button
                className="start-button-style-login"
                type="submit"
              >
                {isLoading ? ( <><LoadingLoginModal /> Register</> ) : ("Register")}
              </button>
            </div>
          </form>
        </>
      );
    };
  
    const handleRegisterSuccess = () => {
      setShowModalRegister(true);
    };
  
    return (
      <div className="containerLogin">
        <div className="upper-box">
          <img
            src={SycuresLogoLogin}
            alt="Sycures Logo Login"
            className="sycures-logo-login"
            onClick={() => navigate("/")}
            loading="eager"
          />
            <div
              className="button-about-login"
              onClick={() => handleButtonClick("/about")}
            >
              {" "}
              About
            </div>
            <div
              className="button-help-login"
              onClick={() => handleButtonClick("/help")}
            >
              Help
            </div>
            <div
              className="button-contact-login"
              onClick={() => handleButtonClick("/contact")}
            >
              Contact
            </div>
        </div>
        <div className="lower-box">
          <div>
            <img
              className="robot-login"
              src={SyGIF}
              alt="sy.gif"
              loading="eager"
            />
          </div>
          <div className="separator"></div>
          <div className="black-box"></div>
          <div className="darkblue-box">
            <div className="login-register-container">
              <div className="buttons-container">
                <button
                  className={`login-register-button ${
                    activeTab === "login" && "active"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`login-register-button ${
                    activeTab === "register" && "active"
                  }`}
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </button>
              </div>
              <div>
                <div className={`fade-${activeTab === "login" ? "in" : "out"}`}>
                  {activeTab === "login" && (
                    <Login onRegisterClick={() => setActiveTab("register")} />
                  )}
                </div>
                <div
                  className={`fade-${activeTab === "register" ? "in" : "out"}`}
                >
                  {activeTab === "register" && (
                    <Register onSuccess={handleRegisterSuccess} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModalRegister && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModalRegister(false)}>
                &times;
              </span>
              <p>Registration Successful! You can now login.</p>
            </div>
          </div>
        )}
        {showModalAlreadyUse && (
          <div className="modal">
            <div className="modal-content-already-use">
              <span
                className="close"
                onClick={() => setShowModalAlreadyUse(false)}
              >
                &times;
              </span>
              <p>Email is already in use. Please try another.</p>
            </div>
          </div>
        )}
        {showModalInvalid && (
          <div className="modal">
            <div className="modal-content-invalid">
              <span className="close" onClick={() => setShowModalInvalid(false)}>
                &times;
              </span>
              <p>Invalid email and password. Please try again.</p>
            </div>
          </div>
        )}
        {showModalLoginSuccess && (
          <div className="modal">
            <div className="modal-content-loginsuccess">
              <span
                className="close"
                onClick={() => setShowModalLoginSuccess(false)}
              >
                &times;
              </span>
              <p>You have successfully logged in.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }

export default Practiice;