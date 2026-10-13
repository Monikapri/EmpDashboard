
import { useContext } from "react";
import Counter from "../Components/Counter";
import AppContext from "../context/AppContext";

function CounterPage() {
    const { message, setMessage, theme } = useContext(AppContext);

    return (
        <div
            className={`min-h-screen rounded p-4 ${theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-white"
                }`}
        >
            <h2 className="mb-4 text-xl font-bold">Counter Page</h2>

            <p className="mb-3">{message}</p>

            <button
                className="mb-4 rounded bg-blue-600 px-4 py-2 text-white"
                onClick={() => setMessage("Hello from Counter Page!")}
            >
                Set Message
            </button>

            <Counter />
        </div>
    );
}

export default CounterPage;