
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";

function Sidebar() {
    const { theme, setTheme } = useContext(AppContext);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const linkClass = ({ isActive }) =>
        `block rounded p-4 text-xl transition-colors ${isActive
            ? theme === "light"
                ? "bg-blue-100 text-blue-800 font-bold"
                : "bg-gray-700 text-white font-bold"
            : theme === "light"
                ? "hover:bg-gray-200"
                : "hover:bg-gray-700"
        }`;

    return (
        <aside
            className={`w-64 shrink-0 min-h-screen shadow transition-colors duration-300 ${theme === "light"
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-white"
                }`}
        >
            <div className="space-y-3 p-4">
                <h2 className="px-4 py-3 text-xl font-bold">
                    Menu
                </h2>

                <NavLink to="/" end className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/counter" className={linkClass}>
                    Counter
                </NavLink>

                <NavLink to="/employees" className={linkClass}>
                    Employees
                </NavLink>

                <NavLink to="/employee-form" className={linkClass}>
                    Add Employee
                </NavLink>

                <div className="border-t border-gray-400 pt-4">
                    <button
                        onClick={toggleTheme}
                        className={`w-full rounded-lg p-3 text-left font-semibold transition-colors ${theme === "light"
                                ? "bg-gray-200 hover:bg-gray-300"
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                    >
                        {theme === "light"
                            ? "🌙 Dark Mode"
                            : "☀️ Light Mode"}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;