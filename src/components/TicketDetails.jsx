import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketDetails } from '../store/ticketSlice'; // Make sure to import the action

export default function TicketDetails() {
  const { ticketId } = useParams(); // Get the ticketId from the URL
  const dispatch = useDispatch();

  const {
    ticketDetails: ticket, // Alias the state to `ticket`
    loadingTicketDetails: loading,
    errorTicketDetails: error
  } = useSelector((state) => state.ticket); // Get ticket details, loading, and error from Redux

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchTicketDetails(ticketId)); // Dispatch the Redux action to fetch the ticket details
    }
  }, [dispatch, ticketId]);

  // Add a console log to inspect the ticket data
  // useEffect(() => {
  //   if (ticket) {
  //     console.log("Fetched Ticket Details:", ticket);
  //   }
  // }, [ticket]);
  console.log(ticket)

  if (loading) {
    return <p>Loading ticket details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // <div className="p-4 bg-white shadow-md rounded-md">
    //   <h1 className="text-2xl font-semibold">Ticket Details</h1>
    //   <p><strong>Ticket ID:</strong> {ticket?.ticket_id}</p>
    //   <p><strong>Description:</strong> {ticket?.description}</p>
    //   <p><strong>Status:</strong> {ticket?.status}</p>
    //   <p><strong>Issue:</strong> {ticket?.issue?.name || 'No Issue Available'}</p>
    //   <p><strong>Reason:</strong> {ticket?.reason?.name || 'No Reason Available'}</p>
    //   <p><strong>Machine:</strong> {ticket?.machine?.name || 'No Machine Available'}</p>
    //   <p><strong>Centre:</strong> {ticket?.centre?.name || 'No Centre Available'}</p>
    //   <p><strong>Created On:</strong> {ticket && new Date(ticket.created_on).toLocaleString()}</p>
    //   {/* Add more details as needed */}
    // </div>
<div className="container mx-auto p-4 max-w-4xl">
  <h1 className="text-2xl font-semibold mb-4">Ticket Details</h1>
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
      </tbody>
    </table>
  </div>
</div>


  );
}
