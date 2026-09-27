import { useEffect, useState } from "react";
import { getUsers, createUser } from "../../services/adminService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDoctors = async () => {
    try {
      const res = await getUsers("doctor");
      setDoctors(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await createUser({ ...form, role: "doctor" });
      setSuccess(`Doctor account created for ${form.name}.`);
      setForm({ name: "", email: "", password: "" });
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create doctor account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="page-heading">Doctors</h1>

      <h2 className="page-heading mt-8 text-lg">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="card mt-3 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label htmlFor="password" className="form-label">Temporary Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required className="input-field" />
        </div>

        {error && <p className="text-sm text-danger-600">{error}</p>}
        {success && <p className="text-sm text-success-600">{success}</p>}

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Creating..." : "Add Doctor"}
        </button>
      </form>

      <h2 className="page-heading mt-10 text-lg">Existing Doctors</h2>
      {loading ? (
        <p className="mt-3 text-neutral-500">Loading doctors...</p>
      ) : (
        <div className="mt-3 overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-neutral-400">
                    No doctors yet.
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Doctors;
