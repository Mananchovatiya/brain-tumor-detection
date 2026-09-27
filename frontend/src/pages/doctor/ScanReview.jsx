import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScanResult } from "../../services/scanService";
import { saveReport, getReport } from "../../services/reportService";
import { getAssetUrl } from "../../services/api";

function ScanReview() {
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRes = await getScanResult(scanId);
        setScan(resultRes.data.scan);
        setPrediction(resultRes.data.prediction);

        // If a report already exists for this scan, preload the doctor's
        // previous notes so they can review/edit instead of starting blank.
        try {
          const reportRes = await getReport(scanId);
          setDoctorNotes(reportRes.data.report.doctorNotes || "");
          setRecommendation(reportRes.data.report.recommendation || "");
        } catch {
          // No report yet — form just starts empty.
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load scan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [scanId]);

  const handleSaveReport = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await saveReport(scanId, { doctorNotes, recommendation });
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save report.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-neutral-500">Loading scan...</p>;
  if (error) return <p className="text-sm text-danger-600">{error}</p>;

  const confidencePercent = Math.round(prediction.confidence * 100);

  return (
    <div>
      <h1 className="page-heading">Scan Review</h1>

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
          <div className="flex h-52 items-center justify-center rounded-card border border-dashed border-neutral-300 px-4 text-center text-sm text-neutral-400">
            Heatmap not available (mock AI service)
          </div>
        </div>
      </div>

      <h2 className="page-heading mt-8 text-lg">Doctor Review</h2>
      <form onSubmit={handleSaveReport} className="card mt-3 max-w-xl space-y-4">
        <div>
          <label htmlFor="doctorNotes" className="form-label">Notes</label>
          <textarea
            id="doctorNotes"
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="Clinical observations, comparison with prior scans, etc."
            required
            rows={3}
            className="input-field resize-y"
          />
        </div>
        <div>
          <label htmlFor="recommendation" className="form-label">Recommendation</label>
          <textarea
            id="recommendation"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            placeholder="Suggested next steps for the patient"
            required
            rows={3}
            className="input-field resize-y"
          />
        </div>

        {saved && <p className="text-sm text-success-600">Report saved successfully.</p>}

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Report"}
        </button>
      </form>

      <div className="disclaimer-box mt-6">
        AI-generated result. This system is an academic/research prototype and
        does not provide medical diagnosis.
      </div>
    </div>
  );
}

export default ScanReview;
