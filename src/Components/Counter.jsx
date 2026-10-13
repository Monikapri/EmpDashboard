
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";

function Counter() {
    const [count, setCount] = useState(0);
    const { theme } = useContext(AppContext);

    return (
        <div
            className={`w-full rounded-lg p-5 shadow ${theme === "light"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gray-700 text-white"
                }`}
        >
            <h3 className="mb-3 text-lg font-bold">Counter Component</h3>

            <p className="mb-3">Count: {count}</p>

            <button
                className="mr-2 rounded bg-green-600 px-4 py-2 text-white"
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>

            <button
                className="rounded bg-red-600 px-4 py-2 text-white"
                onClick={() => setCount(count - 1)}
            >
                Decrement
            </button>

            <button
                className="ml-2 rounded bg-gray-500 px-4 py-2 text-white"
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </div>
    );
}

export default Counter;