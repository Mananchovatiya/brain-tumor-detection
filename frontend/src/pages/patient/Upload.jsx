import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadScan, analyzeScan } from "../../services/scanService";

const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE_MB = 10;

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | done
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setError("");

    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Please upload a valid MRI image (JPG or PNG).");
      setFile(null);
      setPreview(null);
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds the allowed limit of ${MAX_SIZE_MB}MB.`);
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an MRI image first.");
      return;
    }

    try {
      setStatus("uploading");
      const uploadRes = await uploadScan(file);
      const scanId = uploadRes.data.scan._id;

      setStatus("processing");
      await analyzeScan(scanId);

      setStatus("done");
      navigate(`/patient/analysis/${scanId}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to analyze this scan. Please try again."
      );
      setStatus("idle");
    }
  };

  return (
    <div>
      <h1 className="page-heading">Upload MRI Scan</h1>
      <p className="page-subheading">
        Select a brain MRI image (JPG or PNG, max {MAX_SIZE_MB}MB) to begin analysis.
      </p>

      <div className="card mt-6 max-w-md border-2 border-dashed border-neutral-300 text-center">
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full text-sm text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100"
        />

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="MRI preview"
              className="mx-auto max-h-64 rounded-lg"
            />
          </div>
        )}

        {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={status === "uploading" || status === "processing"}
          className="btn-primary mt-5 w-full"
        >
          {status === "uploading" && "Uploading..."}
          {status === "processing" && "Analyzing..."}
          {(status === "idle" || status === "done") && "Upload & Analyze"}
        </button>
      </div>
    </div>
  );
}

export default Upload;
