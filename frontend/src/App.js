import React, { useState } from 'react';
import Login from './components/Login';
import MarketOverview from './components/MarketOverview';
import ProductList from './components/ProductList';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div>
      {view === 'login' && <Login onLogin={handleLogin} />}
      {view === 'dashboard' && user && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Dashboard user={user} />
          <MarketOverview />
          <ProductList />
          <ReportForm />
        </>
      )}
    </div>
  );
}

export default App;
