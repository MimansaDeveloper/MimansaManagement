import React from 'react';
import axios from 'axios';

const SendSummary = () => {
  // Define the data directly within the component
  const childName = "Alex";
  const attendance = "present"; // Could also be "absent"
  const parentPhoneNumber = "whatsapp:+919021369589"; // Replace with the actual number in Twilio format
  
  const summaryData = {
    inTime: "9:00 AM",
    outTime: "4:00 PM",
    diaperChanges: 3,
    foodStatus: "all",
    sleepInfo: "slept from 1:00 PM to 2:30 PM",
    feeling: "happy",
    teacherNote: "Participated actively in all activities.",
  };

  const handleSendSummary = async () => {
    const today = new Date().toLocaleDateString();

    // Create the message based on attendance status
    const message =
      attendance === "absent"
        ? `Greetings from Mimansa Kids, just checking in to see if everything is alright with ${childName} today as he/she was absent - please let us know if there’s anything we can help with!`
        : `Greetings from Mimansa Kids, this is a summary of your child’s day at our center for ${today}.\n\n${childName} came in at ${summaryData.inTime} and left at ${summaryData.outTime}. Diaper was changed ${summaryData.diaperChanges} times. ${childName} ate ${summaryData.foodStatus} of food provided. ${summaryData.sleepInfo ? `${childName} slept from ${summaryData.sleepInfo}` : `${childName} did not sleep.`} ${childName} was feeling ${summaryData.feeling}.\n\nHere’s additional information from our Head Teacher: ${summaryData.teacherNote}\n\nHave a great day!`;

    // Send message using Twilio API
    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${import.meta.env.VITE_TWILIO_ACCOUNT_SID}/Messages.json`,
        new URLSearchParams({
          Body: message,
          From: 'whatsapp:+14155238886', // Twilio Sandbox number for WhatsApp
          To: parentPhoneNumber,
        }),
        {
          auth: {
            username: import.meta.env.VITE_TWILIO_ACCOUNT_SID,
            password: import.meta.env.VITE_TWILIO_AUTH_TOKEN,
          },
        }
      );
      alert("Summary sent successfully!");
      console.log("Message sent:", response.data);
    } catch (error) {
      alert("Error sending summary: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Send Daily Summary</h2>
      <p>Send a daily summary message to {childName}'s parents via WhatsApp.</p>
      <button
        onClick={handleSendSummary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Send Summary
      </button>
    </div>
  );
};

export default SendSummary;
