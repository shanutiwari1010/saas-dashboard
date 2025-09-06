export interface Order {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
}

export const orders: Order[] = [
  {
    id: "#CM9801",
    user: {
      name: "Natali Craig",
      avatar: "/avatars/natali-craig.svg",
    },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
  },
  {
    id: "#CM9802",
    user: {
      name: "Kate Morrison",
      avatar: "/avatars/kate-morrison.svg",
    },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
  },
  {
    id: "#CM9803",
    user: {
      name: "Drew Cano",
      avatar: "/avatars/drew-cano.svg",
    },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    id: "#CM9804",
    user: {
      name: "Orlando Diggs",
      avatar: "/avatars/orlando-diggs.svg",
    },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
  },
  {
    id: "#CM9805",
    user: {
      name: "Andi Lane",
      avatar: "/avatars/andi-lane.svg",
    },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
  },
  {
    id: "#CM9806",
    user: {
      name: "Natali Craig",
      avatar: "/avatars/natali-craig.svg",
    },
    project: "E-commerce Site",
    address: "Pine Street Seattle",
    date: "2 hours ago",
    status: "In Progress",
  },
  {
    id: "#CM9807",
    user: {
      name: "Kate Morrison",
      avatar: "/avatars/kate-morrison.svg",
    },
    project: "Mobile App",
    address: "Market Street Portland",
    date: "3 hours ago",
    status: "Complete",
  },
  {
    id: "#CM9808",
    user: {
      name: "Drew Cano",
      avatar: "/avatars/drew-cano.svg",
    },
    project: "Brand Website",
    address: "Broadway New York",
    date: "5 hours ago",
    status: "Pending",
  },
  {
    id: "#CM9809",
    user: {
      name: "Orlando Diggs",
      avatar: "/avatars/orlando-diggs.svg",
    },
    project: "Portfolio Site",
    address: "Ocean Drive Miami",
    date: "1 day ago",
    status: "Approved",
  },
  {
    id: "#CM9810",
    user: {
      name: "Andi Lane",
      avatar: "/avatars/andi-lane.svg",
    },
    project: "Corporate Portal",
    address: "Fifth Avenue Chicago",
    date: "2 days ago",
    status: "Rejected",
  },
  {
    id: "#CM9811",
    user: {
      name: "David Martinez",
      avatar: "/public/avatars/john-doe.svg",
    },
    project: "API Documentation",
    address: "Tech Boulevard Austin",
    date: "3 days ago",
    status: "In Progress",
  },
  {
    id: "#CM9812",
    user: {
      name: "Anna Taylor",
      avatar: "/avatars/sofia-delgado.svg",
    },
    project: "Analytics Dashboard",
    address: "Data Lane Boston",
    date: "4 days ago",
    status: "Complete",
  },
  {
    id: "#CM9813",
    user: {
      name: "Robert Garcia",
      avatar: "/public/avatars/ethan-cole.svg",
    },
    project: "Consulting Site",
    address: "Business Park Denver",
    date: "5 days ago",
    status: "Pending",
  },
  {
    id: "#CM9814",
    user: {
      name: "Jennifer Lee",
      avatar: "/avatars/rebecca-clarke.svg",
    },
    project: "Marketing Campaign",
    address: "Creative District LA",
    date: "1 week ago",
    status: "Approved",
  },
  {
    id: "#CM9815",
    user: {
      name: "Thomas Anderson",
      avatar: "/public/avatars/ryan-mercer.svg",
    },
    project: "Architecture Firm",
    address: "Design Avenue Phoenix",
    date: "1 week ago",
    status: "Rejected",
  },
];
