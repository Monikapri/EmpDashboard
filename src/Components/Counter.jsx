
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="shadow rounded-lg w-full p-5">
            <h2 className="font-bold text-lg text-center mb-4">
                Counter Application
            </h2>

            <p className="text-center text-3xl font-bold">
                {count}
            </p>

            <div className="flex justify-center gap-3 mt-4">
                <button
                    type="button"
                    className="p-3 rounded bg-green-700 text-white"
                    onClick={() => setCount(prev => prev + 1)}
                >
                    +
                </button>

                <button
                    type="button"
                    className="p-3 rounded bg-blue-600 text-white"
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className="p-3 rounded bg-red-700 text-white"
                    onClick={() => setCount(prev => Math.max(0, prev - 1))}
                >
                    -
                </button>
            </div>
        </div>
    );
}

export default Counter;
