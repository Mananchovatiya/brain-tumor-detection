import Accordion from "../../components/Accordion";
import Reveal from "../../components/Reveal";

const faqItems = [
  {
    question: "Does this provide an actual medical diagnosis?",
    answer:
      "No. BrainScan AI is an academic prototype built for a final year college project. Its predictions are for demonstration purposes only and should never be treated as a medical diagnosis. Always consult a qualified healthcare professional.",
  },
  {
    question: "How accurate is the AI model?",
    answer:
      "Accuracy depends on the specific model and dataset used by the AI/ML team. Since this is a research/academic project, the model has not been clinically validated and its confidence score should be interpreted as a demonstration of the technique, not a guarantee of correctness.",
  },
  {
    question: "Is my uploaded data secure?",
    answer:
      "Passwords are hashed, access is restricted by role (patient, doctor, admin), and basic security practices are followed. That said, as a student project it hasn't undergone a professional security audit — please avoid uploading real, sensitive medical images.",
  },
  {
    question: "Can a real doctor review my scan?",
    answer:
      "Within this platform, 'doctor' accounts are demo accounts created for the project, not licensed physicians reviewing real patients. The review and reporting workflow is built to demonstrate how such a system could work in a real clinical setting.",
  },
  {
    question: "What tumor types can the system classify?",
    answer:
      "The model is designed to classify scans into four categories: Glioma, Meningioma, Pituitary Tumor, or No Tumor.",
  },
];

const techStack = [
  { title: "Frontend", value: "React.js + Vite" },
  { title: "Backend", value: "Node.js + Express.js" },
  { title: "Database", value: "MongoDB (Atlas)" },
  { title: "AI Service", value: "Python FastAPI + Deep Learning Model" },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h1 className="page-heading">About This Project</h1>
        <p className="mt-4 text-neutral-600">
          <strong className="text-neutral-900">BrainScan AI</strong> is a final year college project built by
          a 5-member team: three members focused on full-stack web development
          and two members focused on AI/ML.
        </p>
        <p className="mt-4 text-neutral-600">
          The goal of this project is to demonstrate how a deep learning model
          trained on brain MRI scans can be integrated into a real, usable web
          application — covering the full workflow from patient upload to
          doctor review and report generation.
        </p>
      </Reveal>

      <Reveal>
        <h2 className="page-heading mt-12">Technology Used</h2>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map((tech, index) => (
          <Reveal key={tech.title} delay={index * 100}>
            <div className="card h-full">
              <h3 className="font-semibold text-neutral-900">{tech.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{tech.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="page-heading mt-12">Responsible AI &amp; Limitations</h2>
        <div className="card mt-4">
          <p className="text-sm leading-relaxed text-neutral-600">
            The AI model in this project is trained on a limited, publicly
            available dataset and has not been clinically validated. Its
            predictions can be affected by image quality, scan positioning,
            and how well the training data represents real-world cases.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            For this reason, the platform is deliberately designed around a{" "}
            <strong className="text-neutral-900">doctor review step</strong> —
            the AI's output is meant to support, not replace, a qualified
            professional's judgment. Confidence scores indicate how certain
            the model is about its own prediction, not how likely a diagnosis
            is to be medically correct.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="page-heading mt-12">Frequently Asked Questions</h2>
        <div className="mt-4">
          <Accordion items={faqItems} />
        </div>
      </Reveal>
    </div>
  );
}

export default About;
