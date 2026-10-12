import React from 'react'

function Sidebar() {
    return (
        <div className='sideBar w-64  min-h-screen shadow rounded'>
            <div className="sidebarmenu space-y-4 p-4">
                <div className="menu1 hover:bg-gray-200 rounded p-4 "><a href="#" className='flex items-center text-xl'>Dashboard</a>
                </div>
                <div className="menu2 hover:bg-gray-200 rounded p-4"><a href="#" className='flex items-center text-xl'>Employees</a>
                </div>
                <div className="menu3 hover:bg-gray-200 rounded p-4"><a href="#" className='flex items-center text-xl'>Departments</a>
                </div>
                <div className="menu4 hover:bg-gray-200 rounded p-4"><a href="#" className='flex items-center text-xl'>Settings</a>
                </div>

            </div>
        </div>
    )
}

export default Sidebar