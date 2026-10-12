import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

function Header() {
    return (
        <div className="divcontain max-w-full">
            <div className="divheader">
                <div className="header bg-white shadow">
                    <div className="flex items-center justify-between p-4 font-bold">
                        <div className="flex items-center">
                            <nav className="hidden md:flex items-center gap-4">
                                <a href="" className="p-2 hover:text-red-600">Employee Dashboard</a>
                                <a href="" className="p-2 hover:text-red-600">Profile</a>
                            </nav>
                        </div>
                        <div className="flex  mt-3">
                            <button className="p-2 text-black hover:text-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <Sidebar />
                <Content title="Employee Dashboard" />
            </div>
        </div>
    )
}

export default Header