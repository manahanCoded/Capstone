import React, { useState, useEffect } from "react";
import axios from "axios";

interface WrongAnswer {
  question: string;
  user_answer: string;
  correct_answer: string;
  explanation?: string; // explanation property to be populated by the AI
}

interface DashboardProps {
  wrongAnswers: WrongAnswer[];
}

const Dashboard: React.FC<DashboardProps> = ({ wrongAnswers }) => {
  const [aiResponse, setAiResponse] = useState<WrongAnswer[]>([]);

  useEffect(() => {
    const fetchAiResponse = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/dashboard/allDashboards", {
          wrongAnswers: wrongAnswers,
        });
        setAiResponse(response.data); // Set the AI response to the state
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    };

    if (wrongAnswers.length > 0) {
      fetchAiResponse(); // Fetch AI response if there are wrong answers
    }
  }, [wrongAnswers]);

  return (
    <div className="mt-14">
      <h2>Your Incorrect Answers:</h2>
      <ul>
        {aiResponse.length > 0 ? (
          aiResponse.map((answer, index) => (
            <li key={index}>
              <div>
                <strong>Question:</strong> {answer.question}
              </div>
              <div>
                <strong>Your Answer:</strong> {answer.user_answer}
              </div>
              <div>
                <strong>Correct Answer:</strong> {answer.correct_answer}
              </div>
              {answer.explanation && (
                <div>
                  <strong>Explanation:</strong> {answer.explanation}
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Loading explanations...</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
