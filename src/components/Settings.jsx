import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';

function Settings({ settings, setSettings }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage
    localStorage.setItem('quizSettings', JSON.stringify(settings));
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="card w-96 bg-base-200 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Font Size</span>
            </label>
            <select
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="light">Cupcake</option>
              <option value="bumblebee">Bumblebee</option>
              <option value="coffee">Coffee</option>
              <option value="nord">Nord</option>
              <option value="sunset">Sunset</option>
              <option value="acid">Acid</option>
              <option value="business">Business</option>
              <option value="dracula">Dracula</option>
              <option value="autumn">Autumn</option>
              <option value="dim">Dim</option>
              <option value="lofi">LoFi</option>
              <option value="retro">Retro</option>
              <option value="pastel">Pastel</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Time per Question (seconds)</span>
            </label>
            <input
              type="number"
              name="timePerQuestion"
              value={settings.timePerQuestion}
              onChange={handleChange}
              className="input input-bordered w-full"
              min="10"
              max="300"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              <FiSave className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;