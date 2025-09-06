export interface Contact {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: "online" | "away" | "offline";
  }