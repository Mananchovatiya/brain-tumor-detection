import Reveal from "../../components/Reveal";

const tumorTypes = [
  {
    name: "Glioma",
    description:
      "Gliomas develop from glial cells, which support and protect neurons in the brain and spinal cord. They vary widely in growth rate and severity, ranging from slow-growing to aggressive forms, and are among the most common types of primary brain tumors.",
  },
  {
    name: "Meningioma",
    description:
      "Meningiomas arise from the meninges, the layers of tissue that surround and protect the brain and spinal cord. Most meningiomas are slow-growing and non-cancerous (benign), though their location can still cause symptoms by pressing on nearby brain tissue.",
  },
  {
    name: "Pituitary Tumor",
    description:
      "Pituitary tumors form in the pituitary gland, a small gland at the base of the brain that regulates hormone production. Most are benign, but they can affect hormone levels and, depending on size, put pressure on nearby structures like the optic nerves.",
  },
];

const commonSymptoms = [
  "Persistent or worsening headaches",
  "Seizures, especially if new and unexplained",
  "Vision, hearing, or speech changes",
  "Balance or coordination difficulties",
  "Unexplained nausea or vomiting",
  "Changes in personality, memory, or concentration",
];

function BrainTumors() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="page-heading">Understanding Brain Tumors</h1>
        <p className="page-subheading">
          A brief, general overview of what brain tumors are, the main types
          this system is designed to recognize, and why early detection matters.
        </p>
      </Reveal>

      <Reveal>
        <div className="card mt-8">
          <h2 className="font-semibold text-neutral-900">What is a brain tumor?</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            A brain tumor is a mass of abnormal cells growing in or around the
            brain. Tumors can be benign (non-cancerous) or malignant
            (cancerous), and their effects depend heavily on size, growth
            rate, and location — even a benign tumor can cause serious
            symptoms if it presses on a critical area of the brain.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="page-heading mt-12 text-lg">Types This System Recognizes</h2>
      </Reveal>
      <div className="mt-4 space-y-4">
        {tumorTypes.map((tumor, index) => (
          <Reveal key={tumor.name} delay={index * 100}>
            <div className="card">
              <h3 className="font-semibold text-primary-600">{tumor.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {tumor.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="page-heading mt-12 text-lg">Why MRI Matters</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Magnetic Resonance Imaging (MRI) is one of the most effective tools
          for detecting brain tumors, since it produces detailed images of
          soft tissue without radiation. Early detection through imaging can
          significantly influence treatment options and outcomes — which is
          the core motivation behind exploring AI-assisted MRI analysis in
          this project.
        </p>
      </Reveal>

      <Reveal>
        <h2 className="page-heading mt-12 text-lg">Common Symptoms to Be Aware Of</h2>
        <p className="mt-3 text-sm text-neutral-600">
          Symptoms vary widely depending on tumor type, size, and location.
          Some general warning signs include:
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {commonSymptoms.map((symptom) => (
            <li key={symptom} className="flex items-start gap-2 text-sm text-neutral-600">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
              {symptom}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <div className="disclaimer-box mt-12">
          This page is for general educational purposes only and is not
          medical advice. If you or someone you know is experiencing these
          symptoms, please consult a qualified healthcare professional.
        </div>
      </Reveal>
    </div>
  );
}

export default BrainTumors;
