
import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from "react";

import EmployeeItem from "./EmployeeItem";

function Content({ title }) {
    // Counter state
    const [count, setCount] = useState(0);

    // Employee state
    const [employeeslist, setEmployeesList] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Loading and message state
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Loading...");

    // Search and sorting state
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(true);

    // Form state
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    // Ref for focusing the search input
    const searchRef = useRef(null);

    // Counter functions
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        setCount(prevCount => Math.max(0, prevCount - 1));
    };

    const reset = () => {
        setCount(0);
    };

    // Fetch employees from API
    useEffect(() => {
        const controller = new AbortController();

        const fetchEmployees = async () => {
            try {
                setLoading(true);
                setMessage("Loading...");

                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! Status: ${response.status}`
                    );
                }

                const result = await response.json();

                setEmployeesList(result);
                setMessage("Employees loaded!");
            } catch (error) {
                if (error.name !== "AbortError") {
                    setEmployeesList([]);
                    setMessage("Failed to load employees");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchEmployees();

        // Cleanup: cancel the request if the component unmounts
        return () => {
            controller.abort();
        };
    }, []);

    // Select employee
    const handleEmployee = useCallback((employee) => {
        setSelectedEmployee(employee);
    }, []);

    // Clear selected employee
    const clearEmployee = () => {
        setSelectedEmployee(null);
    };

    // Search employees by name or email
    const filteredEmployees = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return employeeslist.filter(employee =>
            employee.name.toLowerCase().includes(searchText) ||
            employee.email.toLowerCase().includes(searchText)
        );
    }, [employeeslist, search]);

    // Validate employee form
    const validate = () => {
        const newErrors = {};

        if (!userInfo.name.trim()) {
            newErrors.name = "Name is required";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userInfo.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(userInfo.email)) {
            newErrors.email = "Email is invalid";
        }

        const indianPhoneRegex = /^[6789]\d{9}$/;

        if (!userInfo.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!indianPhoneRegex.test(userInfo.phone)) {
            newErrors.phone = "Phone is invalid";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    // Reset the form and exit edit mode
    const cancelEdit = () => {
        setEditingEmployeeId(null);

        setUserInfo({
            name: "",
            email: "",
            phone: ""
        });

        setErrors({});
    };

    // Add or update employee
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const employeeData = {
            name: userInfo.name.trim(),
            email: userInfo.email.trim(),
            phone: userInfo.phone.trim()
        };

        if (editingEmployeeId !== null) {
            // Update the existing employee
            setEmployeesList(prev =>
                prev.map(employee =>
                    employee.id === editingEmployeeId
                        ? { ...employee, ...employeeData }
                        : employee
                )
            );

            // Update the selected card if it is being edited
            setSelectedEmployee(prev =>
                prev?.id === editingEmployeeId
                    ? { ...prev, ...employeeData }
                    : prev
            );

            setMessage("Employee updated successfully!");
        } else {
            // Add a new employee with a unique ID
            setEmployeesList(prev => {
                const maxId = prev.reduce(
                    (max, employee) =>
                        Math.max(max, employee.id),
                    0
                );

                return [
                    ...prev,
                    {
                        ...employeeData,
                        id: maxId + 1
                    }
                ];
            });

            setMessage("Employee added successfully!");
        }

        // Reset form after successful submission
        setUserInfo({
            name: "",
            email: "",
            phone: ""
        });

        setErrors({});
        setEditingEmployeeId(null);
    };

    // Delete employee
    const deleteEmp = useCallback((id) => {
        setEmployeesList(prev =>
            prev.filter(employee => employee.id !== id)
        );

        setSelectedEmployee(prev =>
            prev?.id === id ? null : prev
        );

        setMessage("Employee deleted successfully!");
    }, []);

    // Edit employee using the same form
    const handleEdit = useCallback((employee) => {
        setEditingEmployeeId(employee.id);

        setUserInfo({
            name: employee.name || "",
            email: employee.email || "",
            phone: employee.phone || ""
        });

        setErrors({});
    }, []);

    // Sort employees by name
    const sortEmployees = () => {
        const sortedEmployees = [...employeeslist];

        sortedEmployees.sort((a, b) => {
            return sortOrder
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

        setEmployeesList(sortedEmployees);
        setSortOrder(prev => !prev);
    };

    return (
        <div className="contentdiv flex-1 min-w-0 p-4">

            {/* Page title */}
            <h1 className="font-bold text-2xl text-gray-800 text-center mb-4">
                {title}
            </h1>

            {/* Counter and employee form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                {/* Counter card */}
                <div className="countercontent shadow rounded-lg w-full p-5">
                    <h2 className="font-bold text-lg text-gray-800 text-center mb-4">
                        Counter Application
                    </h2>

                    <div className="text-center text-3xl font-bold">
                        {count}
                    </div>

                    <div className="flex justify-center gap-3 mt-4">
                        <button
                            type="button"
                            className="p-3 rounded bg-green-700 text-white hover:bg-green-800"
                            onClick={increment}
                        >
                            +
                        </button>

                        <button
                            type="button"
                            className="p-3 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={reset}
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            className="p-3 rounded bg-red-700 text-white hover:bg-red-800"
                            onClick={decrement}
                        >
                            -
                        </button>
                    </div>
                </div>

                {/* Employee form */}
                <div className="empform shadow rounded-lg w-full p-5">
                    <h2 className="font-bold text-lg text-gray-800 text-center mb-4">
                        {editingEmployeeId !== null
                            ? "Edit Employee"
                            : "Employee Form"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="employee-name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Name
                            </label>

                            <input
                                id="employee-name"
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="employee-email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="employee-email"
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="employee-phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone
                            </label>

                            <input
                                id="employee-phone"
                                type="tel"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Submit and cancel */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            {editingEmployeeId !== null
                                ? "Update Employee"
                                : "Add Employee"}
                        </button>

                        {editingEmployeeId !== null && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* Selected employee details */}
            {selectedEmployee && (
                <div className="empcard shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">
                    <h2 className="p-2 text-center font-bold text-lg">
                        Selected Employee: {selectedEmployee.name}
                    </h2>

                    <p>
                        <span className="font-medium text-gray-600">
                            Name:
                        </span>{" "}
                        {selectedEmployee.name || "None"}
                    </p>

                    <p>
                        <span className="font-medium text-gray-600">
                            Email:
                        </span>{" "}
                        {selectedEmployee.email || "None"}
                    </p>

                    <p>
                        <span className="font-medium text-gray-600">
                            Phone:
                        </span>{" "}
                        {selectedEmployee.phone || "None"}
                    </p>

                    <p>
                        <span className="font-medium text-gray-600">
                            Website:
                        </span>{" "}
                        {selectedEmployee.website || "None"}
                    </p>

                    <p>
                        <span className="font-medium text-gray-600">
                            Company:
                        </span>{" "}
                        {selectedEmployee.company?.name || "None"}
                    </p>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="p-2 rounded text-white bg-gray-600 hover:bg-gray-700"
                            onClick={clearEmployee}
                        >
                            Clear Selection
                        </button>
                    </div>
                </div>
            )}

            {/* Employee list */}
            <div className="countercontent shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">

                <h2 className="text-center font-bold text-lg p-2">
                    Employee List
                </h2>

                {/* Search and sorting */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 p-2">
                    <label htmlFor="employee-search">
                        Search Employee:
                    </label>

                    <input
                        id="employee-search"
                        type="text"
                        ref={searchRef}
                        placeholder="Search name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border rounded px-3 py-2 w-full sm:w-60"
                    />

                    <button
                        type="button"
                        onClick={() => searchRef.current?.focus()}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Focus Search
                    </button>

                    <button
                        type="button"
                        onClick={sortEmployees}
                        className="p-2 rounded text-white bg-gray-600 hover:bg-gray-700"
                    >
                        {sortOrder ? "Sort A-Z" : "Sort Z-A"}
                    </button>
                </div>

                <p className="p-2 text-center">
                    Selected Filter: {search || "None"}
                </p>

                {/* API and operation status */}
                <div
                    role="status"
                    className="text-center text-sm text-gray-600 p-2"
                >
                    {loading
                        ? "Loading employees..."
                        : message}
                </div>

                {/* Employee cards */}
                <div className="grid grid-cols-1 gap-3 p-3">
                    {loading ? (
                        <p className="text-center">Please wait...</p>
                    ) : filteredEmployees.length > 0 ? (
                        filteredEmployees.map(employee => (
                            <EmployeeItem
                                key={employee.id}
                                employee={employee}
                                onSelect={handleEmployee}
                                onDelete={deleteEmp}
                                onEdit={handleEdit}
                            />
                        ))
                    ) : (
                        <p className="text-red-500 text-center">
                            No employees found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Content;
