import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { FiUpload } from 'react-icons/fi';

function FileUpload({ setQuestions }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedQuestions = result.data.slice(1).map((row) => ({
            question: row[0],
            options: [row[1], row[2], row[3], row[4]],
            correctAnswer: row[5],
          }));
          setQuestions(parsedQuestions);
          navigate('/quiz');
        },
        header: false,
      });
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Quiz App</h1>
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4">Upload Questions</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs mb-4"
          />
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={!file}
          >
            <FiUpload className="mr-2" />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;