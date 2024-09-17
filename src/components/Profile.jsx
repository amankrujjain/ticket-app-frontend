import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API_URL}/api/profile`, {
          withCredentials: true, // If you're using cookies for authentication
        });
        console.log(response);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-3xl font-semibold mb-2">Profile Details</h1>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <p className="text-gray-700 font-semibold text-lg">Name</p>
            <p className="text-gray-900 text-xl">{profileData?.data?.name || 'N/A'}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-700 font-semibold text-lg">Email</p>
            <p className="text-gray-900 text-xl">{profileData?.data?.email || 'N/A'}</p>
          </div>
          {/* Add more fields as necessary */}
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
