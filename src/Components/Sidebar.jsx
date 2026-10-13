
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";

function Sidebar() {
    const { theme, setTheme } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const linkClass = ({ isActive }) =>
        `block rounded-lg p-3 transition-colors ${isActive
            ? theme === "light"
                ? "bg-blue-100 text-blue-800 font-bold"
                : "bg-gray-700 text-white font-bold"
            : theme === "light"
                ? "hover:bg-gray-200"
                : "hover:bg-gray-700"
        }`;

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`fixed left-3 top-3 z-50 rounded-lg p-2 text-2xl md:hidden ${theme === "light"
                        ? "bg-white text-gray-900 shadow"
                        : "bg-gray-800 text-white shadow"
                    }`}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            {/* Mobile overlay */}
            {menuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 transform p-4 shadow-lg transition-transform duration-300 md:static md:min-h-screen md:translate-x-0 md:shadow ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    } ${theme === "light"
                        ? "bg-white text-gray-900"
                        : "bg-gray-800 text-white"
                    }`}
            >
                <h2 className="mb-5 mt-12 px-3 text-xl font-bold md:mt-0">
                    Menu
                </h2>

                <nav className="space-y-2">
                    <NavLink to="/" end className={linkClass}
                        onClick={() => setMenuOpen(false)}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/counter" className={linkClass}
                        onClick={() => setMenuOpen(false)}>
                        Counter
                    </NavLink>

                    <NavLink to="/employees" className={linkClass}
                        onClick={() => setMenuOpen(false)}>
                        Employees
                    </NavLink>

                    <NavLink to="/employee-form" className={linkClass}
                        onClick={() => setMenuOpen(false)}>
                        Add Employee
                    </NavLink>
                </nav>

                <div className="mt-5 border-t border-gray-400 pt-4">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`w-full rounded-lg p-3 text-left font-semibold ${theme === "light"
                                ? "bg-gray-200 hover:bg-gray-300"
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                    >
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;