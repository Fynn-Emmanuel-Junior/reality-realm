// ImageUploader.js
import { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{marginTop: "20px"}}>
      <h5> Upload Distributor logo </h5>
      <div style={{display: "flex",flexDirection: "row",border: "1px solid black"}}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
            {selectedImage && (
                <div>
                  <img src={selectedImage} alt="Selected" style={{ width: '100px', height: 'auto' }} />
                </div>

            )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
