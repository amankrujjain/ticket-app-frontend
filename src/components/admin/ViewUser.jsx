import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/userSlice'; // Adjust the path to your store location

const ViewUser = () => {
  const dispatch = useDispatch();
  const { users, isLoading, fetchError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser()); // Fetch users on component mount
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-indigo-600">Loading...</p>;
  if (fetchError) return <p className="text-center text-red-600">Error: {fetchError}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-indigo-500 text-white">
              <th className="py-3 px-4 text-left text-sm font-semibold">S.No</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Role</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Center</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Employee ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user,index) => (
                  <tr key={user._id} className="border-b border-gray-300">
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-700">{user.name}</td>
                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                    <td className="py-3 px-4 text-gray-700">{user.role?.name}</td>
                    <td className="py-3 px-4 text-gray-700">{user.centre?.name}</td>
                    <td className="py-3 px-4 text-gray-700">{user.employee_id}</td>
                    <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
