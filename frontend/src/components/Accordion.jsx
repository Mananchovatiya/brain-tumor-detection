import { useState } from "react";
import { ChevronDown } from "lucide-react";

// A single expandable FAQ-style item. Multiple can be used together;
// each manages its own open/closed state independently.
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-neutral-900">{question}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-neutral-500">{answer}</p>
      </div>
    </div>
  );
}

// items: array of { question, answer }
function Accordion({ items }) {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

export default Accordion;
