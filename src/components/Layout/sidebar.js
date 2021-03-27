import React from "react";

import {
  HamburgerIcon,
  CalendarIcon,
  CopyIcon,
  ChatIcon,
} from "@chakra-ui/icons";

const sections = [
  { name: "Dashboard", slug: "/", icon: <HamburgerIcon color="white" /> },
  {
    name: "Personal",
    slug: "/personal",
    icon: <CalendarIcon color="white" />,
  },
  {
    name: "Inventario",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Mensajes",
    slug: "/mensajes",
    icon: <ChatIcon color="white" />,
  },
];

export { sections };
