import Reveal from "../../components/Reveal";

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="page-heading">Terms of Use</h1>
        <p className="page-subheading">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-600">
          <div>
            <h2 className="font-semibold text-neutral-900">Academic project disclaimer</h2>
            <p className="mt-2">
              BrainScan AI is a final-year college project created for academic
              and research purposes. It is not a certified medical device and
              has not been evaluated or approved by any medical or regulatory
              authority.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">No medical advice</h2>
            <p className="mt-2">
              Nothing on this platform constitutes medical advice, diagnosis, or
              treatment. AI-generated predictions are for demonstration purposes
              only. Always consult a qualified healthcare professional regarding
              any medical condition or concern.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">Acceptable use</h2>
            <p className="mt-2">
              This platform should only be used with non-sensitive, test, or
              sample data for demonstration purposes. Do not upload real
              confidential medical records or images of real patients without
              their informed consent.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900">No warranty</h2>
            <p className="mt-2">
              This project is provided "as is," without warranty of any kind,
              express or implied, including but not limited to accuracy,
              reliability, or fitness for a particular purpose.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Terms;
