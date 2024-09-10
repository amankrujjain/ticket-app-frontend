import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets, closeTicket } from "../../store/ticketSlice"; // Import the thunk action
import Loader from "../utils/Loader";

export default function ManageTickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allTickets, loadingAllTickets, errorAllTickets } = useSelector(
    (state) => state.ticket
  );

  // Local state for filtering and sorting
  const [filter, setFilter] = useState("all"); // "all", "open", or "closed"
  const [sortOrder, setSortOrder] = useState("ascending"); // "ascending" or "descending"

  // Fetch tickets when the component mounts
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleCloseTicket = async (ticketId) => {
    try {
      await dispatch(closeTicket(ticketId)).unwrap(); // Wait for the closeTicket action to complete
      dispatch(fetchAllTickets()); // Refetch all tickets after closing
    } catch (error) {
      console.error("Failed to close the ticket:", error);
    }
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/admin/view-ticket/${ticketId}`);
  };

  // Filtering tickets based on their status (open, closed, or all)
  const filteredTickets = allTickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  // Sorting tickets based on created_on date
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const dateA = new Date(a.created_on);
    const dateB = new Date(b.created_on);
    if (sortOrder === "ascending") {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

  if (loadingAllTickets) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (errorAllTickets) {
    return <div>Error: {errorAllTickets}</div>;
  }

  return (
    <div className="px-7 py-5">
      {/* Filter Bar */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4" // Added padding
          >
            <option value="all">All Tickets</option>
            <option value="open">Open Tickets</option>
            <option value="closed">Closed Tickets</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-8" // Added padding
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>

      {/* Displaying Tickets */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket, index) => (
            <div
              key={ticket._id}
              className="col-span-1 bg-white shadow-md p-5 rounded-md"
            >
              <li className="flex flex-col justify-between gap-x-6">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {index + 1}.
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Ticket ID - {ticket.ticket_id}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Name: {ticket.user?.name || "Unnamed User"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Email: {ticket.user?.email || "No Email Provided"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Centre: {ticket.centre?.name || "No Centre Provided"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 flex items-center gap-x-1.5">
                    Status:
                    <span
                      className={`font-semibold ${
                        ticket.status === "closed"
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {ticket.status || "Unknown Status"}
                    </span>
                    <div
                      className={`flex-none rounded-full ${
                        ticket.status === "closed"
                          ? "bg-red-500/20"
                          : "bg-emerald-500/20"
                      } p-1`}
                      title={ticket.status}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          ticket.status === "closed"
                            ? "bg-red-500"
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Created On:{" "}
                    {new Date(ticket.created_on).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date(ticket.created_on).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}{" "}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded"
                    onClick={() => handleViewTicket(ticket._id)}
                  >
                    View Full Ticket
                  </button>

                  {/* Close Ticket Button */}
                  {ticket.status === "closed" ? (
                    <button
                      className="bg-gray-400 text-white text-sm font-semibold py-1 px-3 rounded cursor-not-allowed"
                      disabled
                    >
                      Ticket Closed
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-1 px-3 rounded"
                      onClick={() => handleCloseTicket(ticket._id)}
                    >
                      Close Ticket
                    </button>
                  )}
                </div>
              </li>
            </div>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </ul>
    </div>
  );
}
