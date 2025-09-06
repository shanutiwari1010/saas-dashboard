import type { IActivity } from "../interfaces/activity";

export const activities: IActivity[] = [
  {
    id: 1,
    title: "You have a bug that needs to be fixed",
    timestamp: new Date(),
    image: "/avatars/john-doe.svg",
    type: "bug",
    user: { name: "System", avatar: "/avatars/system.svg" },
    isRead: false,
  },
  {
    id: 2,
    title: "Released a new version",
    timestamp: new Date(Date.now() - 1000 * 60 * 59), // 59 minutes ago
    image: "/avatars/rebecca-clarke.svg",
    type: "release",
    user: { name: "Dev Team", avatar: "/avatars/dev-team.svg" },
  },
  {
    id: 3,
    title: "Submitted a bug",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    image: "/avatars/sofia-delgado.svg",
    type: "bug",
    user: { name: "John Doe", avatar: "/avatars/john-doe.svg" },
  },
  {
    id: 4,
    title: "Modified A data in Page X",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    image: "public/avatars/ryan-mercer.svg",
    type: "edit",
    user: { name: "Admin", avatar: "/avatars/admin.svg" },
  },
  {
    id: 5,
    title: "Deleted a page in Project X",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    image: "/avatars/ethan-cole.svg",
    type: "delete",
    user: { name: "Admin", avatar: "/avatars/admin.svg" },
  },
];