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
import TicketTableClosed from './components/TicketTableClosed';
import Navbar from './components/Navbar'; // Assuming you have the conditional Navbar
import Profile from './components/Profile';

// Layout for pages that include the Navbar
function AppLayout() {
  return (
    <>
      <Navbar /> {/* Navbar is conditionally rendered based on user role */}
      <div className="min-h-screen bg-gray-200 w-full">
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/ticket/raise" element={<Ticket />} />
          <Route path="/ticket/open" element={<TicketTable />} />
          <Route path="/ticket/closed" element={<TicketTableClosed/>}/>
          <Route path="/ticket/view-ticket-details/:ticketId" element={<TicketDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Dashboard />} /> {/* Default route if no other matches */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Grouping login and register routes without Navbar */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* All other routes that include the Navbar */}
          <Route path="*" element={<AppLayout />} /> 
        </Routes>
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
