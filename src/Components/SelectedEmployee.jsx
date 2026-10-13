
import { useContext } from "react";
import AppContext from "../context/AppContext";

function SelectedEmployee({ employee, onClear }) {
    const { theme } = useContext(AppContext);

    if (!employee) return null;

    return (
        <div
            className={`mx-auto mt-6 w-full max-w-4xl rounded-lg p-5 shadow ${theme === "light"
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-gray-100"
                }`}
        >
            <h2 className="mb-4 text-center text-lg font-bold">
                Selected Employee: {employee.name}
            </h2>

            <p>Name: {employee.name || "None"}</p>
            <p>Email: {employee.email || "None"}</p>
            <p>Phone: {employee.phone || "None"}</p>
            <p>Website: {employee.website || "None"}</p>
            <p>Company: {employee.company?.name || "None"}</p>

            <button
                type="button"
                onClick={onClear}
                className="mt-4 rounded bg-gray-600 p-2 text-white hover:bg-gray-700"
            >
                Clear Selection
            </button>
        </div>
    );
}

export default SelectedEmployee;