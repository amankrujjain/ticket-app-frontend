import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTickets } from '../store/ticketSlice'; // Your Redux action
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Loader from './utils/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allTickets, loadingAllTickets, errorAllTickets } = useSelector(
    (state) => state.ticket
  );

  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [],
  });

  // Using useCallback to memoize the function and avoid unnecessary recreations
  const calculateMonthlyData = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, index) => new Date(currentYear, index).toLocaleString('default', { month: 'long' }));
    const monthlyOpenTickets = new Array(12).fill(0);
    const monthlyClosedTickets = new Array(12).fill(0);

    // Count the number of open and closed tickets per month
    allTickets.forEach((ticket) => {
      const ticketDate = new Date(ticket.created_on);
      const monthIndex = ticketDate.getMonth(); // Get the month (0-11)

      if (ticket.status === 'open') {
        monthlyOpenTickets[monthIndex]++;
      } else if (ticket.status === 'closed') {
        monthlyClosedTickets[monthIndex]++;
      }
    });

    // Set the data for the chart
    setMonthlyData({
      labels: months,
      datasets: [
        {
          label: 'Open Tickets',
          data: monthlyOpenTickets,
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green for open tickets
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Closed Tickets',
          data: monthlyClosedTickets,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for closed tickets
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [allTickets]); // Add `allTickets` as dependency to recalculate when tickets change

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  useEffect(() => {
    if (allTickets.length > 0) {
      calculateMonthlyData();
    }
  }, [allTickets, calculateMonthlyData]); // Add `calculateMonthlyData` here to avoid the warning

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
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ width: '600px', margin: 'auto' }}>
        <Bar
          data={monthlyData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
