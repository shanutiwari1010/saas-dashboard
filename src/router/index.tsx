import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";
import { DashboardContainer } from "@/layouts/container";

import { PlaceholderPage } from "@/components/placeholder-page";
import OrderList from "@/modules/dashboard/components/order-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardContainer />,
      },
      // eCommerce routes
      {
        path: "ecommerce",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="eCommerce Dashboard"
                description="Manage your online store"
              />
            ),
          },
          {
            path: "products",
            element: (
              <PlaceholderPage
                title="Products"
                description="Manage your product catalog"
              />
            ),
          },
          {
            path: "orders",
            element: <OrderList />,
          },
          {
            path: "customers",
            element: (
              <PlaceholderPage
                title="Customers"
                description="Manage customer information"
              />
            ),
          },
          {
            path: "inventory",
            element: (
              <PlaceholderPage
                title="Inventory"
                description="Track and manage inventory"
              />
            ),
          },
          {
            path: "sales",
            element: (
              <PlaceholderPage
                title="Sales"
                description="View sales analytics and reports"
              />
            ),
          },
        ],
      },
      {
        path: "overview",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Overview"
                description="View your overview"
              />
            ),
          },
        ],
      },
      // Projects routes
      {
        path: "projects",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Projects"
                description="Manage your projects"
              />
            ),
          },
          {
            path: "all",
            element: (
              <PlaceholderPage
                title="All Projects"
                description="View all your projects"
              />
            ),
          },
          {
            path: "active",
            element: (
              <PlaceholderPage
                title="Active Projects"
                description="Currently active projects"
              />
            ),
          },
          {
            path: "completed",
            element: (
              <PlaceholderPage
                title="Completed Projects"
                description="Successfully completed projects"
              />
            ),
          },
          {
            path: "archived",
            element: (
              <PlaceholderPage
                title="Archived Projects"
                description="Archived project history"
              />
            ),
          },
          {
            path: "templates",
            element: (
              <PlaceholderPage
                title="Project Templates"
                description="Reusable project templates"
              />
            ),
          },
        ],
      },
      // Online Courses routes
      {
        path: "courses",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Online Courses"
                description="Manage your learning journey"
              />
            ),
          },
          {
            path: "my-courses",
            element: (
              <PlaceholderPage
                title="My Courses"
                description="Your enrolled courses"
              />
            ),
          },
          {
            path: "browse",
            element: (
              <PlaceholderPage
                title="Browse Courses"
                description="Discover new courses"
              />
            ),
          },
          {
            path: "progress",
            element: (
              <PlaceholderPage
                title="Progress"
                description="Track your learning progress"
              />
            ),
          },
          {
            path: "certificates",
            element: (
              <PlaceholderPage
                title="Certificates"
                description="Your earned certificates"
              />
            ),
          },
          {
            path: "instructors",
            element: (
              <PlaceholderPage
                title="Instructors"
                description="Meet your instructors"
              />
            ),
          },
        ],
      },
      // User Profile routes
      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="User Profile"
                description="Manage your profile information"
              />
            ),
          },
          {
            path: "overview",
            element: (
              <PlaceholderPage
                title="Profile Overview"
                description="Your profile summary"
              />
            ),
          },
          {
            path: "projects",
            element: (
              <PlaceholderPage
                title="Profile Projects"
                description="Your personal projects"
              />
            ),
          },
          {
            path: "campaigns",
            element: (
              <PlaceholderPage
                title="Campaigns"
                description="Your marketing campaigns"
              />
            ),
          },
          {
            path: "documents",
            element: (
              <PlaceholderPage
                title="Documents"
                description="Your uploaded documents"
              />
            ),
          },
          {
            path: "followers",
            element: (
              <PlaceholderPage
                title="Followers"
                description="People following you"
              />
            ),
          },
        ],
      },
      // Account routes
      {
        path: "account",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Account"
                description="Manage your account settings"
              />
            ),
          },
          {
            path: "billing",
            element: (
              <PlaceholderPage
                title="Billing"
                description="Manage your billing information"
              />
            ),
          },
          {
            path: "subscription",
            element: (
              <PlaceholderPage
                title="Subscription"
                description="Manage your subscription plan"
              />
            ),
          },
          {
            path: "payment-methods",
            element: (
              <PlaceholderPage
                title="Payment Methods"
                description="Manage your payment methods"
              />
            ),
          },
          {
            path: "invoices",
            element: (
              <PlaceholderPage
                title="Invoices"
                description="View your billing history"
              />
            ),
          },
          {
            path: "usage",
            element: (
              <PlaceholderPage
                title="Usage"
                description="Monitor your account usage"
              />
            ),
          },
        ],
      },
      // Corporate routes
      {
        path: "corporate",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Corporate"
                description="Manage your organization"
              />
            ),
          },
          {
            path: "team",
            element: (
              <PlaceholderPage
                title="Team"
                description="Manage your team members"
              />
            ),
          },
          {
            path: "departments",
            element: (
              <PlaceholderPage
                title="Departments"
                description="Organize departments"
              />
            ),
          },
          {
            path: "roles",
            element: (
              <PlaceholderPage title="Roles" description="Define user roles" />
            ),
          },
          {
            path: "permissions",
            element: (
              <PlaceholderPage
                title="Permissions"
                description="Set access permissions"
              />
            ),
          },
          {
            path: "organization",
            element: (
              <PlaceholderPage
                title="Organization"
                description="Manage organization settings"
              />
            ),
          },
        ],
      },
      // Blog routes
      {
        path: "blog",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Blog"
                description="Manage your blog content"
              />
            ),
          },
          {
            path: "posts",
            element: (
              <PlaceholderPage
                title="All Posts"
                description="View and manage all blog posts"
              />
            ),
          },
          {
            path: "drafts",
            element: (
              <PlaceholderPage
                title="Drafts"
                description="Manage your draft posts"
              />
            ),
          },
          {
            path: "categories",
            element: (
              <PlaceholderPage
                title="Categories"
                description="Organize post categories"
              />
            ),
          },
          {
            path: "tags",
            element: (
              <PlaceholderPage title="Tags" description="Manage post tags" />
            ),
          },
          {
            path: "comments",
            element: (
              <PlaceholderPage
                title="Comments"
                description="Moderate comments"
              />
            ),
          },
        ],
      },
      // Social routes
      {
        path: "social",
        children: [
          {
            index: true,
            element: (
              <PlaceholderPage
                title="Social"
                description="Connect and engage"
              />
            ),
          },
          {
            path: "feed",
            element: (
              <PlaceholderPage
                title="Feed"
                description="Your social media feed"
              />
            ),
          },
          {
            path: "messages",
            element: (
              <PlaceholderPage title="Messages" description="Direct messages" />
            ),
          },
          {
            path: "notifications",
            element: (
              <PlaceholderPage
                title="Notifications"
                description="Your notifications"
              />
            ),
          },
          {
            path: "connections",
            element: (
              <PlaceholderPage
                title="Connections"
                description="Manage your connections"
              />
            ),
          },
          {
            path: "groups",
            element: (
              <PlaceholderPage
                title="Groups"
                description="Join and manage groups"
              />
            ),
          },
        ],
      },
    ],
  },
]);
