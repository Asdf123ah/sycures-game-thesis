import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./Modal/LoadingModal";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showModalPassChangeSuccess, setShowModalPassChangeSuccess] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailNotFound(false);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://sycures-api.onrender.com/api/reset-password",
        { email, newPassword }
      );
      const { data } = response;

      if (data && data.userId) {
        console.log("User ID:", data.userId);
        setResetSuccess(true);
      } else {
        setEmailNotFound(true);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setEmailNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setShowModalPassChangeSuccess(false);
    try {
      setIsLoading(true);
      await axios.post("https://sycures-api.onrender.com/api/reset-password", {
        email,
        newPassword,
      });
      setResetSuccess(false);
      setShowModalPassChangeSuccess(true);
      setTimeout(() => {
        navigate(`/login`);
      }, 1000);
    } catch (error) {
      console.error("Error setting new password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="containerForgotPass">
      <button
        className="backButtonForgotPassword"
        onClick={handleBackButtonClick}
      />
      <div className="whiteBoxForgotPass">
        <div className="contentForgotPass">
          <h1>Forgot Password</h1>
          {!resetSuccess ? (
            <>
              <p>
                Please enter your email address below to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  placeholder="Your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  {isLoading ? ( <><LoadingModal /> Reset my password</> ) : ("Reset my password")}
                </button>
              </form>
            </>
          ) : (
            <>
              <p>
                To reset your password, kindly input your new password below.
              </p>
              <form onSubmit={handleNewPasswordSubmit}>
                <input
                  type="password"
                  value={newPassword}
                  placeholder="Your new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit">
                  {isLoading ? ( <><LoadingModal /> Set my password</> ) : ("Set my password")}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      {showModalPassChangeSuccess && (
        <div className="modal">
          <div className="modal-content-passchangesuccess">
            <span
              className="close"
              onClick={() => setShowModalPassChangeSuccess(false)}
            >
              &times;
            </span>
            <p>Password has been updated successfully.</p>
          </div>
        </div>
      )}
      {emailNotFound && (
        <div className="modal">
          <div className="modal-content-noemailfound">
            <span className="close" onClick={() => setEmailNotFound(false)}>
              &times;
            </span>
            <p>Email doesn't exist. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
