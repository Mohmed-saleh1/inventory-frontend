'use client'
// Import React and required hooks for state management
import React, { useState } from "react";
// Import Axios for HTTP requests
import axios from "axios";
// Import custom components for input fields and buttons
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

const Profits = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [salary, setSalary] = useState("");
  const [profit, setProfit] = useState("");
  const [totalSalaries, setTotalSalaries] = useState(0);
  const [remainingProfit, setRemainingProfit] = useState(null);
  const [responseMessage, setResponseMessage] = useState(""); // To display API response
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages

  const handleAdd = () => {
    if (employeeName && salary) {
      const updatedEmployees = [...employees, { name: employeeName, salary: parseFloat(salary) }];
      setEmployees(updatedEmployees);

      const total = updatedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
      setTotalSalaries(total);

      setEmployeeName("");
      setSalary("");
    }
  };

  const handleCalculate = async () => {
    if (profit && employees.length > 0) {
      // Prepare data to send to the API
      const salaries = employees.map((employee) => ({ salary: employee.salary }));
      const data = {
        salaries,
        profit: parseFloat(profit),
      };

      try {
        // Make the POST request
        const response = await axios.post(
          "https://inventory-backend-sqbj.onrender.com/products/calculate-profit",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
            if(response.status === 201 || response.status === 200){
              console.log("this is responses", response)
              setRemainingProfit(response.data.remainingProfit);
              setResponseMessage("Calculation successful!");
              setErrorMessage(""); // Clear any previous errors
            }
     
      } catch (error) {
        // Handle errors
        setErrorMessage("Failed to calculate profit. Please try again.");
        setResponseMessage("");
      }
    } else {
      setErrorMessage("Please enter profit and add at least one employee.");
      setResponseMessage("");
    }
  };

  return (
    <div className="flex flex-col px-24 mt-4 shadow-lg h-screen pt-8 w-full rounded-2xl">
      <h1 className="font-lexend font-bold">Add salaries</h1>

      <div className="flex w-full mt-3 space-x-48">
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

      <div className="flex justify-center items-center mt-4">
        <CustomButton
          title="Add"
          containerClass="bg-[#006EC4] text-white text-2xl border rounded-md pt-1 mt-12 w-[200px] h-[50px]"
          onClick={handleAdd}
        />
      </div>

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

      <h1 className="font-lexend mt-3">Add profit</h1>

      <div className="flex w-full space-x-10 mt-4">
        <div className="w-full flex-col">
          <InputField
            label="profit"
            type="number"
            name="profit"
            placeholder="Enter Total profit"
            required={true}
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            className="h-[40px] rounded-[6px] border[1px] w-full"
          />
          <CustomButton
            title="Calculate"
            containerClass="bg-[#006EC4] text-white text-2xl border rounded-md pt-1 mt-16 w-[350px] h-[50px]"
            onClick={handleCalculate}
          />
        </div>

        <div className="w-full h-32 border rounded flex justify-center items-center mt-7 text-2xl font-bold">
          {remainingProfit !== null ? (
            <div>Remaining Profit: {remainingProfit}</div>
          ) : (
            <div>Enter profit to calculate remaining profit</div>
          )}
        </div>
      </div>

      {/* Display response message or error */}
      {responseMessage && <div className="mt-4 text-green-500">{responseMessage}</div>}
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default Profits;
