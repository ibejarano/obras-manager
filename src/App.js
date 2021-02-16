import "./App.css";
import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

const GET_CALIDAD_IDS = gql`
  query {
    calidads {
      id
      obra {
        nombre
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(GET_CALIDAD_IDS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.calidads.map(({ id, obra: { nombre } }) => (
    <div key={id}>
      <h1>Obra: {nombre}</h1>
      <p>IDS : {id} </p>
    </div>
  ));
}

function Dashboard({ isOpen, setIsOpen }) {
  return (
    <body className="bg-gray-100 font-family-karla flex">
      <aside className="relative bg-indigo-600 h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <a
            href="index.html"
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
          <a
            href="blank.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Blank Page
          </a>
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
            </button>
            {isOpen && (
              <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Dashboard</h1>

            <div className="w-full mt-12">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Latest Reports
              </p>
              <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Last name
                      </th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="w-1/3 text-left py-3 px-4">Lian</td>
                      <td className="w-1/3 text-left py-3 px-4">Smith</td>
                      <td className="text-left py-3 px-4">
                        <a className="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td className="text-left py-3 px-4">
                        <a
                          className="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-gray-200">
                      <td className="w-1/3 text-left py-3 px-4">Emma</td>
                      <td className="w-1/3 text-left py-3 px-4">Johnson</td>
                      <td className="text-left py-3 px-4">
                        <a className="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td className="text-left py-3 px-4">
                        <a
                          className="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          jonsmith@mail.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </body>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />;
}

export default App;
