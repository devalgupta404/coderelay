import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeGenerated, setResumeGenerated] = useState(false);

  const handleGenerateResume = async () => {
    // Call your FastAPI backend to generate the resume here
    try {
      const response = await fetch('http://127.0.0.1:8000/resumes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          // Include other required fields here
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResumeGenerated(true);
        alert('Resume generated successfully!');
      } else {
        alert('Error generating resume');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Generator</h1>
        <p>Enter your details to generate your resume</p>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <button onClick={handleGenerateResume}>Generate Resume</button>

        {resumeGenerated && (
          <div>
            <h2>Your resume has been generated!</h2>
            <p>You can now download or view your resume.</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
