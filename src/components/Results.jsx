import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

function Results({ questions }) {
  const navigate = useNavigate();
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');

  const calculateResults = () => {
    let attempted = 0;
    let correct = 0;
    let skipped = 0;
    let markedForReview = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index]) {
        attempted++;
        if (userAnswers[index] === question.correctAnswer) {
          correct++;
        }
      } else {
        skipped++;
      }
      if (JSON.parse(localStorage.getItem('markedForReview') || '[]')[index]) {
        markedForReview++;
      }
    });

    return { attempted, correct, skipped, markedForReview };
  };

  const results = calculateResults();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat">
              <div className="stat-title">Total Questions</div>
              <div className="stat-value">{questions.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Attempted</div>
              <div className="stat-value">{results.attempted}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Correct</div>
              <div className="stat-value text-success">{results.correct}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Skipped</div>
              <div className="stat-value text-error">{results.skipped}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className={userAnswers[index] === question.correctAnswer ? 'bg-success bg-opacity-10' : userAnswers[index] ? 'bg-error bg-opacity-10' : 'bg-warning bg-opacity-10'}>
                <td>{question.question}</td>
                <td>{userAnswers[index] || 'Not attempted'}</td>
                <td>{question.correctAnswer}</td>
                <td>
                  {userAnswers[index] === question.correctAnswer ? (
                    <FiCheckCircle className="text-success" />
                  ) : userAnswers[index] ? (
                    <FiXCircle className="text-error" />
                  ) : (
                    <FiAlertCircle className="text-warning" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Start New Quiz
        </button>
      </div>
    </div>
  );
}

export default Results;