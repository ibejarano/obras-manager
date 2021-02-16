import React from "react";

const sections = ["Dashboard", "Personal Obra", "Inventario", "Mensajes"];

function SectionLink({ name, url }) {
  return (
    <a
      href={url}
      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
    >
      <i className="fas fa-sticky-note mr-3"></i>
      {name}
    </a>
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
        {sections.map((name) => (
          <SectionLink key={name} name={name} url="/" />
        ))}
      </nav>
    </aside>
  );
}
