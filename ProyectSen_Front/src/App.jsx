import { useState } from 'react'
import Sidebar from './Components/Sidebar';
import LoginForm from './Views/InicioSesion/InicioSesionForm';
import ProyectosTable from './Views/Proyectos/ProyectosTable';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex">
      <Sidebar onLogout={() => setIsLoggedIn(false)} />
      <main className="flex-1 bg-gray-900 min-h-screen">
        <ProyectosTable />
      </main>
    </div>
  );
}

export default App
