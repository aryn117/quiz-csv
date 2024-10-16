import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Settings from './components/Settings';

function App() {
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    theme: 'light',
    timePerQuestion: 60,
  });

  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme={settings.theme}>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<FileUpload setQuestions={setQuestions} />} />
          <Route path="/quiz" element={<Quiz questions={questions} settings={settings} />} />
          <Route path="/results" element={<Results questions={questions} />} />
          <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;