'use client'

import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const id = params.rootId; // Extract 'id' from the route
  const [root, setRoot] = useState(null); // State to store root data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRootData = async (rootId) => {
      try {
        const response = await fetch(`/api/root?rootId=${rootId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch root data");
        }
        const data = await response.json();
        console.log(data);
        
        setRoot(data.root); // Set the root object in state
      } catch (error) {
        setError(error.message);
      }
    };

    // Only fetch data if 'id' is available
    if (id) {
      fetchRootData(id);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {root ? (
        <div>
          <h1 className="text-2xl font-bold">{root.name}</h1>
          <p className="text-gray-600">ID: {root._id}</p>
          <h2 className="text-xl font-semibold mt-4">Tags:</h2>
          <ul className="list-disc list-inside mb-4">
            {root.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Possible Names:</h2>
          <ul className="list-disc list-inside mb-4">
            {root.possibleNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Related Roots:</h2>
          <ul className="list-disc list-inside mb-4">
            {root.related.map((relatedId, index) => (
              <li key={index}>{relatedId}</li> // Replace this with a more meaningful lookup if necessary
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading... {id}</p>
      )}
    </div>
  );
};

export default Page;
