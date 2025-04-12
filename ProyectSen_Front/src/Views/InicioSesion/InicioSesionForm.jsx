import { useState } from "react";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import Robot from "../../image/Robot.png";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulando una llamada a API
        setTimeout(() => {
            if (email === "jefferson@gmail.com" && password === "123") {
                setError("");
                onLogin(); // Autenticación exitosa
            } else {
                setError("Usuario o contraseña incorrectos");
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-6xl w-full">
                {/* Sección de la imagen */}
                <div className="hidden sm:flex flex-col items-center">
                    <img 
                        src={Robot} 
                        alt="Robot" 
                        className="w-80 h-auto mb-4 transition-transform hover:scale-105" 
                    />
                    <h1 className="text-2xl font-bold text-white text-center">
                        Bienvenido al Sistema
                    </h1>
                    <p className="text-gray-300 text-center mt-2 max-w-md">
                        Ingresa tus credenciales para acceder al panel de gestion y administracion.
                    </p>
                </div>

                {/* Sección del formulario */}
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all hover:shadow-lg">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <FaLock className="text-indigo-600 text-xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            Iniciar Sesión
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Ingresa tus datos para continuar
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Correo electrónico"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    'Cargando...'
                                ) : (
                                    <>
                                        Ingresar <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}