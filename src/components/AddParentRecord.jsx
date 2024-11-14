import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddParentRecord = () => {
  const [parentData, setParentData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    relationship: '',
    childIds: [], // Child references
  });
  
  const handleChange = (e) => {
    setParentData({ ...parentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parentDocRef = await addDoc(collection(db, 'parents'), parentData);

      alert('Parent record added successfully!');
      setParentData({
        name: '',
        phoneNumber: '',
        email: '',
        relationship: '',
        childIds: [],
      });
    } catch (error) {
      alert('Error saving parent record: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Parent Record</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Parent's Name" value={parentData.name} onChange={handleChange} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={parentData.phoneNumber} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" value={parentData.email} onChange={handleChange} />
        <input type="text" name="relationship" placeholder="Relationship" value={parentData.relationship} onChange={handleChange} />
        <button type="submit">Add Parent</button>
      </form>
    </div>
  );
};

export default AddParentRecord;
