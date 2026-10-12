
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import EmployeeItem from "./EmployeeItem";

function Content({ title }) {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Loading...");
    const [employeeslist, setEmployeesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Counter
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const reset = () => {
        setCount(0);
    };

    // Fetch employees
    useEffect(() => {
        setLoading(true);

        const empCall = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! status: ${response.status} `
                    );
                }

                const result = await response.json();

                setEmployeesList(result);
                setMessage("Employees loaded!");
            } catch (err) {
                setEmployeesList([]);
                setMessage("Failed to load employees");
            } finally {
                setLoading(false);
            }
        };

        empCall();
    }, []);

    // Select employee
    const handleEmployee = (employee) => {
        setSelectedEmployee(employee);
    };

    // Clear selected employee
    const clearEmployee = () => {
        setSelectedEmployee(null);
    };

    // Search employees

    const filteredEmployees = useMemo(() => {
        return employeeslist.filter((employee) =>
            employee.name.toLowerCase().includes(search.toLowerCase()) || employee.email.toLowerCase().includes(search.toLowerCase())
        )
    }, [employeeslist, search]);


    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const maxId =
                employeeslist.length > 0
                    ? Math.max(...employeeslist.map((item) => item.id))
                    : 0;

            const newEmployee = {
                id: maxId + 1,
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone
            };

            setEmployeesList([
                ...employeeslist,
                newEmployee
            ]);

            alert("Employee added successfully");

            setUserInfo({
                name: "",
                email: "",
                phone: ""
            });
        }
    };

    // Form validation
    const validate = () => {
        const newErrors = {};

        if (!userInfo.name.trim()) {
            newErrors.name = "Name is required";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userInfo.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(userInfo.email)) {
            newErrors.email = "Email Invalid";
        }

        const indianPhoneRegex = /^[6789]\d{9}$/;

        if (!userInfo.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!indianPhoneRegex.test(userInfo.phone)) {
            newErrors.phone = "Phone Invalid";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    // Delete employee
    // const deleteEmp = (id) => {
    //     setEmployeesList(
    //         employeeslist.filter(
    //             (employee) => employee.id !== id
    //         )
    //     );

    //     if (selectedEmployee?.id === id) {
    //         setSelectedEmployee(null);
    //     }
    // };

    const deleteEmp = useCallback((id) => {
        setEmployeesList(prevEmployees =>
            prevEmployees.filter(employee => employee.id !== id)
        );

        if (selectedEmployee?.id === id) {
            setSelectedEmployee(null);
        }
    }, [selectedEmployee]);



    const [sortOrder, setSortOrder] = useState(true);

    const sortEmployees = () => {
        const sortedEmployees = [...employeeslist];

        if (sortOrder) {
            sortedEmployees.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else {
            sortedEmployees.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        setEmployeesList(sortedEmployees);
        setSortOrder(!sortOrder);
    };

    return (
        <div className="contentdiv flex-1 min-w-0 p-4">

            {/* Page Title */}
            <h1 className="font-bold text-2xl text-gray-800 text-center mb-4">
                {title}
            </h1>

            {/* Counter + Employee Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                {/* Counter Card */}
                <div className="countercontent shadow rounded-lg w-full p-5">
                    <div className="countertitle font-bold text-sm text-gray-800 text-center">
                        <h1 className="text-center mb-4">
                            Counter Application
                        </h1>
                    </div>

                    <div className="text-center text-3xl font-bold">
                        {count}
                    </div>

                    <div className="btngrp p-2 space-x-3 text-center mt-4">
                        <button
                            className="p-3 rounded bg-green-700 text-white hover:bg-green-800 transition"
                            onClick={increment}
                        >
                            +
                        </button>

                        <button
                            className="p-3 rounded bg-blue-300 text-white hover:bg-blue-400 transition"
                            onClick={reset}
                        >
                            Reset
                        </button>

                        <button
                            className="p-3 rounded bg-red-700 text-white hover:bg-red-800 transition"
                            onClick={decrement}
                        >
                            -
                        </button>
                    </div>
                </div>

                {/* Employee Form */}
                <div className="empform shadow rounded-lg w-full p-5">
                    <div className="countertitle font-bold text-sm text-gray-800 text-center mb-4">
                        <h1 className="text-center">
                            Employee Form
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Add Employee
                        </button>
                    </form>
                </div>
            </div>

            {/* Selected Employee */}
            {selectedEmployee && (
                <div className="empcard shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">
                    <h1 className="p-2 text-center font-bold">
                        Selected User:{" "}
                        {selectedEmployee?.name || "None"}
                    </h1>

                    <p>
                        <span className="font-light text-gray-600">
                            Name
                        </span>
                        : {selectedEmployee?.name || "None"}
                    </p>

                    <p>
                        <span className="font-light text-gray-600">
                            Email
                        </span>
                        : {selectedEmployee?.email || "None"}
                    </p>

                    <p>
                        <span className="font-light text-gray-600">
                            Phone
                        </span>
                        : {selectedEmployee?.phone || "None"}
                    </p>

                    <p>
                        <span className="font-light text-gray-600">
                            Website
                        </span>
                        : {selectedEmployee?.website || "None"}
                    </p>

                    <p>
                        <span className="font-light text-gray-600">
                            Company Name
                        </span>
                        : {selectedEmployee?.company?.name || "None"}
                    </p>

                    <div className="text-center mt-4">
                        <button
                            className="p-2 border rounded text-white bg-gray-600 hover:bg-green-700"
                            onClick={clearEmployee}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Employee List */}
            <div className="countercontent shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">

                <div className="countertitle font-bold text-sm text-gray-800 text-center">

                    <h1 className="text-center p-2">
                        Employee List
                    </h1>

                    {/* Search */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 p-2">
                        <span>
                            Search Employee:
                        </span>

                        <input
                            type="text"
                            placeholder="Search employee name or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border rounded px-3 py-2 w-full sm:w-60"
                        />

                        <button className="p-2 border rounded text-white bg-gray-600 hover:bg-green-700" onClick={sortEmployees}>
                            {sortOrder ? "Sort A-Z" : "Sort Z-A"}
                        </button>
                    </div>

                    <h1 className="p-2">
                        Selected Filter User:{" "}
                        {search || "None"}
                    </h1>

                    {/* Message */}
                    <div className="text-red-500">
                        <p>
                            {loading
                                ? "Loading..."
                                : message}
                        </p>
                    </div>

                    {/* Clear */}
                    <div className="p-2">
                        <button
                            className="p-2 border rounded text-white bg-gray-600 hover:bg-green-700"
                            onClick={clearEmployee}
                        >
                            Clear Selection
                        </button>
                    </div>

                    {/* Employees */}
                    <div className="grid grid-cols-1 gap-3 p-5">

                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (


                                <div
                                    key={employee.id}
                                    className="p-3 bg-gray-300 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
                                    onClick={() =>
                                        handleEmployee(employee)
                                    }
                                >
                                    <EmployeeItem
                                        key={employee.id}
                                        employee={employee}
                                        onDelete={deleteEmp}
                                        onSelect={handleEmployee}
                                    />
                                    <div className="text-left">
                                        <div className="empname font-medium">
                                            {employee.name}
                                        </div>

                                        <div className="emprole text-gray-500 text-sm">
                                            {employee.email}
                                        </div>
                                    </div>

                                    <div><button
                                        type="button"
                                        className="p-2 text-xl hover:text-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteEmp(
                                                employee.id
                                            );
                                        }}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                        <button
                                            type="button"
                                            className="p-2 text-xl hover:text-red-600"
                                            onClick={(e) => {
                                                EditEmp(
                                                    employee.id
                                                );
                                            }}
                                        >
                                            <FiEdit />
                                        </button></div>



                                </div>
                            ))
                        ) : (
                            <p className="text-red-500">
                                No employees found
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;