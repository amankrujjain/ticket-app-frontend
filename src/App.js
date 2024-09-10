import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
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
import Navbar from './components/Navbar';  // Regular Navbar
import AdminNavbar from './components/admin/AdminNavbar';  // Admin Navbar
import Profile from './components/Profile';
import ManageTickets from './components/admin/ManageTickets';
import AdminViewTicket from './components/admin/AdminViewTicket';  // Import the new AdminViewTicket component
import NotFoundPage from './components/utils/NotFoundPage';

// Layout for pages that include the Navbar
function AppLayout() {
  const userRole = useSelector((state) => state.auth?.user?.role?.name);

  if (!userRole) {
    return <div>Loading...</div>;  
  }

  return (
    <>
      {(userRole === 'admin' || userRole === 'sub-admin') ? <AdminNavbar /> : <Navbar />}  {/* Conditional Navbar */}
      <div className="min-h-screen bg-gray-200 w-full">
        <Routes>
          <Route path="/ticket/raise" element={<Ticket />} />
          <Route path="/ticket/open" element={<TicketTable />} />
          <Route path="/ticket/closed" element={<TicketTableClosed />} />
          <Route path="/ticket/view-ticket-details/:ticketId" element={<TicketDetails />} />  {/* Technician Ticket View */}
          <Route path="/admin/view-ticket/:ticketId" element={<AdminViewTicket />} />  {/* Admin Ticket View */}
          <Route path="/admin/manage-tickets" element={<ManageTickets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/admin/dashboard' element={<Dashboard/>} />
          <Route path="*" element={<NotFoundPage />} />  {/* Default route if no other matches */}
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<AppLayout />} />  {/* This should be at the bottom */}
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
