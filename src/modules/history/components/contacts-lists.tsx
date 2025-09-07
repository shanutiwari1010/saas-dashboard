import { CONTACTS_DATA } from "@/modules/history/data/contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ContactsLists() {
  return (
    <div className="m-5 mt-0">
      <h3 className="heading mb-2 py-2">Contacts</h3>
      <div className="space-y-3">
        {CONTACTS_DATA.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="text-xs">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="truncate text-sm font-light">{contact.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
