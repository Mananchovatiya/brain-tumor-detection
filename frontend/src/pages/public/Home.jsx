import { Link } from "react-router-dom";
import { Upload, Brain, Eye, Stethoscope, ArrowRight, User, FlaskConical } from "lucide-react";
import Reveal from "../../components/Reveal";

const features = [
  {
    icon: Upload,
    title: "Upload MRI",
    description: "Patients upload a brain MRI scan through a simple, guided form.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "A deep learning model classifies the scan as Glioma, Meningioma, Pituitary Tumor, or No Tumor.",
  },
  {
    icon: Eye,
    title: "Visual Explanation",
    description:
      "A Grad-CAM heatmap highlights the region the model focused on when making its prediction.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Review",
    description: "Doctors can review scans, add notes, and generate a report for each patient.",
  },
];

const audiences = [
  {
    icon: User,
    title: "Patients",
    description:
      "Upload your MRI scans, track your scan history in one place, and get results faster — with everything organized for your next doctor visit.",
  },
  {
    icon: Stethoscope,
    title: "Doctors",
    description:
      "Use AI-generated predictions as a supporting second opinion, review scans with visual explanations, and streamline how you document findings.",
  },
  {
    icon: FlaskConical,
    title: "Researchers & Students",
    description:
      "Explore how deep learning and explainable AI (Grad-CAM) can be applied to medical imaging, in a fully working end-to-end platform.",
  },
];

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <section className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            AI-Based Brain MRI Analysis
          </h1>
          <p className="mt-4 text-lg text-neutral-500">
            Upload a brain MRI scan and get an AI-generated tumor classification
            with confidence score and visual explanation — built as a final
            year college project.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link
              to="/brain-tumors"
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-600 hover:text-primary-600"
            >
              Learn about brain tumors <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Reveal>

      <section className="mt-24">
        <Reveal>
          <h2 className="page-heading text-center">What This System Does</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 100}>
              <div className="card h-full transition-shadow hover:shadow-card-hover">
                <div className="mb-3 inline-flex rounded-lg bg-primary-50 p-2.5">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <Reveal>
          <h2 className="page-heading text-center">Who It's For</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {audiences.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 100}>
              <div className="card h-full">
                <div className="mb-3 inline-flex rounded-lg bg-primary-50 p-2.5">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="card mt-24 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-semibold text-neutral-900">Want to learn more about brain tumors?</h2>
            <p className="mt-1 text-sm text-neutral-500">
              A brief overview of tumor types, symptoms, and why MRI matters.
            </p>
          </div>
          <Link to="/brain-tumors" className="btn-secondary flex-shrink-0">
            Read the Overview
          </Link>
        </section>
      </Reveal>
    </div>
  );
}

export default Home;
