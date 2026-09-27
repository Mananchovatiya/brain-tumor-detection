import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getScans } from "../../services/scanService";
import { SkeletonTable } from "../../components/Skeleton";

function History() {
  const [scans, setScans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await getScans();
        setScans(res.data.scans);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load scan history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const badgeClass = (status) => {
    const map = {
      uploaded: "badge-info",
      processing: "badge-warning",
      completed: "badge-success",
      failed: "badge-danger",
    };
    return map[status] || "badge-info";
  };

  if (loading) {
    return (
      <div>
        <h1 className="page-heading">Scan History</h1>
        <p className="page-subheading">
          All MRI scans you've uploaded, along with their analysis status.
        </p>
        <div className="mt-6 overflow-x-auto">
          <SkeletonTable columns={4} rows={4} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-heading">Scan History</h1>
      <p className="page-subheading">
        All MRI scans you've uploaded, along with their analysis status.
      </p>

      {error && <p className="mt-4 text-sm text-danger-600">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Scan ID</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scans.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-neutral-400">
                  No scans uploaded yet.
                </td>
              </tr>
            ) : (
              scans.map((scan) => (
                <tr key={scan._id}>
                  <td>{scan.scanId}</td>
                  <td>{new Date(scan.uploadDate).toLocaleDateString()}</td>
                  <td>
                    <span className={badgeClass(scan.status)}>{scan.status}</span>
                  </td>
                  <td>
                    {scan.status === "completed" ? (
                      <Link
                        to={`/patient/analysis/${scan._id}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        View Result
                      </Link>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
