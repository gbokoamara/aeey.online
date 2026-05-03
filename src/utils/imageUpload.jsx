

import { useState } from "react";

const ImageUpload = ({onImageSelect}) => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      onImageSelect(imageUrl); //  envoie au parent
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      
      {/* Preview */}
      <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden ">
        {image ? (
          <img
            src={image}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">
            Ajouter image
          </span>
        )}
      </div>

      {/* Input file */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="text-sm cursor-pointer"
      />
    </div>
  );
};

export default ImageUpload;