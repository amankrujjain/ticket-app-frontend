import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIssues,
  fetchReasons,
  fetchMachines,
  createTicket,
} from "../store/ticketSlice";
import Card from "./Card";
import Lottie from "lottie-react";

export default function Ticket() {
  const dispatch = useDispatch();

  // Selecting necessary state from Redux
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const {
    issues,
    reasons,
    machines,
    loading: ticketLoading,
    error,
  } = useSelector((state) => state.ticket);

  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [animationData, setAnimationData] = useState(null); // State for loading Lottie animation

  // Fetch issues and machines when the component mounts
  useEffect(() => {
    if (user && user.centre && user.centre._id) {
      dispatch(fetchIssues());
      dispatch(fetchMachines(user.centre._id)); // Fetch machines based on user's centre ID
    }
  }, [dispatch, user]);

  // Fetch reasons based on the selected issue
  useEffect(() => {
    if (selectedIssue) {
      dispatch(fetchReasons(selectedIssue)); // Fetch reasons based on the selected issue
    }
  }, [dispatch, selectedIssue]);

  // Fetch the Lottie animation data from the public folder
  useEffect(() => {
    fetch("/lottie/Animation - 1725528461055.json") // Path to your Lottie file in the public folder
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTicket({
        issueId: selectedIssue,
        reasonId: selectedReason,
        machineId: selectedMachine,
        centre: user.centre._id, // Use the correct path for centre ID
        description,
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        // Show modal on success
        setModalVisible(true);

        // Hide the modal after 2 seconds
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      } else if (action.meta.requestStatus === "rejected") {
        console.error("Ticket creation failed, error:", action.payload);
      }
    });

    // Clear form after submission
    setSelectedIssue("");
    setSelectedReason("");
    setSelectedMachine("");
    setDescription("");
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

      <Card user={user} />

      {ticketLoading && <p>Loading ticket data...</p>}
      {error && Array.isArray(error) && (
        <ul className="text-red-500">
          {error.map((err, index) => (
            <li key={index}>{err.msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="issue"
            className="block text-sm font-medium text-gray-700"
          >
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
                {issue?.name || "Unnamed Issue"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="machine"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
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
            {ticketLoading ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </form>

      {/* Modal for success animation */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {animationData && (
              <Lottie animationData={animationData} loop={false} className="w-32 h-32 mx-auto" />
            )}
            <p className="mt-4 text-lg font-bold">Ticket created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
