import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiChevronRight, FiFlag, FiSkipForward } from 'react-icons/fi';

function Quiz({ questions, settings }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState(Array(questions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(settings.timePerQuestion * questions.length);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate('/results');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, questions.length]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results');
    }
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQuestion] = !newMarkedForReview[currentQuestion];
    setMarkedForReview(newMarkedForReview);
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl mb-4">
          <div className="card-body">
            <p className={`mb-4 text-${settings.fontSize}`}>{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`btn btn-outline w-full ${
                    userAnswers[currentQuestion] === option ? 'btn-active' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={handleMarkForReview} className="btn btn-secondary">
            <FiFlag className="mr-2" />
            {markedForReview[currentQuestion] ? 'Unmark for Review' : 'Mark for Review'}
          </button>
          <button onClick={handleSkip} className="btn btn-ghost">
            <FiSkipForward className="mr-2" />
            Skip
          </button>
          <button onClick={handleNext} className="btn btn-primary">
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            <FiChevronRight className="ml-2" />
          </button>
        </div>
      </div>
      <div className="w-full md:w-64">
        <h3 className="text-xl font-bold mb-4">Question Overview</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`btn btn-sm ${
                index === currentQuestion
                  ? 'btn-primary'
                  : userAnswers[index]
                  ? 'btn-success'
                  : markedForReview[index]
                  ? 'btn-warning'
                  : 'btn-error'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;