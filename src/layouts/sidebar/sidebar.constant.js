import { dashboardIcon } from "../../assets/icons";

export const navigationBar = [
  {
    allowedTitles: ["user", "dashboard", "roles", "issue"],
    sectionTitle: "Admin Section",
    menuItems: [
      {
        type: "link",
        menuIcon: dashboardIcon,
        menuTitle: "Dashboard",
        menuLink: "/dashboard",
        activeCondition: ["/dashboard"],
      },
    ],
  },
];
