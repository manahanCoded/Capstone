import checkAdmin from "@/Configure/checkAdmin";
import checkModule from "@/Configure/checkModule";
import checkScore from "@/Configure/checkScore";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Reviewer() {
    const [checkUser, setCheckUser] = useState<checkAdmin | null>(null);
    const [checkModules, setCheckModules] = useState<checkModule[]>([]);
    const [checkScores, setCheckScores] = useState<checkScore[]>([]);

    // Fetch user profile
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("http://localhost:5000/api/user/profile", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setCheckUser(data);
        }
        fetchUser();
    }, []);

    // Fetch all modules
    useEffect(() => {
        async function getModule() {
            try {
                const res = await axios.get("http://localhost:5000/api/module/allModule");
                setCheckModules(res.data.listall);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        }
        getModule();
    }, []);

    // Fetch user scores based on the fetched user
    useEffect(() => {
        if (checkUser) {
            async function getScore() {
                try {
                    const res = await axios.get(`http://localhost:5000/api/module/get-user-score/${checkUser?.id}`);
                    console.log("Fetched scores data:", res.data);
                    setCheckScores(res.data);
                } catch (error) {
                    console.error("Error fetching scores:", error);
                }
            }
            getScore();
        }
    }, [checkUser]);

    // Render feedback for each module
    const renderFeedback = () => {
        return checkModules.map((module) => {
            const moduleScore = checkScores.find(score => score.module_id === module.id);

            if (moduleScore) {
                return (
                    <div key={module.id} className="h-full w-full  p-4 rounded-lg  ">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2"
                                dangerouslySetInnerHTML={{ __html: module.title }}></h2>
                            <p className=""
                                dangerouslySetInnerHTML={{ __html: module.description }}></p>

                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                            <div>
                                <p><strong>Score:</strong> {moduleScore.score} / {moduleScore.prefect_score}</p>
                                <p><strong>Attempt Number:</strong> {moduleScore.attempt_number}</p>
                                <p><strong>Passed:</strong> {moduleScore.passed ? "Yes" : "No"}</p>
                            </div>
                            <p><strong>Feedback:</strong></p>
                            <div className="feedback-section">
                                {moduleScore.feedback.split("Question: ").map((feedbackItem, index) => {
                                    if (!feedbackItem.trim()) return null;

                                    const [question, rest] = feedbackItem.split("Your Answer:");
                                    const [userAnswer, rest2] = rest.split("Correct Answer:");
                                    const [correctAnswer, explanation] = rest2.split("Explanation:");

                                    return (
                                        <div key={index} className="feedback-item mb-4 border-b pb-2">
                                            <p><strong>Question:</strong> {question.trim()}</p>
                                            <p><strong>Your Answer:</strong> {userAnswer.trim()}</p>
                                            <p><strong>Correct Answer:</strong> {correctAnswer.trim()}</p>
                                            <p><strong>Explanation:</strong> {explanation.trim()}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={module.id} className="w-full p-4 rounded-lg  ">
                        <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
                        <p className="text-gray-600 mb-2">{module.description}</p>
                        <p className="text-red-500">No score or feedback available for this module.</p>
                    </div>
                );
            }
        });
    };

    return (
        <div className="w-full flex flex-wrap justify-evenly gap-6 py-4 overflow-y-auto h-full">
            <h1 className="text-2xl font-bold mb-6">Reviewer Section</h1>
            {renderFeedback()}
        </div>
    );
}