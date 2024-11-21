import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchBalance, addEntry, deleteEntry } from "./api/api";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import NetBalance from "./components/NetBalance";

function App() {
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    try {
      const data = await fetchBalance();
      setBalance(data.balance);
      setEntries(data.entries);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleAddEntry = async (form) => {
    try {
      await addEntry(form);
      // Prepend the new entry to the top of the list
      setEntries([{ ...form, _id: Date.now().toString() }, ...entries]);
      updateData(); // Update balance and fetch updated entries from the server
    } catch (error) {
      console.error("Error adding entry:", error.message);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteEntry(id);
      updateData();
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
      <EntryForm onAddEntry={handleAddEntry} />
      <NetBalance balance={balance} />
      <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />
    </div>
  );
}

export default App;
