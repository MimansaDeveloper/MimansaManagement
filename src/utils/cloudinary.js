// src/utils/cloudinary.js
export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Ensure this is set up
  
    const response = await fetch('https://api.cloudinary.com/v1_1/dqaegpt7v/image/upload', {
        method: 'POST',
        body: formData,
      });
      
  
    const data = await response.json();
    return data.secure_url;
  };
  