'use client'
// Import React and required hooks for state management
import React, { useState } from "react";
// Import custom components for input fields and buttons
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

const Profits = () => {
  // State to store the list of employees and their salaries
  const [employees, setEmployees] = useState([]);
  // State for the current employee's name being added
  const [employeeName, setEmployeeName] = useState(""); 
  // State for the current employee's salary being added
  const [salary, setSalary] = useState(""); 
  // State for the total sales input
  const [sales, setSales] = useState(""); 
  // State to keep track of the total of all employee salaries
  const [totalSalaries, setTotalSalaries] = useState(0); 
  // State to store the calculated profit (sales - total salaries)
  const [profit, setProfit] = useState(null); 

  // Function to handle adding a new employee's name and salary to the list
  const handleAdd = () => {
    // Ensure both employee name and salary are provided
    if (employeeName && salary) {
      // Create a new employee object and add it to the list
      const updatedEmployees = [...employees, { name: employeeName, salary: parseFloat(salary) }];
      setEmployees(updatedEmployees);

      // Calculate the new total of all employee salaries
      const total = updatedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
      setTotalSalaries(total);

      // Reset input fields for employee name and salary
      setEmployeeName(""); 
      setSalary(""); 
    }
  };

  // Function to calculate the profit (sales - total salaries)
  const handleCalculate = () => {
    // Ensure both sales and total salaries are provided
    if (sales && totalSalaries) {
      // Calculate profit and update the state
      const calculatedProfit = parseFloat(sales) - totalSalaries;
      setProfit(calculatedProfit);
    }
  };

  return (
    <div className='flex flex-col px-24 mt-4 shadow-lg h-screen pt-8 w-full rounded-2xl'>
      {/* Section for adding employee salaries */}
      <h1 className='font-lexend font-bold'>Add salaries</h1>

      <div className='flex w-full mt-3 space-x-48'>
        {/* Input field for employee name */}
        <InputField
          label="Employee name"
          type="text"
          name="Employee name"
          required={true}
          placeholder="Add Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="h-[40px] rounded-[6px] border[1px] w-full"
        />
        {/* Input field for employee salary */}
        <InputField
          label="Salary"
          type="number"
          name="Salary"
          placeholder="Enter Salary"
          required={true}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="h-[40px] rounded-[6px] border[1px] w-full"
        />
      </div>

      {/* Button to add the new employee */}
      <div className='flex justify-center items-center mt-4'>
        <CustomButton
          title="Add"
          containerClass="bg-[#006EC4] text-white text-2xl border rounded-md pt-1 mt-12 w-[200px] h-[50px]"
          onClick={handleAdd}
        />
      </div>

      {/* Table to display the list of employees and their salaries */}
      <table className="mt-4 w-full text-center border-2 border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Employee name</th>
            <th className="border border-gray-200 px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section for adding sales and calculating profit */}
      <h1 className='font-lexend mt-3'>Add Sales</h1>

      <div className="flex w-full space-x-10 mt-4">
        <div className="w-full flex-col">
          {/* Input field for total sales */}
          <InputField
            label="Sales"
            type="number"
            name="Sales"
            placeholder="Enter Total Sales"
            required={true}
            value={sales}
            onChange={(e) => setSales(e.target.value)}
            className="h-[40px] rounded-[6px] border[1px] w-full"
          />
          {/* Button to calculate profit */}
          <CustomButton
            title="Calculate"
            containerClass="bg-[#006EC4] text-white text-2xl border rounded-md pt-1 mt-16 w-[350px] h-[50px]"
            onClick={handleCalculate}
          />
        </div>

        {/* Display the calculated profit or a placeholder message */}
        <div className="w-full h-32 border rounded flex justify-center items-center mt-7 text-2xl font-bold">
          {profit !== null ? (
            <div>Profit: {profit}</div>
          ) : (
            <div>Enter sales to calculate profit</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profits;
