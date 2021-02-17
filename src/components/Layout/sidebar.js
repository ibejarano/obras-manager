import React from "react";
import { Link } from "react-router-dom";

const sections = [
  { name: "Dashboard", slug: "/" },
  { name: "Personal Obra", slug: "/personal" },
  { name: "Inventario", slug: "/inventarios" },
  { name: "Mensajes", slug: "/mensajes" },
];

function SectionLink({ name, slug }) {
  return (
    <Link
      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
      to={slug}
    >
      {name}
    </Link>
  );
}

export default function SideBar() {
  return (
    <aside className="relative bg-indigo-600 h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a
          href="index.html"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          User Name
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        {sections.map((section) => (
          <SectionLink key={section.name} {...section} />
        ))}
      </nav>
    </aside>
  );
}
