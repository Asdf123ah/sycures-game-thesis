import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CategorySelection.css";
import { IoStatsChart } from "react-icons/io5";
import axios from "axios";
import BackModal from "./Modal/BackModal";
import sycuresLogo from "./Photos/gamePictureLogo.png";

function CategorySelection() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showBackModal, setShowBackModal] = useState(false);

  const categories = [
    "Basic Computer and Mobile Skill",
    "Internet Skill",
    "Communication Skill",
    "Information Literacy Skill",
  ];

  const handleCategoryClick = async (category) => {
    try {
      await axios.post(
        `https://sycures-api-0wof.onrender.com/api/user/updateCategories/${userId}`,
        {
          category: category,
        }
      );

      const categoryPath = category.toLowerCase().replace(/\s+/g, "-");

      navigate(`/${categoryPath}/${userId}`, {});
    } catch (error) {
      console.error("Error updating user categories:", error);
    }
  };

  const handleBackButtonClick = () => {
    setShowBackModal(true);
  };

  const handleCloseBackModal = () => {
    setShowBackModal(false);
  };

  const handleProceedToLoginForm = () => {
    handleCloseBackModal();
    navigate("/login");
  };

  const handleStatsButtonClick = () => {
    navigate(`/statistic/${userId}`);
  };

  return (
    <div className="containerCategorySelection">
      <button
        className="backButtonCategorySelection"
        onClick={handleBackButtonClick}
      />
      <img
        className="sycuresLogoGameCategorySelection"
        src={sycuresLogo}
        alt="Sycures Logo"
      />
      <div className="boxCategorySelectionBG">
        <div className="boxCategorySelection">
          <div className="popupInstruction">
            <p>Please choose one digital skill to start the game.</p>
          </div>
            <div className="rowCategorySelection">
              {categories.slice(0, 2).map((category) => (
                <button
                  key={category}
                  className="buttonCategorySelection"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="rowCategorySelection">
              {categories.slice(2, 4).map((category) => (
                <button
                  key={category}
                  className="buttonCategorySelection"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
        </div>
      </div>
      <button className="stats-button" onClick={handleStatsButtonClick}>
        <IoStatsChart className="stat-chart" />
        <br/>
        STATS
      </button>
      {showBackModal && (
        <BackModal
          onProceed={handleProceedToLoginForm}
          onClose={handleCloseBackModal}
        />
      )}
    </div>
  );
}

export default CategorySelection;
