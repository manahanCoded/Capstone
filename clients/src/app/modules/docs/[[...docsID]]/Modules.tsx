"use client";

import React, { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import checkModule from "@/Configure/checkModule";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import axios from "axios";
import QuizItem from "@/Configure/quizItem";
import { useToast } from "@/hooks/use-toast";
import Dashboard from "@/components/Dashboard";

interface ModuleProps {
  module: checkModule | null;
}

function Modules({ module }: ModuleProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [itemQuiz, setItemQuiz] = useState<QuizItem[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]); // New state to track wrong answers

  const { toast } = useToast();

  useEffect(() => {
    if (Array.isArray(module)) {
      setPosts(module);
    } else if (module) {
      setPosts([module]);
    }
  }, [module]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (posts.length > 0) {
        try {
          const title = posts[0].title;
          const response = await axios.get(
            `http://localhost:5000/api/module/allQuestions?title=${encodeURIComponent(title)}`
          );
          setItemQuiz(response.data); // Ensure you're setting the correct property of `response`
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };
    fetchQuestions();
  }, [posts]);

  const handleAnswerSelection = (selected: "A" | "B" | "C" | "D") => {
    setAnswer(selected);
    setSelectedAnswer(selected);
  };

  const handleNextQuestion = () => {
    if (itemQuiz[currentQuizIndex].correct_option === answer) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
      toast({
        title: "Correct Answer",
        className: "bg-green-600 text-white",
      });
    } else {
      setIsAnswerCorrect(false);
      toast({
        title: "Incorrect",
        className: "bg-red-600 text-white",
      });

      // Store the wrong answer
      const wrongAnswer = {
        question: itemQuiz[currentQuizIndex].question_text,
        correct_answer: itemQuiz[currentQuizIndex].correct_option,
        user_answer: answer,
      };
      setWrongAnswers((prev) => [...prev, wrongAnswer]); // Add the wrong answer to the list
    }

    setAnswered(true);
    setSelectedAnswer("");

    if (currentQuizIndex < itemQuiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setAnswer("");
      setIsAnswerCorrect(null);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: `Quiz Finished! Your score: ${score}/${itemQuiz.length}`,
        className: "bg-blue-600 text-white",
      });
    }
  };

  const showBackQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setAnswered(false);
      setAnswer("");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setAnswer("");
    setIsAnswerCorrect(null);
    setScore(0);
    setQuizCompleted(false);
    setAnswered(false);
    setSelectedAnswer("");
    setWrongAnswers([]); // Reset the wrong answers
  };

  return (
    <div className="mt-14">
      <MaxWidthWrapper className="py-14">
        <div className="lg:w-3/5 md:w-4/5 m-auto">
          {posts.map((post) => (
            <div key={post.id}>
              <h1 className="flex flex-col font-extrabold text-5xl">
                <span className="font-bold text-red-900 text-lg">Introducing</span>{" "}
                {post.title}
              </h1>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: post.information }}
              />
            </div>
          ))}
          {quizCompleted && <Dashboard wrongAnswers={wrongAnswers} />}
          <button
            className="w-[70%] h-10 m-auto mt-10 flex items-center justify-center font-semibold text-white rounded-md bg-red-800 hover:bg-red-900"
            onClick={() => setOpenQuiz(true)}
          >
            <PsychologyAltIcon />
            Quiz
          </button>

          {openQuiz ? (
            <div className="fixed inset-0 z-40 bg-[#2a212190]">
              <MaxWidthWrapper>
                <section className="lg:w-[60%] h-screen mx-auto flex items-center justify-center backdrop-blur-sm">
                  {/* Quiz Question and Options */}
                  {quizCompleted === false ? (
                    <div className="w-full h-1/2 flex flex-col justify-between p-4 rounded-lg bg-white">
                      <div className="w-full flex flex-row justify-between items-center">
                        <h1>Question {currentQuizIndex + 1}</h1>
                        <button
                          onClick={() => setOpenQuiz(false)}
                          className="text-red-600"
                        >
                          CLOSE
                        </button>
                      </div>
                      <div className="flex flex-col gap-4 items-center">
                        <p className="text-lg">{itemQuiz[currentQuizIndex].question_text}</p>
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                          <button
                            onClick={() => handleAnswerSelection("A")}
                            disabled={answered}
                            className={`lg:text-base md:text-sm text-xs border-[1px] border-gray-400 rounded-lg px-4 py-2 hover:text-white hover:bg-red-600 ${selectedAnswer === "A" ? "bg-red-600" : ""
                              }`}
                          >
                            A. {itemQuiz[currentQuizIndex].option_a}
                          </button>
                          <button
                            onClick={() => handleAnswerSelection("B")}
                            disabled={answered}
                            className={`lg:text-base md:text-sm text-xs border-[1px] border-gray-400 rounded-lg px-4 py-2 hover:text-white hover:bg-red-600 ${selectedAnswer === "B" ? "bg-red-600" : ""
                              }`}
                          >
                            B. {itemQuiz[currentQuizIndex].option_b}
                          </button>
                          <button
                            onClick={() => handleAnswerSelection("C")}
                            disabled={answered}
                            className={`lg:text-base md:text-sm text-xs border-[1px] border-gray-400 rounded-lg px-4 py-2 hover:text-white hover:bg-red-600 ${selectedAnswer === "C" ? "bg-red-600" : ""
                              }`}
                          >
                            C. {itemQuiz[currentQuizIndex].option_c}
                          </button>
                          <button
                            onClick={() => handleAnswerSelection("D")}
                            disabled={answered}
                            className={`lg:text-base md:text-sm text-xs border-[1px] border-gray-400 rounded-lg px-4 py-2 hover:text-white hover:bg-red-600 ${selectedAnswer === "D" ? "bg-red-600" : ""
                              }`}
                          >
                            D. {itemQuiz[currentQuizIndex].option_d}
                          </button>
                        </div>
                      </div>

                      {/* Next and Back Buttons */}
                      <div className="w-full flex flex-row justify-end gap-4 items-center text-sm">
                        <button
                          onClick={showBackQuiz}
                          className="border-2 border-black rounded-md py-2 px-4"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNextQuestion}
                          className="border-2 bg-black border-black text-white rounded-md py-2 px-4 hover:bg-green-600 hover:border-green-600"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-1/2 flex flex-col justify-between p-4 rounded-lg bg-white overflow-y-auto">
                      <div className="w-full flex flex-row justify-between items-center">
                        <h2 className="text-lg font-bold mb-4">Quiz Finished!</h2>
                        <button
                          onClick={() => setOpenQuiz(false)}
                          className="text-red-600"
                        >
                          CLOSE
                        </button>
                      </div>
                      <p className="mb-4 text-lg">
                        Your score: {score}/{itemQuiz.length}
                      </p>
                      <h3 className="text-lg font-semibold">Correct Answers:</h3>
                      <ul className="mt-4 space-y-2">
                        {itemQuiz.map((quiz, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-8 font-bold">{index + 1}.</span>
                            <span className="flex-1">{quiz.question_text}</span>
                            <span
                              className={`ml-4 ${quiz.correct_option === answer
                                  ? "text-green-600"
                                  : "text-red-600"
                                }`}
                            >
                              Correct Answer: {quiz.correct_option}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Display wrong answers */}
                      <h3 className="mt-4 text-lg font-semibold">Wrong Answers:</h3>
                      <ul className="mt-2 space-y-2">
                        {wrongAnswers.map((wrongAnswer, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-8 font-bold">{index + 1}.</span>
                            <span className="flex-1">{wrongAnswer.question}</span>
                            <span className="ml-4 text-red-600">
                              Your Answer: {wrongAnswer.user_answer}, Correct Answer: {wrongAnswer.correct_answer}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Restart Quiz Button */}
                      <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => setOpenQuiz(false)}
                        className="mt-8 border-2 border-black hover:bg-black hover:text-white rounded-md py-2 px-4  "
                      >
                        More Info
                      </button>

                      <button
                        onClick={handleRestartQuiz}
                        className="mt-8 border-2 bg-black text-white rounded-md py-2 px-4 hover:bg-green-600 hover:border-green-600"
                      >
                        Restart Quiz
                      </button>
                      </div>
                    </div>
                  )}
                </section>
              </MaxWidthWrapper>
            </div>
          ) : null}

        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Modules;
