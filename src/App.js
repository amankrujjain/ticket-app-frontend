import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Ticket from './components/Ticket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketTable from './components/TicektTable';
import TicketDetails from './components/TicketDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 w-full">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/ticket/open" element={<TicketTable/>} />
            <Route path="/ticket/view-ticket-details" element={<TicketDetails/>} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </Provider>
  );
}

export default App;
