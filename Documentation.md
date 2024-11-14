

# Mimansa Kids Daycare Management App

The **Mimansa Kids Daycare Management App** is a React-based web application designed to streamline the daily management of children’s data and activities in a daycare setting. The application includes features such as child and parent records, daily activity updates, attendance tracking, and WhatsApp notifications to parents.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Add Child and Parent Records**: Store and manage detailed information for each child and parent, including medical, dietary, and emergency details.
- **Daily Updates**: Track and record daily activities for each child, such as meals, naps, diaper changes, mood, and more.
- **Attendance Tracking**: Mark children as present or absent and log in/out times.
- **Parent Notifications**: Send a daily summary of the child’s activities via WhatsApp to parents.
- **Image Upload**: Upload and display photos from daily activities using Cloudinary.
- **Mobile-Friendly UI**: The app is designed to be responsive and mobile-friendly.

## Technologies

- **React.js**: Frontend framework
- **Firebase**: Authentication and Firestore database
- **Cloudinary**: Image storage for photos
- **Twilio**: WhatsApp notifications to parents
- **React Time Picker**: For setting time inputs in a clock-like format
- **React Router**: For navigation between screens
- **Tailwind CSS**: Styling

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mimansa-daycare-app.git
   cd mimansa-daycare-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Firebase**:
   - Create a Firebase project and enable Firestore and Authentication.
   - Replace the configuration in `src/utils/firebase.js` with your Firebase credentials.

4. **Setup Cloudinary**:
   - Sign up for a Cloudinary account and obtain your API keys.
   - Configure the `uploadToCloudinary` function in `src/utils/cloudinary.js` with your Cloudinary credentials.

5. **Twilio Setup** (for WhatsApp notifications):
   - Sign up for a Twilio account and enable WhatsApp messaging.
   - Configure Twilio API keys in the backend API service if using.

6. **Run the app**:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## Project Structure

```
mimansa-daycare-app/
├── src/
│   ├── components/
│   │   ├── AddChildAndParentRecord.js
│   │   ├── AddDailyUpdate.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── SendSummary.js
│   ├── utils/
│   │   ├── firebase.js
│   │   ├── cloudinary.js
│   ├── App.js
│   ├── index.js
└── README.md
```

### Explanation of Main Components

1. **AddChildAndParentRecord.js**: Manages the form where staff can enter and save child and parent information. This data is stored in Firebase Firestore.
2. **AddDailyUpdate.js**: Manages the daily activity update form for each child, including logging food, sleep, mood, and photos.
3. **Home.js**: Displays a list of enrolled children, allowing staff to mark attendance and navigate to the daily update form.
4. **Login.js**: Manages staff login using Firebase authentication.
5. **SendSummary.js**: Sends a summary of the child's day to the parent's WhatsApp using the Twilio API.

## Usage

1. **Login**: Staff log in to the app via the `Login.js` component.
2. **Add Child and Parent Record**: Navigate to the `AddChildAndParentRecord` component to input child and parent data.
3. **Daily Update**: Use the `AddDailyUpdate` component to log the child’s daily activities.
4. **Attendance**: In `Home.js`, mark a child as present or absent.
5. **Send Summary**: Use `SendSummary.js` to send a daily summary to the parent via WhatsApp.

## Code Explanation

### AddChildAndParentRecord.js

- Initializes `childData` as state, containing all fields required for each child, such as medical, dietary, and emergency information.
- **handleChildChange**: Updates the `childData` state when fields are modified.
- **handleSubmit**: Validates required fields and submits `childData` to Firestore. Alerts if required fields are missing.

### AddDailyUpdate.js

- Fetches `childId` from URL parameters.
- Initializes `updateData` state to store daily details for each child, including food, diaper changes, sleep, and photos.
- **fetchChildren**: Loads all children from Firestore to allow selecting an existing child for updates.
- **handleFileChange**: Converts selected images to URLs for preview and uploads images to Cloudinary.
- **handleSubmit**: Validates child selection, uploads photos, and submits `updateData` to Firestore, associating the update with the selected child’s record.

### Home.js

- Fetches and displays all enrolled children.
- **handleMarkPresent / handleMarkAbsent**: Logs attendance time and status for each child.
- **handleCardClick**: Navigates to the daily update form for children marked as present.

### Login.js

- Uses Firebase authentication to log in users.
- **handleLogin**: Verifies user credentials and calls `onLoginSuccess` upon success.

### SendSummary.js

- Prepares and sends a WhatsApp message summary of a child’s day using Twilio’s API.
- **handleSendSummary**: Assembles the message content based on the child's daily activities and sends it to the parent's phone number.



## Let's break down each code file you provided block by block. I'll focus on explaining the functionality without covering UI components.

---

### 1. `AddChildAndParentRecord.js`

This component manages the child and parent records. Here's how it works:

#### Imports
```javascript
import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
```
- `useState` manages the component's local state.
- `db` and Firestore functions are imported to interact with Firebase.

#### State and Initial Child Data
```javascript
const AddChildAndParentRecord = () => {
  const [childData, setChildData] = useState({ /* Initial data fields */ });
  const colors = { background: "#F6F5F5", buttonBackground: "#D3F26A", textColor: "#565657" };
```
- `childData` stores information about the child being added.
- `colors` holds color configurations for UI styling.

#### Accordion Control State
```javascript
const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
// ... more states for other sections
```
- State variables like `isBasicInfoOpen` control if each information section is expanded or collapsed.

#### Handling Input Changes
```javascript
const handleChildChange = (e) => {
  const { name, value } = e.target;
  setChildData((prevData) => ({ ...prevData, [name]: value }));
};
```
- Updates `childData` with values from input fields, using the `name` attribute to identify each field.

#### Required Fields for Validation
```javascript
const requiredFields = [ /* Array of required field objects */ ];
```
- `requiredFields` defines key fields needed for a complete record, with keys matching `childData`.

#### Form Submission with Validation
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const missingFields = requiredFields.filter(({ key }) => !childData[key]).map(({ label }) => label);
  
  if (missingFields.length > 0) {
    alert(`Please fill in the following fields:\n- ${missingFields.join("\n- ")}`);
    return;
  }

  try {
    await addDoc(collection(db, "children"), childData);
    alert("Child record added successfully!");
    setChildData({ /* reset child data fields */ });
  } catch (error) {
    alert("Error saving child record: " + error.message);
  }
};
```
- Validates required fields before submission.
- If all required fields are filled, adds the `childData` to the "children" collection in Firestore and resets the form.

---

### 2. `AddDailyUpdate.js`

This component manages daily updates for a specific child.

#### Imports and State Initialization
```javascript
import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, doc, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { uploadToCloudinary } from "../utils/cloudinary";
import { useParams } from "react-router-dom";
```
- Imports Firestore functions, Cloudinary utility, and `useParams` for route parameters.

#### Main State Variables
```javascript
const AddDailyUpdate = () => {
  const { childId } = useParams();
  const [updateData, setUpdateData] = useState({ /* default daily update structure */ });
  const [files, setFiles] = useState([]);
  const [warning, setWarning] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
```
- `updateData` stores information for the daily update.
- `files` holds file data to upload.
- `warning` and `children` manage child selection status and fetched children data.

#### Fetching Child Information
```javascript
useEffect(() => {
  const fetchChildren = async () => {
    const childrenQuery = query(collection(db, "children"));
    const querySnapshot = await getDocs(childrenQuery);
    const childrenList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setChildren(childrenList);

    if (childId) {
      const child = childrenList.find((child) => child.id === childId);
      if (child) {
        setUpdateData((prevData) => ({
          ...prevData,
          childId: child.id,
          childName: child.name,
          inTime: child.inTime,
          status: "Present",
        }));
      }
    }
  };

  fetchChildren();
}, [childId]);
```
- Fetches child data from Firestore and pre-fills form fields if a `childId` is found in the URL.

#### Handling File and Field Changes
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name.includes(".")) {
    const [section, key] = name.split(".");
    setUpdateData((prevState) => ({
      ...prevState,
      [section]: { ...prevState[section], [key]: value },
    }));
  } else {
    setUpdateData((prevState) => ({ ...prevState, [name]: value }));
  }
};
```
- Handles nested and standard input updates in `updateData`.

#### Submitting Daily Update with Images
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!updateData.childId) {
    setWarning("Please select a child from the list.");
    return;
  }

  try {
    const uploadedPhotoURLs = await Promise.all(files.map((file) => uploadToCloudinary(file)));
    const dataToSave = { ...updateData, photos: uploadedPhotoURLs };

    const docRef = await addDoc(collection(db, "dailyUpdates"), dataToSave);
    await updateDoc(doc(db, "children", updateData.childId), {
      dailyUpdates: arrayUnion(docRef.id),
    });

    alert("Daily update added successfully!");
    resetForm();
  } catch (error) {
    alert("Error saving daily update: " + error.message);
  }
};
```
- Validates selection, uploads photos to Cloudinary, saves the update to Firestore, and associates the update with the child.

---

### 3. `Home.js`

Displays the list of enrolled children and allows marking their attendance.

#### Fetching Enrolled Children
```javascript
useEffect(() => {
  const date = new Date();
  const options = { month: "short", day: "2-digit", year: "numeric" };
  setTodayDate(date.toLocaleDateString("en-US", options));

  const fetchChildren = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "children"));
      setEnrolledChildren(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching children data: ", error);
    }
  };

  fetchChildren();
}, []);
```
- Fetches children data from Firestore on component mount.

#### Marking Attendance and Navigating to Updates
```javascript
const handleMarkPresent = (childId) => {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  setAttendanceTime((prev) => ({ ...prev, [childId]: time }));
  setAttendanceStatus((prev) => ({ ...prev, [childId]: "present" }));
};

const handleCardClick = (childId) => {
  if (attendanceStatus[childId] === "present" && attendanceTime[childId]) {
    navigate(`/add-daily-update/${childId}`);
  } else {
    alert("This child is not marked as present.");
  }
};
```
- `handleMarkPresent` sets a child’s "in" time and attendance status.
- `handleCardClick` navigates to `AddDailyUpdate` if the child is marked present.

---

### 4. `Login.js`

Manages user authentication via Firebase.

#### Login Handler
```javascript
const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onLoginSuccess(true);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};
```
- Authenticates the user using Firebase and calls `onLoginSuccess` on success.

---

### 5. `SendSummary.js`

Sends a summary message via Twilio WhatsApp.

#### Message Composition and Sending
```javascript
const handleSendSummary = async () => {
  const today = new Date().toLocaleDateString();
  const message = attendance === "absent"
    ? `Greetings from Mimansa Kids...` 
    : `Greetings from Mimansa Kids, this is a summary of your child’s day at our center for ${today}...`;

  try {
    await axios.post("/send-message", { message, to: parentPhoneNumber });
    alert("Summary sent successfully!");
  } catch (error) {
    alert("Error sending summary: " + error.message);
  }
};
```
- Creates a message based on attendance and sends it via a Twilio-powered backend.



