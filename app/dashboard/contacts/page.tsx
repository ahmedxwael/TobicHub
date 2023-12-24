import NotFound from "@/components/not-found";
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
      <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
        Contact Users
      </h1>
      {contacts.length > 0 ? (
        <div className="relative mt-12 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-10 text-center text-xl font-bold">
          There are no contact messages yet
        </div>
      )}
    </section>
  );
}
