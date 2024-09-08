import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpenTickets } from "../store/ticketSlice";

export default function TicketTable() {
  const dispatch = useDispatch();
  const { openTickets, loadingOpenTickets, errorOpenTickets } = useSelector(
    (state) => state.ticket
  );

  // Fetch open tickets when the component mounts
  useEffect(() => {
    if (openTickets.length === 0 && !loadingOpenTickets) {
      dispatch(fetchOpenTickets());
    }
  }, [dispatch, openTickets.length, loadingOpenTickets]);

  if (loadingOpenTickets) {
    return <p>Loading tickets...</p>;
  }

  if (errorOpenTickets) {
    return <p>Error: {errorOpenTickets}</p>;
  }

  if (openTickets.length === 0) {
    return <p>No open tickets found.</p>;
  }

  return (
    <div className="px-7 py-5">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {openTickets.map((ticket, index) => (
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
                  <span>{ticket.status || "Unknown Status"}</span>
                  <div
                    className="flex-none rounded-full bg-emerald-500/20 p-1"
                    title="open"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
                  || "No Date"{"}"}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded">
                  View Full Ticket
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
