import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Questions about coaching, plans, or anything else — send us a message and we'll reply by email."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
