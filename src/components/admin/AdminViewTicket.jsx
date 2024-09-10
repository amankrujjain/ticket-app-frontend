import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketDetails, closeTicket } from '../../store/ticketSlice';  // Import fetchTicketDetails and closeTicket actions

export default function AdminViewTicket() {
  const { ticketId } = useParams();  // Get the ticketId from the URL
  const dispatch = useDispatch();

  const {
    ticketDetails: ticket,  // Alias the state to `ticket`
  } = useSelector((state) => state.ticket);  // Get ticket details, loading, and error from Redux

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchTicketDetails(ticketId));  // Dispatch the Redux action to fetch the ticket details
    }
  }, [dispatch, ticketId]);

  const handleCloseTicket = () => {
    if (ticket?.ticket_id) {
      dispatch(closeTicket(ticketId));  // Dispatch the closeTicket action with the ticketId
    }
  };

  // Simulated warranty days calculation - You can replace it with your warranty field later
  const warrantyDaysLeft = 11; // Placeholder for days left in warranty from backend field

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Warranty Ribbon */}
      {warrantyDaysLeft > 0 && (
        <div className={`p-2 text-center font-bold mb-4 ${warrantyDaysLeft <= 10 ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {warrantyDaysLeft} day(s) left in warranty
        </div>
      )}
      {warrantyDaysLeft <= 0 && (
        <div className="bg-red-500 text-white p-2 text-center font-bold mb-4">
          Warranty has expired
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4">Admin View: Ticket Details</h1>
      <div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Ticket ID</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.ticket_id || 'No Ticket ID'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Description</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.description || 'No Description Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Status</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.status || 'No Status Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Issue</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.issue?.name || 'No Issue Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Reason</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.reason?.name || 'No Reason Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Machine</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.machine?.machine_serial_number || 'No Machine Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Centre</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket?.centre?.name || 'No Centre Available'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Created On</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket ? new Date(ticket.created_on).toLocaleString() : 'No Date Available'}</td>
            </tr>
            {/* Close Ticket Button Row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-bold">Actions</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleCloseTicket}
                  disabled={ticket?.status === 'closed'}
                >
                  {ticket?.status === 'closed' ? 'Ticket Already Closed' : 'Close Ticket'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
