

# Rural Health Referral System

This project is a full-stack web application designed to manage and track patient referrals from rural Primary Health Centres (PHCs) to larger District Hospitals.

Its core purpose is to ensure patient follow-through by creating a digital link between the referring and receiving hospitals and by implementing an automated alert system for overdue referrals.

> **The Problem:** In many rural health systems, patients are "referred" from a local PHC to a district hospital, but there is no system to track whether they arrive. Patients may get lost in the system, fail to show up, or arrive late without any follow-up.
>
> **The Solution:** This application bridges that gap. It logs the referral, notifies the receiving hospital, and if a patient fails to check in within a specified time, it automatically escalates the case by alerting a local health officer (ANO) to provide assistance.

## 🩺 Core User Flow

The application flow is managed by three key user roles:

  * **PHC Staff:** Creates the initial patient referral.
  * **District Staff:** Manages incoming referrals and checks in patients upon arrival.
  * **ANO (Accredited Nodal Officer):** Receives SMS alerts for escalated (overdue) referrals.

Here is the step-by-step process:

### Step 1: A Patient is Referred from a PHC

A `PHC_STAFF` member logs in and accesses the **PHC Referral Portal**. This is the starting point for every new referral.

### Step 2: The Referral Form is Completed

The PHC staff member fills out the patient's information, the initial visit details, and the specific referral details. This is the most critical step, as it includes:

  * **Patient Information** (Name, Village, Phone)
  * **Visit Details** (Symptoms, Diagnosis)
  * **Referral Details** (Which hospital to refer to, the reason, and an **Urgency** level).

The **Urgency** (e.g., 6, 24, or 72 hours) sets the time window for the patient to check in at the district hospital.

| Patient Information | Visit & Referral Details |
| :---: | :---: |
|  |  |

Once submitted, the referral is created with a **"REFERRED"** status, and the district hospital is now aware of the incoming patient.

### Step 3: The Patient Arrives at the District Hospital (The "Happy Path")

When the patient arrives at the district hospital, the `DISTRICT_STAFF` (admin) logs in and sees the **District Hospital Dashboard**.

They can see the new referral, which is currently marked as **"REFERRED"**. They click the **"Check-in"** button to confirm the patient's arrival.

### Step 4: The Referral is Completed

After check-in, the patient's status is updated to **"CHECKED\_IN"**. The referral is now considered complete, and the automated alert for this patient is cancelled.

### Step 5: The Escalation Path (If the Patient is Overdue)

This is the system's critical safety net:

1.  **If the patient does *not* check in** within the urgency window (e.g., 72 hours)...
2.  A backend automated job (`escalationWorker.js`) finds all referrals that are still "REFERRED" and past their deadline.
3.  The system automatically sends an **SMS alert** via Twilio to the village's **ANO**.
4.  The referral's status in the database is updated from "REFERRED" to **"ESCALATED"**.
5.  The ANO can now follow up with the patient and arrange transport or assistance.

## 🛠️ Technical Overview

  * **Frontend:** React.js
      * **Routing:** `react-router-dom`
      * **API Calls:** `axios`
      * **Authentication:** JWT (JSON Web Tokens) are stored in `localStorage` and sent with each request.
  * **Backend:** Node.js, Express
      * **Database:** PostgreSQL (pg)
      * **Authentication:** `bcryptjs` for password hashing, `jsonwebtoken` for token generation.
      * **Alerts:** `twilio` for sending SMS.
      * **Scheduled Jobs:** `node-cron` for the escalation worker.
