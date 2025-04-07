"use client"; // Required for client-side fetching

import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/search/root", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setResults(data); // Update results with data from the API
    } catch (error) {
      console.error(error);
      alert("Error fetching search results");
    }
  };

  return (
    <div className="search-page p-4">
      <form onSubmit={handleSearch} className="search-bar mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your search..."
          className="border text-gray-500 p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </form>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((root) => (
            <div
              onClick={() => {
                window.location.href = `/root/${root._id}`;
              }}
              key={root._id}
              className="result-item border p-3 rounded mb-2"
            >
              <h3 className="text-lg font-bold">{root.name}</h3>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
