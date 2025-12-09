import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ============================================
// API MODE INDICATOR
// ============================================
if (process.env.REACT_APP_ENABLE_MOCK_API === 'true') {
  console.log(
    '%c🟦 MOCK API MODE ACTIVE',
    'background: #2196F3; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
  );
  console.log('Using mock data for local development');
} else {
  console.log(
    '%c🟢 REAL API MODE ACTIVE',
    'background: #4CAF50; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
  );
  console.log(`API Base URL: ${process.env.REACT_APP_API_BASE_URL || 'https://localhost:7133/api'}`);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();