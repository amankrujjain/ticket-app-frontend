import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, fetchCentres, registerUser } from '../../store/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { roles = [], centres = [], isLoading: fetchLoading } = useSelector((state) => state.user);

  // Initial state for the form
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    employee_id: '',
    phone: '',
    role: '',
    centre: '',
  };

  const [formData, setFormData] = useState(initialFormData); // Use initial form data
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Fetch roles and centres when component mounts
    dispatch(fetchRoles());
    dispatch(fetchCentres());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Dispatch the registerUser action
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setIsLoading(false);

        // Reset the form fields to empty after successful registration
        setFormData(initialFormData); // Reset form data to initial empty values
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Register User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name} // Controlled input
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email} // Controlled input
              placeholder="email@vitucare.com"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password} // Controlled input
              placeholder="*******"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id} // Controlled input
              placeholder="VS12345"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone} // Controlled input
              placeholder=""
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role} // Controlled input
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a role</option>
              {Array.isArray(roles) && roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Centre Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Centre</label>
            <select
              name="centre"
              value={formData.centre} // Controlled input
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a centre</option>
              {Array.isArray(centres) && centres.map((centre) => (
                <option key={centre._id} value={centre._id}>
                  {centre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        {fetchLoading && <p className="mt-4 text-indigo-500">Loading roles and centres...</p>}
        {isLoading && <p className="mt-4 text-indigo-500">Processing...</p>}
      </div>
    </div>
  );
};

export default Register;
