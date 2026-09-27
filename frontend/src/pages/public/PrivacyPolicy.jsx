import Reveal from "../../components/Reveal";

function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="page-heading">Privacy Policy</h1>
        <p className="page-subheading">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-600">
          <p>
            BrainScan AI is an academic, final-year college project built for
            research and demonstration purposes. This page explains, in plain
            terms, what information the system collects and how it's used.
          </p>

          <div>
            <h2 className="font-semibold text-neutral-900">What we collect</h2>
            <p className="mt-2">
              When you register, we store your name, email address, and a securely
              hashed version of your password (never the password itself). If you
              upload an MRI scan, we store the image file and the AI-generated
              prediction associated with your account.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">How it's used</h2>
            <p className="mt-2">
              Your data is used only to provide the features of this application —
              showing you your own scan history, letting a doctor review your
              scans, and generating reports. It is not sold, shared with third
              parties, or used for any purpose outside this project.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">Data security</h2>
            <p className="mt-2">
              Passwords are hashed before storage, access to patient data is
              restricted by role (patient, doctor, admin), and the application
              uses standard security practices appropriate for an academic
              prototype. However, as a student project, it has not undergone a
              professional security audit and should not be used with real,
              sensitive medical data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">Your data</h2>
            <p className="mt-2">
              Since this is a project built for demonstration, you can request
              your account and associated data be deleted at any time by
              contacting the project team via the Contact page.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default PrivacyPolicy;
