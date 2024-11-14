import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const AddChildRecord = () => {
  const [childData, setChildData] = useState({
    name: '',
    dob: '',
    bloodGroup: '',
    nickname: '',
    languagesSpoken: [],
    emergencyContacts: [],
    blockFlatNo: '',
    allergies: '',
    medication: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    pottyTrained: false,
    sleepTrained: false,
    independentEating: false,
    previousDaycare: '',
    therapyPrograms: '',
    likes: '',
    dislikes: '',
    activitiesEnjoyed: '',
    behaviorTriggers: '',
    behaviorImpact: '',
    developmentInfo: '',
    typicalSleepSchedule: '',
    typicalMealSchedule: '',
    mealPreferences: '',
    culturalReligiousPractices: '',
    communicationStyle: '',
    additionalInfo: '',
    parentIds: [],
  });
  const [parentIds, setParentIds] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleParentIdsChange = (e) => {
    setParentIds(e.target.value.split(',').map((id) => id.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const childDocRef = await addDoc(collection(db, 'children'), {
        ...childData,
        parentIds,
      });

      // Update each Parent document with this Child ID
      for (const parentId of parentIds) {
        const parentDocRef = doc(db, 'parents', parentId);
        await updateDoc(parentDocRef, {
          childIds: parentIds,
        });
      }

      alert('Child record added successfully!');
      setChildData({
        name: '',
        dob: '',
        bloodGroup: '',
        nickname: '',
        languagesSpoken: [],
        emergencyContacts: [],
        blockFlatNo: '',
        allergies: '',
        medication: '',
        medicalConditions: '',
        dietaryRestrictions: '',
        pottyTrained: false,
        sleepTrained: false,
        independentEating: false,
        previousDaycare: '',
        therapyPrograms: '',
        likes: '',
        dislikes: '',
        activitiesEnjoyed: '',
        behaviorTriggers: '',
        behaviorImpact: '',
        developmentInfo: '',
        typicalSleepSchedule: '',
        typicalMealSchedule: '',
        mealPreferences: '',
        culturalReligiousPractices: '',
        communicationStyle: '',
        additionalInfo: '',
        parentIds: [],
      });
      setParentIds([]);
    } catch (error) {
      alert('Error saving child record: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Child Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Text input fields */}
          {['name', 'dob', 'bloodGroup', 'nickname', 'blockFlatNo', 'allergies', 'medication', 'medicalConditions', 'dietaryRestrictions', 'previousDaycare', 'therapyPrograms', 'likes', 'dislikes', 'activitiesEnjoyed', 'behaviorTriggers', 'behaviorImpact', 'developmentInfo', 'typicalSleepSchedule', 'typicalMealSchedule', 'mealPreferences', 'culturalReligiousPractices', 'communicationStyle', 'additionalInfo'].map((field) => (
            <input
              key={field}
              type={field === 'dob' ? 'date' : 'text'}
              name={field}
              placeholder={field.split(/(?=[A-Z])/).join(' ')}
              value={childData[field]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          ))}

          {/* Special fields */}
          <input
            type="text"
            name="languagesSpoken"
            placeholder="Languages Spoken (comma-separated)"
            value={childData.languagesSpoken.join(', ')}
            onChange={(e) =>
              setChildData({
                ...childData,
                languagesSpoken: e.target.value.split(',').map((lang) => lang.trim()),
              })
            }
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="emergencyContacts"
            placeholder="Emergency Contacts (name, relationship, phone)"
            value={childData.emergencyContacts.join(', ')}
            onChange={(e) =>
              setChildData({
                ...childData,
                emergencyContacts: e.target.value.split(',').map((contact) => contact.trim()),
              })
            }
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="parentIds"
            placeholder="Parent IDs (comma-separated)"
            value={parentIds.join(', ')}
            onChange={handleParentIdsChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />

          {/* Checkbox fields */}
          <div className="flex items-center space-x-4">
            {['pottyTrained', 'sleepTrained', 'independentEating'].map((field) => (
              <div key={field} className="flex items-center">
                <input
                  type="checkbox"
                  name={field}
                  checked={childData[field]}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{field.split(/(?=[A-Z])/).join(' ')}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Child
        </button>
      </form>
    </div>
  );
};

export default AddChildRecord;
