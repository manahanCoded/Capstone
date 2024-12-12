import React, { useState, useEffect } from "react";
import axios from "axios";

interface WrongAnswer {
  question: string;
  user_answer: string;
  correct_answer: string;
  explanation?: string; 
}

interface DashboardProps {
  wrongAnswers: WrongAnswer[];
  onSetFeedback: (feedback: string) => void;
  isQuizCompleted: boolean; 
}
const Dashboard: React.FC<DashboardProps> = ({ wrongAnswers, onSetFeedback, isQuizCompleted }) => {
  const [aiResponse, setAiResponse] = useState<WrongAnswer[]>([]);

  useEffect(() => {
    if (!isQuizCompleted) return;

    const fetchAiResponse = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/dashboard/allDashboards", {
          wrongAnswers: wrongAnswers,
        });
        const aiData: WrongAnswer[] = response.data; 
        setAiResponse(aiData);

        const feedback = aiData
          .map((answer: WrongAnswer) =>
            `Question: ${answer.question}\nYour Answer: ${answer.user_answer}\nCorrect Answer: ${answer.correct_answer}\nExplanation: ${answer.explanation || "N/A"}`
          )
          .join("\n\n");
        onSetFeedback(feedback); 
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    };

    fetchAiResponse();
  }, [ isQuizCompleted]);

  return (
    <div className="mt-14">
      {isQuizCompleted?
      <div>
      <h2>Your Incorrect Answers:</h2>
     <ul className="space-y-4">
  {aiResponse.length > 0 ? (
    aiResponse.map((answer, index) => (
      <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all">
        <div className="mb-2">
          <strong className="text-lg font-semibold text-gray-800">Question:</strong>
          <p className="text-gray-700 mt-1">{answer.question}</p>
        </div>
        <div className="mb-2">
          <strong className="text-lg font-semibold text-gray-800">Your Answer:</strong>
          <p className="text-gray-700 mt-1">{answer.user_answer}</p>
        </div>
        <div className="mb-2">
          <strong className="text-lg font-semibold text-gray-800">Correct Answer:</strong>
          <p className="text-gray-700 mt-1">{answer.correct_answer}</p>
        </div>
        {answer.explanation && (
          <div className="mt-2">
            <strong className="text-lg font-semibold text-gray-800">Explanation:</strong>
            <p className="text-gray-700 mt-1">{answer.explanation}</p>
          </div>
        )}
      </li>
    ))
  ) : (
    <p className="text-gray-500 text-center">Loading explanations...</p>
  )}
</ul>
        </div>: null}
    </div>
  );
};

export default Dashboard;
