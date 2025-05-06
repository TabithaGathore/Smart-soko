import React from 'react';

function Dashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Role: {user.role}</p>
      <p>This is your dashboard where you can manage your activities.</p>
    </div>
  );
}

export default Dashboard;
