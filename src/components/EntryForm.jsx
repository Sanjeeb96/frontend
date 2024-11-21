import React, { useState } from "react";

function EntryForm({ onAddEntry }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    type: "Expense",
  });

  const handleSubmit = () => {
    const formattedForm = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date),
    };
    onAddEntry(formattedForm);
    setForm({
      amount: "",
      description: "",
      date: "",
      type: "Expense",
    });
  };

  return (
    <div className="my-4 p-4 bg-gray-100 rounded">
      <input
        type="number"
        placeholder="Amount"
        className="p-2 border mb-2 w-full"
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
        onClick={handleSubmit}
      >
        Add Entry
      </button>
    </div>
  );
}

export default EntryForm;
