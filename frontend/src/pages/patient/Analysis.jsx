import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getScanResult } from "../../services/scanService";
import { getAssetUrl } from "../../services/api";

function Analysis() {
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getScanResult(scanId);
        setScan(res.data.scan);
        setPrediction(res.data.prediction);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load analysis result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [scanId]);

  if (loading) return <p className="text-neutral-500">Loading analysis...</p>;

  if (error) {
    return (
      <div>
        <p className="text-sm text-danger-600">{error}</p>
        <Link to="/patient/upload" className="mt-2 inline-block font-medium text-primary-600 hover:text-primary-700">
          Try uploading again
        </Link>
      </div>
    );
  }

  if (!scan || !prediction || scan.status !== "completed") {
    return <p className="text-neutral-500">Analysis is still processing. Please check back shortly.</p>;
  }

  const confidencePercent = Math.round(prediction.confidence * 100);

  return (
    <div>
      <h1 className="page-heading">MRI Analysis</h1>

      <div className="card mt-6 flex flex-col gap-8 sm:flex-row">
        <div>
          <p className="text-sm text-neutral-500">Prediction</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{prediction.predictedClass}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-500">Model Confidence</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{confidencePercent}%</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-neutral-500">Original MRI</p>
          <img
            src={getAssetUrl(scan.imageUrl)}
            alt="Original MRI scan"
            className="max-h-72 w-full rounded-card border border-neutral-200 bg-white object-contain"
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-neutral-500">Grad-CAM Heatmap</p>
          {prediction.heatmapUrl ? (
            <img
              src={getAssetUrl(prediction.heatmapUrl)}
              alt="Grad-CAM heatmap"
              className="max-h-72 w-full rounded-card border border-neutral-200 bg-white object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="flex h-52 items-center justify-center rounded-card border border-dashed border-neutral-300 px-4 text-center text-sm text-neutral-400"
            style={{ display: prediction.heatmapUrl ? "none" : "flex" }}
          >
            Heatmap not available (mock AI service)
          </div>
        </div>
      </div>

      <div className="card mt-6 text-sm text-neutral-600">
        <p><span className="font-semibold text-neutral-800">Model:</span> {prediction.modelName}</p>
        <p className="mt-1"><span className="font-semibold text-neutral-800">Model Version:</span> {prediction.modelVersion}</p>
      </div>

      <button className="btn-secondary mt-6" disabled>
        Download Report (coming soon)
      </button>

      <div className="disclaimer-box mt-6">
        AI-generated result. This system is an academic/research prototype and
        does not provide medical diagnosis.
      </div>
    </div>
  );
}

export default Analysis;
