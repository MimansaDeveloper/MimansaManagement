import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChildAndParentRecord = () => {
  const [childData, setChildData] = useState({
    name: "",
    dob: "",
    bloodGroup: "",
    nickname: "",
    language: "",
    parentContact: "",
    blockFlatNo: "",
    emergencyContact: "",
    emergencyRelation: "",
    medicalInfo: "",
    allergies: "",
    medicationDetails: "",
    medicationNeeds: "",
    dietaryRestrictions: "",
    developmentInfo: "",
    pottyTrained: "",
    sleepTrained: "",
    independentEating: "",
    previousDaycare: "",
    previousDaycareDetails: "",
    likesDislikes: "",
    enjoyableActivities: "",
    triggers: "",
    behaviorAffects: "",
    developmentNotes: "",
  });
  const colors = {
    background: "#F6F5F5",
    buttonBackground: "#D3F26A",
    textColor: "#565657",
  };

  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [isEmergencyInfoOpen, setIsEmergencyInfoOpen] = useState(true);
  const [isMedicalInfoOpen, setIsMedicalInfoOpen] = useState(true);
  const [isDevelopmentInfoOpen, setIsDevelopmentInfoOpen] = useState(true);
  const [isDailyRoutineOpen, setIsDailyRoutineOpen] = useState(true);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(true);

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const requiredFields = [
    { key: "name", label: "Name" },
    { key: "dob", label: "Date of Birth" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "nickname", label: "Nickname" },
    { key: "language", label: "Primary Language" },
    { key: "parentContact", label: "Parent's Contact" },
    { key: "blockFlatNo", label: "Block/Flat No" },
    { key: "emergencyRelation", label: "Emergency Contact Relation" },
    { key: "medicalInfo", label: "Medical Information" },
    { key: "allergies", label: "Allergies" },
    { key: "medicationDetails", label: "Medication Details" },
    { key: "medicationNeeds", label: "Medication Needs" },
    { key: "dietaryRestrictions", label: "Dietary Restrictions" },
    { key: "dailyRoutine", label: "Daily Routine" },
    { key: "sleepSchedule", label: "Sleep Schedule" },
    { key: "mealSchedule", label: "Meal Schedule and Favorite Meal" },
    { key: "snackPreference", label: "Snack Preference" },
    { key: "culturalPractices", label: "Cultural/Religious Practices" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect missing fields
    const missingFields = requiredFields
      .filter(({ key }) => !childData[key])
      .map(({ label }) => label);

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields:\n- ${missingFields.join("\n- ")}`);
      return;
    }

    try {
      await addDoc(collection(db, "children"), childData);
      alert("Child record added successfully!");
      setChildData({
        name: "",
        dob: "",
        bloodGroup: "",
        nickname: "",
        language: "",
        parentContact: "",
        blockFlatNo: "",
        emergencyContact: "",
        emergencyRelation: "",
        medicalInfo: "",
        allergies: "",
        medicationDetails: "",
        medicationNeeds: "",
        dietaryRestrictions: "",
        developmentInfo: "",
        pottyTrained: "",
        sleepTrained: "",
        independentEating: "",
        previousDaycare: "",
        previousDaycareDetails: "",
        likesDislikes: "",
        enjoyableActivities: "",
        triggers: "",
        behaviorAffects: "",
        developmentNotes: "",
        dailyRoutine: "",
        sleepSchedule: "",
        mealSchedule: "",
        snackPreference: "",
        culturalPractices: "",
      });
    } catch (error) {
      alert("Error saving child record: " + error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Child Data
      </h2>

      {/* Basic Information Section */}
      {/* Basic Information Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5]">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              1
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Basic Information
            </h3>
          </div>
          <span className="text-[#565657]">{isBasicInfoOpen ? "▼" : "▲"}</span>
        </div>
        {isBasicInfoOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-[#565657] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={childData?.name || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter child's name"
              />
            </div>
            <div className="flex justify-between items-center w-full gap-2">
              <div className="w-1/2">
                <label className="block text-[#565657] mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={childData?.dob || ""}
                  onChange={handleChildChange}
                  className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-[#565657] mb-1">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={childData?.bloodGroup || ""}
                  onChange={handleChildChange}
                  className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                  placeholder="Enter blood group"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#565657] mb-1">Nickname</label>
              <input
                type="text"
                name="nickname"
                value={childData?.nickname || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter nickname"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Primary Language
              </label>
              <input
                type="text"
                name="language"
                value={childData?.language || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter primary language"
              />
            </div>
          </div>
        )}
      </div>

      {/* Emergency Details Section */}
      {/* Emergency Details Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5]">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsEmergencyInfoOpen(!isEmergencyInfoOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              2
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Emergency Details
            </h3>
          </div>
          <span className="text-[#565657]">
            {isEmergencyInfoOpen ? "▼" : "▲"}
          </span>
        </div>
        {isEmergencyInfoOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-[#565657] mb-1">Relationship</label>
              <input
                type="text"
                name="emergencyRelation"
                value={childData?.emergencyRelation || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter relationship with emergency contact"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Parent's Contact
              </label>
              <input
                type="text"
                name="parentContact"
                value={childData?.parentContact || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter parent's contact"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">Block/Flat No</label>
              <input
                type="text"
                name="blockFlatNo"
                value={childData?.blockFlatNo || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Enter block/flat number"
              />
            </div>
          </div>
        )}
      </div>

      {/* Medical Information Section */}
      {/* Medical Information Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5]">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsMedicalInfoOpen(!isMedicalInfoOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              3
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Medical Information
            </h3>
          </div>
          <span className="text-[#565657]">
            {isMedicalInfoOpen ? "▼" : "▲"}
          </span>
        </div>
        {isMedicalInfoOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-[#565657] mb-1">
                Medical Information
              </label>
              <textarea
                name="medicalInfo"
                value={childData?.medicalInfo || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 h-[40vw] rounded-xl w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type any keywords"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Does your child have any allergies
              </label>
              <input
                type="text"
                name="allergies"
                value={childData?.allergies || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type any known allergies"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Medication details of child
              </label>
              <input
                type="text"
                name="medicationDetails"
                value={childData?.medicationDetails || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the medication detail here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Medication needs, we must be aware of
              </label>
              <input
                type="text"
                name="medicationNeeds"
                value={childData?.medicationNeeds || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the medication needs here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Dietary restriction, we must be aware of
              </label>
              <input
                type="text"
                name="dietaryRestrictions"
                value={childData?.dietaryRestrictions || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the dietary restriction here"
              />
            </div>
          </div>
        )}
      </div>

      {/* Developmental Information Section */}
      {/* Developmental Information Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5]">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsDevelopmentInfoOpen(!isDevelopmentInfoOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              4
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Developmental Information
            </h3>
          </div>
          <span className="text-[#565657]">
            {isDevelopmentInfoOpen ? "▼" : "▲"}
          </span>
        </div>
        {isDevelopmentInfoOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-[#565657] mb-1">
                Developmental Information
              </label>
              <textarea
                name="developmentInfo"
                value={childData?.developmentInfo || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 h-[40vw] rounded-xl w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Describe developmental details"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child potty trained
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.pottyTrained === "Yes"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "pottyTrained", value: "Yes" },
                    })
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.pottyTrained === "No"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "pottyTrained", value: "No" },
                    })
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child sleep trained
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.sleepTrained === "Yes"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "sleepTrained", value: "Yes" },
                    })
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.sleepTrained === "No"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "sleepTrained", value: "No" },
                    })
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child able to eat independently
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.independentEating === "Yes"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "independentEating", value: "Yes" },
                    })
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.independentEating === "No"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "independentEating", value: "No" },
                    })
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child attended daycare before
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.previousDaycare === "Yes"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "previousDaycare", value: "Yes" },
                    })
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-full w-20 ${
                    childData.previousDaycare === "No"
                      ? "bg-[#D3F26A] text-[#565657]"
                      : "bg-[#5A5B5F] text-white"
                  }`}
                  onClick={() =>
                    handleChildChange({
                      target: { name: "previousDaycare", value: "No" },
                    })
                  }
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Previous daycare details
              </label>
              <input
                type="text"
                name="previousDaycareDetails"
                value={childData?.previousDaycareDetails || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the name, duration of enrollment here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child have any specific like or dislike
              </label>
              <input
                type="text"
                name="likesDislikes"
                value={childData?.likesDislikes || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the like and dislike here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Activities that the child enjoys doing
              </label>
              <input
                type="text"
                name="enjoyableActivities"
                value={childData?.enjoyableActivities || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the activities here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Any triggers that usually lead to outbursts or meltdowns, with
                calming strategy
              </label>
              <input
                type="text"
                name="triggers"
                value={childData?.triggers || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the trigger and calming strategy here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Child behaviour that affects other children
              </label>
              <input
                type="text"
                name="behaviorAffects"
                value={childData?.behaviorAffects || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the behaviour like hitting, biting here"
              />
            </div>
            <div>
              <label className="block text-[#565657] mb-1">
                Information regarding child development, learning style that you
                like us to know
              </label>
              <input
                type="text"
                name="developmentNotes"
                value={childData?.developmentNotes || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
          </div>
        )}
      </div>

      {/* Daily Routine Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5] mt-6">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsDailyRoutineOpen(!isDailyRoutineOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              5
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Daily Routine
            </h3>
          </div>
          <span className="text-[#565657]">
            {isDailyRoutineOpen ? "▼" : "▲"}
          </span>
        </div>
        {isDailyRoutineOpen && (
          <div className="p-4 space-y-4 bg-[#F6F5F5]">
            <div>
              <label className="block mb-1 text-[#565657]">
                Daily Routine of child
              </label>
              <input
                type="text"
                name="dailyRoutine"
                value={childData?.dailyRoutine || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Child sleep schedule
              </label>
              <input
                type="text"
                name="sleepSchedule"
                value={childData?.sleepSchedule || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Child meal schedule and fav meal
              </label>
              <input
                type="text"
                name="mealSchedule"
                value={childData?.mealSchedule || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Child meal or snacks preference
              </label>
              <input
                type="text"
                name="snackPreference"
                value={childData?.snackPreference || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Any Cultural or religious practice
              </label>
              <input
                type="text"
                name="culturalPractices"
                value={childData?.culturalPractices || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="border rounded-lg overflow-hidden bg-[#F6F5F5] mt-6">
        <div
          className="flex items-center justify-between cursor-pointer p-3 bg-[#F6F5F5]"
          onClick={() => setIsAdditionalInfoOpen(!isAdditionalInfoOpen)}
        >
          <div className="flex items-center">
            <span className="text-lg font-bold bg-[#D3F26A] text-[#565657] rounded-full w-6 h-6 flex items-center justify-center">
              6
            </span>
            <h3 className="ml-2 text-lg font-medium text-[#565657]">
              Additional Information
            </h3>
          </div>
          <span className="text-[#565657]">
            {isAdditionalInfoOpen ? "▼" : "▲"}
          </span>
        </div>
        {isAdditionalInfoOpen && (
          <div className="p-4 space-y-4 bg-[#F6F5F5]">
            <div>
              <label className="block mb-1 text-[#565657]">
                Child communication for feelings & needs
              </label>
              <input
                type="text"
                name="communicationNeeds"
                value={childData?.communicationNeeds || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Anything want to share with us
              </label>
              <input
                type="text"
                name="additionalNotes"
                value={childData?.additionalNotes || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#565657]">
                Your expectation from Mimansa Kids
              </label>
              <input
                type="text"
                name="expectations"
                value={childData?.expectations || ""}
                onChange={handleChildChange}
                className="p-2 border border-gray-300 rounded-full w-full focus:outline-none bg-[#F6F5F5] text-[#565657]"
                placeholder="Type the keyword here"
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Statement */}
      <div className="flex items-start mt-6">
        <input
          type="checkbox"
          className="mt-1"
          id="confirmationCheckbox"
          style={{ borderColor: colors.textColor }}
        />
        <label
          htmlFor="confirmationCheckbox"
          className="ml-2 text-sm"
          style={{ color: colors.textColor }}
        >
          I confirm that the information provided is accurate and complete to
          the best of my knowledge. I also consent to the daycare using this
          information to design a care and learning plan for my child.
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 rounded-full"
        style={{
          backgroundColor: colors.buttonBackground,
          color: "#565657",
          border: "none",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#A4D84B")}
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = colors.buttonBackground)
        }
      >
        Submit
      </button>
    </div>
  );
};

export default AddChildAndParentRecord;
