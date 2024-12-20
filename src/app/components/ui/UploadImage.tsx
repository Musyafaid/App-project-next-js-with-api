import { useState } from 'react';

interface ImageUploaderProps {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setFile }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">Profile Picture</label>
      <input
        type="file"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageSrc && (
        <div className="mt-2">
          <img
            src={imageSrc}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
