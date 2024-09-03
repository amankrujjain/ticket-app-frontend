import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues, fetchReasons, fetchMachines, createTicket } from '../store/ticketSlice';

export default function Ticket() {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { issues, reasons, machines, loading: ticketLoading, error } = useSelector((state) => state.ticket);

  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchIssues());
    dispatch(fetchReasons());
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTicket({
        issueId: selectedIssue,
        reasonId: selectedReason,
        machineId: selectedMachine,
        description,
      })
    );

    // Clear form
    setSelectedIssue('');
    setSelectedReason('');
    setSelectedMachine('');
    setDescription('');
  };

  if (userLoading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>Error: User data not available.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Ticket</h1>

      <div className="mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {ticketLoading && <p>Loading ticket data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
            Issue
          </label>
          <select
            id="issue"
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select an issue</option>
            {issues.map((issue) => (
              <option key={issue._id} value={issue._id}>
                {issue?.name || 'Unnamed Issue'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <select
            id="reason"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a reason</option>
            {reasons.map((reason) => (
              <option key={reason._id} value={reason._id}>
                {reason?.name || "Unnamed Reason"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="machine" className="block text-sm font-medium text-gray-700">
            Machine
          </label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a machine</option>
            {machines.map((machine) => (
              <option key={machine._id} value={machine._id}>
                {machine?.machine_serial_number || "Unknown machine"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Describe the issue..."
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={ticketLoading}
          >
            {ticketLoading ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}
