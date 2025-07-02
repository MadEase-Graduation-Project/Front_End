import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book an appointment on MedEase?",
    answer:
      "You can book an appointment by signing in, choosing a doctor, selecting a time slot, and confirming the booking in just a few clicks.",
  },
  {
    question: "Are online consultations available 24/7?",
    answer:
      "Yes! MedEase provides round-the-clock access to certified doctors for instant medical advice through our AI-powered platform.",
  },
  {
    question: "Is my medical data secure with MedEase?",
    answer:
      "Absolutely. We use end-to-end encryption and follow HIPAA-compliant standards to ensure your data is safe and private.",
  },
  {
    question: "Can I access my prescriptions and reports digitally?",
    answer:
      "Yes, all your medical documents are securely stored in your profile and can be accessed or downloaded anytime.",
  },
  {
    question: "Is there a MedEase mobile app?",
    answer:
      "We are currently developing a mobile app for both Android and iOS. Meanwhile, you can use our fully responsive website on any device.",
  },
];

const FaqSection = () => {
  return (
    <section className="w-full pt-5 pb-16 px-6 sm:px-12 ">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-menavy text-2xl sm:text-3xl font-jost font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base font-jost">
            Everything you need to know about using MedEase.
          </p>
        </div>

        {/* Accordion Block */}
        <div className="bg-meblue rounded-2xl shadow-md border border-gray-200 px-4 sm:px-6">
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-gray-200"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="py-2 group"
              >
                <AccordionTrigger
                  className="text-left text-menavy font-jost font-semibold text-sm sm:text-base hover:no-underline 
              [&>svg]:transition-all [&>svg]:duration-300 
              data-[state=open]:[&>svg]:rotate-180 
              group-hover:[&>svg]:text-mepale 
              group-hover:[&>svg]:drop-shadow-[0_0_10px_#5C7DC5] 
              group-hover:[&>svg]:scale-110"
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="pt-2 text-gray-700 text-sm sm:text-base font-jost leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
