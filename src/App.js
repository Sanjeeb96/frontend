import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    type: "Expense",
  });

  const fetchBalance = async () => {
    const { data } = await axios.get("http://localhost:5000/getBalance");
    setBalance(data.balance);
    setEntries(data.entries);
  };

  const addEntry = async () => {
    await axios.post("http://localhost:5000/addEntry", form);
    fetchBalance();
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://localhost:5000/deleteEntry/${id}`);
    fetchBalance();
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>

      {/* Form */}
      <div className="my-4 p-4 bg-gray-100 rounded">
        <input
          type="number"
          placeholder="Amount"
          className="p-10 border mb-2 w-full"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border mb-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border mb-2 w-full"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <select
          className="p-2 border mb-2 w-full"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <button
          className="p-2 bg-blue-500 text-white w-full"
          onClick={addEntry}
        >
          Add Entry
        </button>
      </div>

      {/* Net Balance */}
      <h2 className="text-xl font-semibold">Net Balance: ${balance}</h2>

      {/* Entry List */}
      <div className="mt-4">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="p-2 bg-gray-100 rounded mb-2 flex justify-between"
          >
            <span>
              {entry.description} - ${entry.amount}
            </span>
            <button
              className="text-red-500"
              onClick={() => deleteEntry(entry._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
