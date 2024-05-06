import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GraphStat.css";
import axios from "axios";

function GraphStat() {
  const { userId } = useParams();
  const [pointACy, setPointACy] = useState(50);
  const [pointBCx, setPointBCx] = useState(50);
  const [pointCCy, setPointCCy] = useState(50);
  const [pointDCx, setPointDCx] = useState(50);

  useEffect(() => {
    const fetchWinRates = async () => {
      try {
        const basicComputerMobileSkillResponse = await axios.get(
          `https://sycures-api-0wof.onrender.com/api/user/${userId}/winrate?category=Basic Computer and Mobile Skill`
        );
        const winRateBasic = parseFloat(
          basicComputerMobileSkillResponse.data.winRate
        );
        const mappedWinRateBasic =
          ((winRateBasic - 0) * (100 - 0)) / (100 - 0) + 0;
        const mappedPointACy =
          ((mappedWinRateBasic - 0) * (0 - 50)) / (100 - 0) + 50;

        setPointACy(mappedPointACy);
      } catch (error) {
        console.error("Error fetching win rates:", error);
      }
    };

    fetchWinRates();
  }, [userId]);

  useEffect(() => {
    const fetchWinRates = async () => {
      try {
        const internetSkillResponse = await axios.get(
          `https://sycures-api-0wof.onrender.com/api/user/${userId}/winrate?category=Internet Skill`
        );
        const winRateInternet = parseFloat(internetSkillResponse.data.winRate);
        const mappedWinRateInternet =
          ((winRateInternet - 0) * (100 - 0)) / (100 - 0) + 0;
        const mappedPointBCx =
          ((mappedWinRateInternet - 0) * (100 - 50)) / (100 - 0) + 50;

        setPointBCx(mappedPointBCx);
      } catch (error) {
        console.error("Error fetching win rates:", error);
      }
    };
    fetchWinRates();
  }, [userId]);

  useEffect(() => {
    const fetchWinRates = async () => {
      try {
        const communicationSkillResponse = await axios.get(
          `https://sycures-api-0wof.onrender.com/api/user/${userId}/winrate?category=Communication Skill`
        );
        const winRateCommunication = parseFloat(
          communicationSkillResponse.data.winRate
        );
        const mappedWinRateCommunication =
          ((winRateCommunication - 0) * (100 - 0)) / (100 - 0) + 0;
        const mappedPointCCy =
          ((mappedWinRateCommunication - 0) * (100 - 50)) / (100 - 0) + 50;

        setPointCCy(mappedPointCCy);
      } catch (error) {
        console.error("Error fetching win rates:", error);
      }
    };
    fetchWinRates();
  }, [userId]);

  useEffect(() => {
    const fetchWinRates = async () => {
      try {
        const informationLiteracySkillResponse = await axios.get(
          `https://sycures-api-0wof.onrender.com/api/user/${userId}/winrate?category=Information Literacy Skill`
        );
        const winRateInformation = parseFloat(
          informationLiteracySkillResponse.data.winRate
        );
        const mappedWinRateInformation =
          ((winRateInformation - 0) * (100 - 0)) / (100 - 0) + 0;
        const mappedPointDCx =
          ((mappedWinRateInformation - 0) * (0 - 50)) / (100 - 0) + 50;

        setPointDCx(mappedPointDCx);
      } catch (error) {
        console.error("Error fetching win rates:", error);
      }
    };
    fetchWinRates();
  }, [userId]);

  return (
    <div className="div1">
      <div className="div2">
        <svg className="svg1">
          <line x1="0" y1="50%" x2="100%" y2="50%" className="linestyle1" />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="linestyle2" />

          <circle className="dot" cx="50%" cy={`${pointACy}%`} r="3" />
          <circle className="dot" cx={`${pointBCx}%`} cy="50%" r="3" />
          <circle className="dot" cx="50%" cy={`${pointCCy}%`} r="3" />
          <circle className="dot" cx={`${pointDCx}%`} cy="50%" r="3" />

          <line
            className="linestyle3"
            x1="50%"
            y1={`${pointACy}%`}
            x2={`${pointBCx}%`}
            y2="50%"
          />
          <line
            className="linestyle4"
            x1={`${pointBCx}%`}
            y1="50%"
            x2="50%"
            y2={`${pointCCy}%`}
          />
          <line
            className="linestyle5"
            x1="50%"
            y1={`${pointCCy}%`}
            x2={`${pointDCx}%`}
            y2="50%"
          />
          <line
            className="linestyle6"
            x1={`${pointDCx}%`}
            y1="50%"
            x2="50%"
            y2={`${pointACy}%`}
          />

          <text
            className="textstyle1"
            x="-7%"
            y="51%"
            dominantBaseline="middle"
          >
            D
          </text>
          <text
            className="textstyle2"
            x="102%"
            y="51%"
            dominantBaseline="middle"
          >
            B
          </text>
          <text
            className="textstyle3"
            x="48%"
            y="-3%"
            dominantBaseline="baseline"
          >
            A
          </text>
          <text
            className="textstyle4"
            x="48%"
            y="103%"
            dominantBaseline="hanging"
          >
            C
          </text>

          <text
            className="textstyle5"
            x="50%"
            y="2%"
            dominantBaseline="baseline"
          >
            100%
          </text>
          <text
            className="textstyle5"
            x="50%"
            y="13%"
            dominantBaseline="baseline"
          >
            80%
          </text>
          <text
            className="textstyle5"
            x="50%"
            y="23%"
            dominantBaseline="baseline"
          >
            60%
          </text>
          <text
            className="textstyle5"
            x="50%"
            y="34%"
            dominantBaseline="baseline"
          >
            40%
          </text>
          <text
            className="textstyle5"
            x="50%"
            y="45%"
            dominantBaseline="baseline"
          >
            20%
          </text>
          <text
            className="textstyle5"
            x="50%"
            y="50%"
            dominantBaseline="baseline"
          >
            0%
          </text>
          <text
            className="textstyle6"
            x="50%"
            y="-98%"
            dominantBaseline="middle"
          >
            100%
          </text>
          <text
            className="textstyle6"
            x="50%"
            y="-87%"
            dominantBaseline="middle"
          >
            80%
          </text>
          <text
            className="textstyle6"
            x="50%"
            y="-77%"
            dominantBaseline="middle"
          >
            60%
          </text>
          <text
            className="textstyle6"
            x="50%"
            y="-66%"
            dominantBaseline="middle"
          >
            40%
          </text>
          <text
            className="textstyle6"
            x="50%"
            y="-55%"
            dominantBaseline="middle"
          >
            20%
          </text>
        </svg>

        <div className="div3">
          <svg className="svg1"></svg>
        </div>
        <div className="div4">
          <svg className="svg1"></svg>
        </div>
        <div className="div5">
          <svg className="svg1"></svg>
        </div>
        <div className="div6">
          <svg className="svg1"></svg>
        </div>
      </div>
    </div>
  );
}

export default GraphStat;
