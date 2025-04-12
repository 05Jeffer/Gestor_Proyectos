export default function Sidebar({ onLogout }) {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">Mi App</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-indigo-400">Dashboard</a>
          <a href="#" className="hover:text-indigo-400">Proyectos</a>
          <a href="#" className="hover:text-indigo-400">Configuración</a>
          <button
            onClick={onLogout}
            className="mt-auto bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md"
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    );
  }
  