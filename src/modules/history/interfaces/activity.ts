export interface IActivity {
  id: number;
  title: string;
  timestamp: Date;
  image: string;
  type: "bug" | "release" | "edit" | "delete";
  user: {
    name: string;
    avatar: string;
  };
  isRead?: boolean;
}
