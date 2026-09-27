import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, getMe } from "../../services/authService";

// Computes age from a date-of-birth string (YYYY-MM-DD). Returns null if
// no DOB is set, so the UI can show "—" instead of a wrong number.
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

// Formats an ISO date string into an <input type="date"> friendly value (YYYY-MM-DD).
function toDateInputValue(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toISOString().split("T")[0];
}

function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
  });
  const [patientId, setPatientId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        const fetchedUser = res.data.user;
        setForm({
          name: fetchedUser.name || "",
          phone: fetchedUser.phone || "",
          dateOfBirth: toDateInputValue(fetchedUser.dateOfBirth),
          gender: fetchedUser.gender || "",
          address: fetchedUser.address || "",
          city: fetchedUser.city || "",
        });
        setPatientId(fetchedUser.patientId || "—");
        setEmail(fetchedUser.email || "");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await updateProfile(form);
      // Keep AuthContext (and localStorage, and the sidebar name) in sync
      // with the update — reuse login() since it already does exactly that,
      // just pass the existing token back along with the refreshed user.
      const token = localStorage.getItem("token");
      login(res.data.user, token);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-neutral-500">Loading profile...</p>;

  const age = calculateAge(form.dateOfBirth);

  return (
    <div>
      <h1 className="page-heading">My Profile</h1>
      <p className="page-subheading">Update your basic account information.</p>

      <div className="card mt-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Patient ID</label>
            <input
              value={patientId}
              disabled
              className="input-field cursor-not-allowed bg-neutral-50 text-neutral-400"
            />
          </div>

          <div>
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Age</label>
            <input
              value={age !== null ? age : "—"}
              disabled
              className="input-field cursor-not-allowed bg-neutral-50 text-neutral-400"
            />
            <p className="mt-1 text-xs text-neutral-400">Auto-calculated from date of birth.</p>
          </div>

          <div>
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              value={email}
              disabled
              className="input-field cursor-not-allowed bg-neutral-50 text-neutral-400"
            />
            <p className="mt-1 text-xs text-neutral-400">Email cannot be changed.</p>
          </div>

          <div>
            <label htmlFor="address" className="form-label">Address</label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Optional"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="city" className="form-label">City</label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Optional"
              className="input-field"
            />
          </div>

          {error && <p className="text-sm text-danger-600">{error}</p>}
          {success && <p className="text-sm text-success-600">{success}</p>}

          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
