import { useEffect, useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../config/api";

const FileUpload = ({
  label = "Choisir un fichier",
  endpoint = "",
  accept = "*/*",
  preview = false,
  value = null,
  onFileSelect,
  weidth = "w-54"
}) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(value);

    useEffect(() => {
    setFileUrl(value);
    }, [value]);

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLOUDINARY.UPLOAD}/${endpoint}`
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // aperçu local
    if (preview) {
      setFileUrl(URL.createObjectURL(file));
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFileUrl(data.url);

      // renvoie l'url cloudinary au parent
      onFileSelect(data.url);

    } catch (error) {
      console.error(error);
      alert("Erreur lors du téléchargement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">

      <label className="font-medium">{label}</label>

      {preview && (
        <div className={`${weidth} h-32 bg-slate-400 border rounded-lg overflow-hidden flex items-center justify-center`} > 

          {fileUrl ? (
            <img
              src={fileUrl}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">
              Aucune image
            </span>
          )}

        </div>
      )}

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
      />

      {loading && (
        <p className="text-sm text-blue-500">
          Téléchargement...
        </p>
      )}

    </div>
  );
};

export default FileUpload;