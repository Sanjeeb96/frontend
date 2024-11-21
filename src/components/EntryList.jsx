import React from "react";

function EntryList({ entries, onDeleteEntry }) {
  return (
    <div className="mt-4">
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="p-2 bg-gray-100 rounded mb-2 flex justify-between"
        >
          <div>
            <p>
              <strong>{entry.description}</strong> - ${entry.amount}{" "}
              <span className="text-sm text-gray-500">
                ({new Date(entry.date).toLocaleDateString()})
              </span>
            </p>
          </div>
          <button
            className="text-red-500"
            onClick={() => onDeleteEntry(entry._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EntryList;
