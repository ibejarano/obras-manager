import React from "react";

import { HamburgerIcon, CalendarIcon, CopyIcon } from "@chakra-ui/icons";

const sections = [
  { name: "Obras", slug: "/", icon: <HamburgerIcon color="white" /> },
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
];

const qa = [
  {
    name: "Certificados",
    slug: "/personal",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Planillas",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Procedimientos",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
];

const planos = [
  {
    name: "Mecanicos",
    slug: "/personal",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Civiles",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
  {
    name: "Piping",
    slug: "/inventarios",
    icon: <CopyIcon color="white" />,
  },
];

export { sections, qa, planos };
