import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const nameMap: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  overview: "Overview",
  reports: "Reports",
  settings: "Settings",
  ecommerce: "eCommerce",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  inventory: "Inventory",
  sales: "Sales",
  projects: "Projects",
  "all-projects": "All Projects",
  active: "Active",
  completed: "Completed",
  archived: "Archived",
  templates: "Templates",
  courses: "Online Courses",
  "my-courses": "My Courses",
  browse: "Browse",
  progress: "Progress",
  certificates: "Certificates",
  instructors: "Instructors",
  profile: "User Profile",
  personal: "Personal Info",
  security: "Security",
  preferences: "Preferences",
  activity: "Activity",
  account: "Account",
  billing: "Billing",
  subscription: "Subscription",
  "payment-methods": "Payment Methods",
  invoices: "Invoices",
  usage: "Usage",
  corporate: "Corporate",
  team: "Team",
  departments: "Departments",
  roles: "Roles",
  permissions: "Permissions",
  organization: "Organization",
  blog: "Blog",
  posts: "All Posts",
  drafts: "Drafts",
  categories: "Categories",
  tags: "Tags",
  comments: "Comments",
  social: "Social",
  feed: "Feed",
  messages: "Messages",
  notifications: "Notifications",
  connections: "Connections",
  groups: "Groups",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (path: string) => {
    return nameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      {pathnames.length === 0 ? (
        <span className="text-sm leading-5 font-normal text-black/40">
          Home
        </span>
      ) : (
        <Link to="/" className="transition-colors hover:text-gray-700">
          Home
        </Link>
      )}
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const name = getBreadcrumbName(path);

        return (
          <div key={path} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium dark:text-gray-200 text-gray-900">{name}</span>
            ) : (
              <Link
                to={routeTo}
                className="transition-colors hover:text-gray-700"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
