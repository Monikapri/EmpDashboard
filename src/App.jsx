import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Content from "./Components/Content";
import AppContext from "./context/AppContext";

function App() {
  const [message, setMessage] = useState(
    "Welcome to Employee Dashboard!"
  );

  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider
      value={{
        message,
        setMessage,
        theme,
        setTheme
      }}
    >
      <BrowserRouter>
        <div
          className={`min-h-screen transition-colors duration-300 ${theme === "light"
              ? "bg-gray-100 text-gray-900"
              : "bg-gray-900 text-gray-100"
            }`}
        >
          <Content />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;