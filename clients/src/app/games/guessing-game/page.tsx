'use client';

import { useEffect, useState, useRef, ChangeEvent } from 'react';
import './guessing-game.css';
import { guessWordList } from './wordGuess';

interface WordObject {
  word: string;
  hint: string;
}

export default function GuessingGame() {
  const [guessWord, setGuessWord] = useState<string>('');
  const [guessWordLength, setGuessWordLength] = useState<number[]>([]);
  const [hint, setHint] = useState<string>('');
  const [displayedLetters, setDisplayedLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [guessCount, setGuessCount] = useState<number>(8);

  const inputRef = useRef<HTMLInputElement>(null);

  const randomWord = () => {
    const ranObj: WordObject = guessWordList[Math.floor(Math.random() * guessWordList.length)];
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setGuessCount(8);
    setGuessWord(ranObj.word);
    setHint(ranObj.hint);
    const arrayLength = Array.from({ length: ranObj.word.length }, (_, index) => index);
    setDisplayedLetters(Array(ranObj.word.length).fill(''));
    setGuessWordLength(arrayLength);
    console.log(ranObj.word);
  };

  const initGame = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value.toLowerCase();

    if (
      key.match(/^[a-z]$/) &&
      !incorrectLetters.includes(key) &&
      !correctLetters.includes(key)
    ) {
      if (guessWord.includes(key)) {
        const updatedLetters = [...displayedLetters];
        const updatedCorrectLetters = [...correctLetters, key];
        setCorrectLetters(updatedCorrectLetters);

        for (let i = 0; i < guessWord.length; i++) {
          if (guessWord[i] === key) {
            updatedLetters[i] = key;
          }
        }
        setDisplayedLetters(updatedLetters);
      } else {
        const updatedIncorrectLetters = [...incorrectLetters, key];
        setIncorrectLetters(updatedIncorrectLetters);
        setGuessCount((prevCount) => prevCount - 1);
      }
    }

    e.target.value = '';
  };

  useEffect(() => {
    randomWord();

    const handleKeyDown = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const uniqueSet = new Set(guessWord);
    const uniqueArray = Array.from(uniqueSet);

    if (guessWord && correctLetters.length === uniqueArray.length) {
      setTimeout(() => {
        alert(`Congrats! You found the word: ${guessWord.toUpperCase()}`);
        randomWord();
      }, 500);
    } else if (guessCount < 1) {
      setTimeout(() => {
        alert(`Game over! The word was: ${guessWord.toUpperCase()}`);
        randomWord();
      }, 500);
    }
  }, [correctLetters, guessCount, guessWord]);

  return (   
     <div className="flex items-center justify-center mt-20">
    <div className="wrapper w-[580px] bg-white rounded-xl">
      <h1 className="text-2xl font-medium py-5 px-6">Guess the Word</h1>
      <div className="content">
        <input
          ref={inputRef}
          type="text"
          className="typing-input -z-30 absolute opacity-0"
          onChange={(e) => initGame(e)}
          maxLength={1}
        />
        <div className="inputs flex flex-wrap justify-center">
          {guessWordLength.map((_, index) => (
            <input
              key={index}
              type="text"
              value={guessCount < 1 ? guessWord[index] : displayedLetters[index]}
              disabled
            />
          ))}
        </div>
        <div className="details">
          <p className="hint">
            Hint: <span>{hint}</span>
          </p>
          <p className="guess-left">
            Remaining Guesses: <span>{guessCount}</span>
          </p>
          <p className="wrong-letter">
            Wrong letters: <span>{incorrectLetters.join(', ')}</span>
          </p>
        </div>
        <button
          className="reset-btn w-[100%] text-xl py-4 px-0 outline-none border-none cursor-pointer text-white bg-sky-400 rounded-md"
          onClick={randomWord}
        >
          Reset Game
        </button>
      </div>
    </div>
    </div>
  );
}
