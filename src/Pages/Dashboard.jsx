import { useContext } from "react";
import AppContext from "../context/AppContext";

function Dashboard() {
    const { message, setMessage } = useContext(AppContext);

    const handleClick = () => {
        setMessage("Welcome to Employee Dashboard!");
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
                Dashboard
            </h1>

            <label className="mb-2 block">
                Update Welcome Message
            </label>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type the Welcome Message"
                className="w-full rounded border bg-transparent px-3 py-2 sm:w-80"
            />

            <button
                className="m-2 rounded bg-blue-500 p-2 text-sm font-bold text-white"
                onClick={handleClick}
            >
                Reset
            </button>

            <p className="mt-4 text-lg">{message}</p>
        </div>
    );
}

export default Dashboard;