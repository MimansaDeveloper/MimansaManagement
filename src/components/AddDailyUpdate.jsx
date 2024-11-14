import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { FiUploadCloud } from "react-icons/fi";
import {
  collection,
  addDoc,
  doc,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { uploadToCloudinary } from "../utils/cloudinary";
import TimePicker from "react-time-picker";
import { useParams } from "react-router-dom";

const AddDailyUpdate = () => {
  const { childId } = useParams(); // Get the childId from the URL
  const [updateData, setUpdateData] = useState({
    childId: "",
    inTime: "",
    outTime: "",
    food: { snacks: "", meal: "" },
    diaperChanges: { count: "", poops: "" },
    sleep: { from: "", until: "" },
    mood: "",
    photos: [],
    notes: "",
    status: "Present",
  });
  const [files, setFiles] = useState([]);
  const [warning, setWarning] = useState(null);
  const [children, setChildren] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(imageFiles);
  };

  useEffect(() => {
    const fetchChildren = async () => {
      // Query Firestore to get the list of children
      const childrenQuery = query(collection(db, "children"));
      const querySnapshot = await getDocs(childrenQuery);
      const childrenList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChildren(childrenList); // Update the children list in state

      // Prefill form if childId exists in the URL or is selected
      if (childId) {
        const child = childrenList.find((child) => child.id === childId);
        if (child) {
          // Update the state with the child's inTime and name
          setUpdateData((prevData) => ({
            ...prevData,
            childId: child.id, // Set the child ID
            childName: child.name, // Set the child's name
            inTime: child.inTime, // Set the child's inTime
            status: "Present", // Set the default status to "Present"
          }));
          console.log(child.inTime);
          console.log(child.name);
          console.log(child.id);
        }
      }
    };

    fetchChildren(); // Call the fetch function
  }, [childId]); // Dependency on childId to trigger the effect when the child is selected

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

  // const handleFileChange = (e) => {
  //   setFiles([...files, ...e.target.files]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updateData.childId) {
      setWarning("Please select a child from the list.");
      return;
    }

    try {
      const uploadedPhotoURLs = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );
      const dataToSave = { ...updateData, photos: uploadedPhotoURLs };

      const docRef = await addDoc(collection(db, "dailyUpdates"), dataToSave);
      const dailyUpdateId = docRef.id;

      const childDocRef = doc(db, "children", updateData.childId);
      await updateDoc(childDocRef, {
        dailyUpdates: arrayUnion(dailyUpdateId),
      });

      alert("Daily update added successfully!");
      resetForm();
    } catch (error) {
      alert("Error saving daily update: " + error.message);
    }
  };

  const resetForm = () => {
    setUpdateData({
      childId: "", // To store the selected child's ID
      childName: "", // Add this to store the child's name
      inTime: "",
      outTime: "",
      food: { snacks: "", meal: "" },
      diaperChanges: { count: "", poops: "" },
      sleep: { from: "", until: "" },
      mood: "",
      photos: [],
      notes: "",
      status: "Present",
    });
    setFiles([]);
    setWarning(null);
  };

  return (
    <div className="flex flex-col p-6 mx-auto bg-white shadow-lg rounded-2xl w-full max-w-lg mt-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z"
            fill="#565657"
          />
        </svg>

        <h2 className="text-center text-2xl font-semibold  text-gray-700">
          Daily Updates
        </h2>
        <button className="bg-[#D3F26A] py-[2vw] px-[8vw] rounded-md">
          Edit
        </button>
      </div>
      {warning && (
        <div className="text-red-500 text-center mb-4 font-medium">
          {warning}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        {/* Select Child */}
        <div className="w-full flex flex-col justify-center">
          <label className="block font-semibold text-gray-600 mb-2">Name</label>
          <select
            name="childId"
            value={updateData.childId}
            onChange={handleChange}
            className="w-full p-[4vw]  rounded-2xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            required
          >
            <option value="">Select a child</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
          {/* <label className="block font-semibold text-gray-600 mb-2">Child's Name</label>
    <input
      type="text"
      name="childName"
      value={updateData.childName}  // Prefilled with child's name
      disabled  // Make it disabled since it's just for display
      className="w-full p-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
    /> */}
        </div>

        {/* In and Out Times */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-full justify-center">
            <label className="block font-semibold text-gray-600 mb-2">In</label>
            <select
              name="inTime"
              value={updateData.inTime}
              onChange={handleChange}
              className="w-full p-[3vw] rounded-2xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              required
            >
              <option value="" className="text-gray-500 font-semibold">
                {updateData.inTime =="" ? "Select Time" : updateData.inTime}
                
              </option>
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col w-full justify-center">
            <label className="block font-semibold text-gray-600 mb-2">
              Out
            </label>
            <select
              name="outTime"
              value={updateData.outTime}
              onChange={handleChange}
              className="w-full p-[3vw] rounded-2xl  border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              required
            >
              <option value="">Select Time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Food Section Childs Snack*/}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Child Ate - Snacks
          </label>
          <div className="flex justify-center items-center gap-2">
            {["All", "Some", "None"].map((option) => (
              <button
                type="button"
                className={`px-4 py-2 w-full rounded-full border text-white font-medium border-gray-300 transition ${
                  updateData.food.snacks === option.toLowerCase()
                    ? "bg-lime-500 text-[#5A5B5F]"
                    : "bg-[#5A5B5F] text-gray-600"
                }`}
                onClick={() =>
                  setUpdateData({
                    ...updateData,
                    food: { ...updateData.food, snacks: option.toLowerCase() },
                  })
                }
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Food Section Childs Meal */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Child Ate - Meal
          </label>
          <div className="flex w-full justify-between  items-center gap-2">
            {["All", "Some", "None"].map((option) => (
              <button
                type="button"
                className={`px-4 py-2 w-full rounded-full border font-medium  text-white border-gray-300 transition ${
                  updateData.food.meal === option.toLowerCase()
                    ? "bg-lime-500 text-[#5A5B5F]"
                    : "bg-[#5A5B5F] text-gray-600"
                }`}
                onClick={() =>
                  setUpdateData({
                    ...updateData,
                    food: { ...updateData.food, meal: option.toLowerCase() },
                  })
                }
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Sleep */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Child slept
          </label>
          <div className="flex gap-2">
            <div className="flex justify-center w-full flex-col">
              <label className="block text-gray-600">From</label>
              <input
                type="time"
                name="sleep.from"
                value={updateData.sleep.from}
                onChange={handleChange}
                placeholder="From"
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-center w-full flex-col">
              <label className="block text-gray-600">To</label>
              <input
                type="time"
                name="sleep.until"
                value={updateData.sleep.until}
                onChange={handleChange}
                placeholder="Until"
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Diaper Changes */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2 ">
            Child Diaper Was Changed
          </label>
          <div className="flex gap-2">
            <div className="flex justify-center w-full flex-col">
              <label className="block text-gray-600">No of times</label>
              <select
                name="diaperChanges.count"
                value={updateData.diaperChanges.count}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              >
                {/* Options for No of times */}
                <option value="" disabled>
                  Select count
                </option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center w-full flex-col">
              <label className="block text-gray-600">No of poops</label>
              <select
                name="diaperChanges.poops"
                value={updateData.diaperChanges.poops}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              >
                {/* Options for No of poops */}
                <option value="" disabled>
                  Select count
                </option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Child was feeling
          </label>
          <select
            name="mood"
            value={updateData.mood}
            onChange={handleChange}
            className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          >
            <option value="">Select Mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="playful">Playful</option>
            {/* Add more moods as needed */}
          </select>
        </div>
        {/* Mood Selector */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Child was feeling
          </label>
          <div className="flex gap-3">
            {[
              { mood: "happy", emoji: "😊" },
              { mood: "sad", emoji: "😢" },
              { mood: "playful", emoji: "😜" },
              { mood: "excited", emoji: "😆" }, // Add more moods as needed
              { mood: "tired", emoji: "😴" },
            ].map(({ mood, emoji }) => (
              <button
                key={mood}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "mood", value: mood } })
                }
                className={`p-3 rounded-full border ${
                  updateData.mood === mood
                    ? "border-lime-500"
                    : "border-gray-300"
                } focus:outline-none hover:border-lime-500 text-2xl`}
                aria-label={mood}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Photos */}
        {/* <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 h-[40vw] rounded-3xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div> */}

        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Photos
          </label>

          {/* Custom Upload Area */}
          <div
            className="w-full p-6 h-[40vw] max-h-[300px] rounded-3xl border border-gray-500 border-dashed
                   focus-within:ring-2 focus-within:ring-lime-500 focus-within:outline-none
                   flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer
                   hover:bg-gray-50 transition duration-200"
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FiUploadCloud className="text-4xl mb-2 text-lime-500" />
              <span className="text-sm">
                Drag & Drop your photos here or click to browse
              </span>
              <span className="text-xs text-gray-400 mt-1">
                (Max size: 5MB per photo)
              </span>
            </label>
          </div>

          {/* Image Previews */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-full h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  <button
                    onClick={() => {
                      setSelectedImages(
                        selectedImages.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-1 opacity-75 hover:opacity-100"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div>
          <label className="block font-semibold text-gray-600 mb-2">
            Teacher’s note
          </label>
          <textarea
            name="notes"
            value={updateData.notes}
            onChange={handleChange}
            placeholder="Type any keywords"
            className="w-full p-3 h-[40vw] rounded-3xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-lime-500 text-white font-semibold rounded-full transition hover:bg-lime-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDailyUpdate;
