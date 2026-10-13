
import Counter from "../Components/Counter";
import SelectedEmployee from "../Components/SelectedEmployee";

function Dashboard({ selectedEmployee, onClear }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Dashboard
            </h2>

            <SelectedEmployee
                employee={selectedEmployee}
                onClear={onClear}
            />
        </div>
    );
}

export default Dashboard;
