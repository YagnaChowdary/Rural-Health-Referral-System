// frontend/src/components/HospitalDashboard.js
/*
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HospitalDashboard = () => {
  // State to store the list of referrals
  const [referrals, setReferrals] = useState([]);
  // State to handle loading message
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component loads
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        // Fetch referrals for a specific hospital (e.g., hospital with ID=2)
        const res = await api.get('/hospitals/2/referrals');
        setReferrals(res.data); // Store the fetched data
      } catch (err) {
        console.error("Error fetching referrals:", err);
      } finally {
        setLoading(false); // Hide loading message
      }
    };

    fetchReferrals();
  }, []); // The empty array [] means this effect runs only once

  if (loading) {
    return <p>Loading referrals...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Incoming Referrals</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Reason for Referral</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {referrals.length > 0 ? (
            referrals.map(referral => (
              <tr key={referral.id}>
                <td>{referral.patient_name}</td>
                <td>{referral.reason}</td>
                <td>{referral.status}</td>
                <td>{new Date(referral.referral_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No referrals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalDashboard;*/

// frontend/src/components/HospitalDashboard.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HospitalDashboard = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await api.get('/hospitals/2/referrals');
        setReferrals(res.data);
      } catch (err) {
        console.error("Error fetching referrals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // NEW: Function to handle the check-in button click
  const handleCheckIn = async (referralId) => {
    try {
      // Step 1: Call the PUT API endpoint
      await api.put(`/referrals/${referralId}/checkin`);

      // Step 2: Update the UI instantly without a page refresh
      setReferrals(prevReferrals =>
        prevReferrals.map(referral =>
          referral.id === referralId
            ? { ...referral, status: 'CHECKED_IN' }
            : referral
        )
      );
      alert('Patient checked in successfully!');
    } catch (err) {
      console.error("Error checking in:", err);
      alert('Failed to check in patient.');
    }
  };

  if (loading) {
    return <p>Loading referrals...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Incoming Referrals</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Reason for Referral</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th> {/* <-- NEW HEADER */}
          </tr>
        </thead>
        <tbody>
          {referrals.length > 0 ? (
            referrals.map(referral => (
              <tr key={referral.id}>
                <td>{referral.patient_name}</td>
                <td>{referral.reason}</td>
                <td>{referral.status}</td>
                <td>{new Date(referral.referral_date).toLocaleDateString()}</td>
                <td>
                  {/* NEW: Add button, disable if already checked in */}
                  {referral.status === 'REFERRED' && (
                    <button onClick={() => handleCheckIn(referral.id)}>
                      Check-in
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No referrals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalDashboard;