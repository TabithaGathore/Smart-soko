import React, { useState } from 'react';

function ReportForm() {
  const [type, setType] = useState('safety');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, description, status }),
      });
      if (response.ok) {
        setMessage('Report submitted successfully');
        setDescription('');
        setType('safety');
        setStatus('open');
      } else {
        setMessage('Failed to submit report');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div>
      <h2>Submit Safety/Sanitation Report</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="safety">Safety</option>
            <option value="sanitation">Sanitation</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReportForm;
