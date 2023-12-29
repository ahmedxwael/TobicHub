import NoData from "@/components/no-data";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import ContactCard from "@/modules/dashboard/components/contact-card";
import { getContacts } from "@/utils/contact-utils";

export const revalidate = 0;

export default async function ContactsPage() {
  const contacts = await getContacts();

  if (!contacts) {
    return <NotFound message="Could not get the list of contacts." />;
  }

  return (
    <section className="w-full flex-col gap-10">
      <PageHeading>Contact Users</PageHeading>
      {contacts.length > 0 ? (
        <div className="relative mt-12 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <NoData message="No contact messages to show." />
      )}
    </section>
  );
}
