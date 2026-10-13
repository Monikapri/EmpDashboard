
import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from "react";

import {
    NavLink,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import CounterPage from "../Pages/CounterPage";
import EmployeesPage from "../Pages/EmployeesPage";
import EmployeeFormPage from "../Pages/EmployeeFormPage";

function Content() {
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // 1. State management
    const [employeesList, setEmployeesList] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // 2. Fetch employees from API
    useEffect(() => {
        const controller = new AbortController();

        async function fetchEmployees() {
            try {
                setLoading(true);

                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch employees");
                }

                const data = await response.json();

                setEmployeesList(data);
                setMessage("Employees loaded successfully!");
            } catch (error) {
                if (error.name !== "AbortError") {
                    setEmployeesList([]);
                    setMessage("Failed to load employees.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchEmployees();

        return () => controller.abort();
    }, []);

    // 3. Handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    // 4. Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!userInfo.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!userInfo.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (!userInfo.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[6789]\d{9}$/.test(userInfo.phone)) {
            newErrors.phone =
                "Enter a valid 10-digit Indian phone number";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // 5. Add or update employee
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (editingEmployeeId !== null) {
            setEmployeesList(prev =>
                prev.map(employee =>
                    employee.id === editingEmployeeId
                        ? { ...employee, ...userInfo }
                        : employee
                )
            );

            setMessage("Employee updated successfully!");
        } else {
            const newEmployee = {
                id: Date.now(),
                ...userInfo,
                website: "",
                company: {
                    name: "New Employee"
                }
            };

            setEmployeesList(prev => [
                ...prev,
                newEmployee
            ]);

            setMessage("Employee added successfully!");
        }

        setUserInfo({
            name: "",
            email: "",
            phone: ""
        });

        setErrors({});
        setEditingEmployeeId(null);

        navigate("/employees");
    };

    // 6. Edit employee
    const handleEdit = (employee) => {
        setEditingEmployeeId(employee.id);

        setUserInfo({
            name: employee.name || "",
            email: employee.email || "",
            phone: employee.phone &&
                /^[6789]\d{9}$/.test(employee.phone)
                ? employee.phone
                : ""
        });

        setErrors({});
        navigate("/employee-form");
    };

    // 7. Cancel editing
    const cancelEdit = () => {
        setEditingEmployeeId(null);

        setUserInfo({
            name: "",
            email: "",
            phone: ""
        });

        setErrors({});
        navigate("/employees");
    };

    // 8. Delete employee
    const deleteEmp = useCallback((id) => {
        setEmployeesList(prev =>
            prev.filter(employee => employee.id !== id)
        );

        setSelectedEmployee(prev =>
            prev?.id === id ? null : prev
        );

        setMessage("Employee deleted successfully!");
    }, []);

    // 9. Select employee
    const handleEmployee = useCallback((employee) => {
        setSelectedEmployee(employee);
    }, []);

    // 10. Clear selected employee
    const clearEmployee = () => {
        setSelectedEmployee(null);
    };

    // 11. Search employees
    const filteredEmployees = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        return employeesList.filter(employee =>
            employee.name.toLowerCase().includes(searchText) ||
            employee.email.toLowerCase().includes(searchText)
        );
    }, [employeesList, search]);

    // 12. Sort employees
    const sortEmployees = () => {
        setSortOrder(prev =>
            prev === "asc" ? "desc" : "asc"
        );
    };

    const sortedEmployees = useMemo(() => {
        return [...filteredEmployees].sort((a, b) => {
            const result = a.name.localeCompare(b.name);

            return sortOrder === "asc" ? result : -result;
        });
    }, [filteredEmployees, sortOrder]);

    // 13. Render pages using React Router
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navigation */}
            <header className="bg-blue-700 text-white p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Employee Dashboard
                </h1>

                <nav className="flex flex-wrap gap-5">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "hover:underline"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/counter"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "hover:underline"
                        }
                    >
                        Counter
                    </NavLink>

                    <NavLink
                        to="/employees"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "hover:underline"
                        }
                    >
                        Employees
                    </NavLink>

                    <NavLink
                        to="/employee-form"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold underline"
                                : "hover:underline"
                        }
                    >
                        Add Employee
                    </NavLink>
                </nav>
            </header>

            {/* Page content */}
            <main className="max-w-6xl mx-auto p-4">

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Dashboard
                                selectedEmployee={selectedEmployee}
                                onClear={clearEmployee}
                            />
                        }
                    />

                    <Route
                        path="/counter"
                        element={<CounterPage />}
                    />

                    <Route
                        path="/employees"
                        element={
                            <EmployeesPage
                                employees={sortedEmployees}
                                search={search}
                                onSearchChange={setSearch}
                                searchRef={searchRef}
                                onFocusSearch={() => searchRef.current?.focus()}
                                sortOrder={sortOrder}
                                onSort={sortEmployees}
                                onSelect={handleEmployee}
                                onDelete={deleteEmp}
                                onEdit={handleEdit}
                                loading={loading}
                                message={message}
                                selectedEmployee={selectedEmployee}
                                onClear={clearEmployee}
                            />
                        }
                    />

                    <Route
                        path="/employee-form"
                        element={
                            <EmployeeFormPage
                                userInfo={userInfo}
                                errors={errors}
                                editingEmployeeId={editingEmployeeId}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                onCancel={cancelEdit}
                            />
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>

            </main>
        </div>
    );
}

export default Content;