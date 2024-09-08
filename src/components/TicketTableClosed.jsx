import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClosedTickets } from "../store/ticketSlice";
import { Link } from "react-router-dom";

export default function TicketTableClosed() {
  const dispatch = useDispatch();
  const { closedTickets, loading, error } = useSelector((state) => state.ticket);

  // Fetch closed tickets when the component mounts
  useEffect(() => {
    dispatch(fetchClosedTickets());
  }, [dispatch]);

  console.log("Closed tickets---->", closedTickets);

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (closedTickets.length === 0) {
    return <p>No closed tickets found.</p>;
  }

  return (
    <div className="px-7 py-5">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {closedTickets.map((ticket, index) => (
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
                  Name : {ticket.user?.name || "Unnamed User"}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Email-ID : {ticket.user?.email || "No Email Provided"}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Centre : {ticket.centre?.name || "No Centre Provided"}
                </p>

                {/* Status followed by red icon and "closed" label */}
                <p className="mt-1 text-xs leading-5 text-gray-500 flex items-center gap-x-1.5">
                  Status:
                  <span>{ticket.status || "Unknown Status"}</span>
                  <div className="flex-none rounded-full bg-red-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Ticket Raised : {" "}
                  {new Date(ticket.created_on).toLocaleDateString() ||
                    "No Date"}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
              <Link
                  to={`/ticket/view-ticket-details/${ticket._id}`}
                  className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded"
                >
                  View Full Ticket
                </Link>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
