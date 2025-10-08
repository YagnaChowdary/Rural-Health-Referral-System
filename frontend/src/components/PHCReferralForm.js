// frontend/src/components/PHCReferralForm.js

import React, { useState } from 'react';
import api from '../services/api'; // Your axios instance

const PHCReferralForm = () => {
  const [formData, setFormData] = useState({
    // Patient fields
    patientName: '',
    village: '',
    phone: '',
    dob: '',
    // Visit fields
    symptoms: '',
    diagnosis: '',
    // Referral fields
    referred_to_hospital_id: '',
    reason: '',
    urgency_hours: '',
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Step 1: Create the patient
      const patientData = {
        name: formData.patientName,
        village: formData.village,
        phone: formData.phone,
        dob: formData.dob,
      };
      const patientRes = await api.post('/patients', patientData);
      const patientId = patientRes.data.id;
      console.log('Patient created with ID:', patientId);

      // Step 2: Create the visit using the new patient's ID
      const visitData = {
        patient_id: patientId,
        hospital_id: 1, // Assuming this form is for the PHC with ID=1
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
      };
      const visitRes = await api.post('/visits', visitData);
      const visitId = visitRes.data.id;
      console.log('Visit created with ID:', visitId);

      // Step 3: Create the referral using the new visit's ID
      const referralData = {
        visit_id: visitId,
        referred_to_hospital_id: formData.referred_to_hospital_id,
        reason: formData.reason,
        urgency_hours: formData.urgency_hours,
      };
      await api.post('/referrals', referralData);
      
      alert('Referral created successfully!');
      // Optionally, clear the form here
    } catch (err) {
      console.error(err);
      alert('An error occurred. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', gap: '10px' }}>
      <h2>New Patient Referral</h2>
      
      <fieldset>
        <legend>Patient Information</legend>
        <input name="patientName" value={formData.patientName} onChange={onChange} placeholder="Patient Name" required />
        <input name="village" value={formData.village} onChange={onChange} placeholder="Village" />
        <input name="phone" value={formData.phone} onChange={onChange} placeholder="Phone Number" />
        <input name="dob" type="date" value={formData.dob} onChange={onChange} />
      </fieldset>
      
      <fieldset>
        <legend>Visit Details</legend>
        <textarea name="symptoms" value={formData.symptoms} onChange={onChange} placeholder="Symptoms" required />
        <textarea name="diagnosis" value={formData.diagnosis} onChange={onChange} placeholder="Diagnosis" required />
      </fieldset>

      <fieldset>
        <legend>Referral Details</legend>
        <select name="referred_to_hospital_id" value={formData.referred_to_hospital_id} onChange={onChange} required>
            <option value="">Select District Hospital...</option>
            <option value="2">Jawaharlal Nehru Institute</option>
            {/* Add more hospitals as needed */}
        </select>
        <select name="urgency_hours" value={formData.urgency_hours} onChange={onChange} required>
            <option value="">Select Urgency...</option>
            <option value="6">Urgent (6 hours)</option>
            <option value="24">Standard (24 hours)</option>
            <option value="72">Low (72 hours)</option>
        </select>
        <textarea name="reason" value={formData.reason} onChange={onChange} placeholder="Reason for Referral" required />
      </fieldset>

      <button type="submit">Submit Referral</button>
    </form>
  );
};

export default PHCReferralForm;