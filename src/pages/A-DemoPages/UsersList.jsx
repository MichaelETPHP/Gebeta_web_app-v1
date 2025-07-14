import React, { useEffect, useState } from "react";
// import axios from "axios"; // Removed unused import
import Card from "../../components/Cards/Cards"; // Assuming these components exist
import Loading from "../../components/Loading/Loading"; // Assuming these components exist

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // For testing, hardcoded token. In production, get this securely.
  const authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmQxMTQwNTk2ZWI2YmE5Njk2YTlkMSIsImlhdCI6MTc1MjQ3OTc5OCwiZXhwIjoxNzYwMjU1Nzk4fQ.2W_zd3SEekaE8GouOsq0CAdIWtoPERYs4ap1Lyvj-LM`;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Start loading
      setError(""); // Clear previous errors
      try {
        const res = await fetch("https://gebeta-delivery1.onrender.com/api/v1/users", {
          headers: {
            Authorization: authToken,
          },
        });

        const data = await res.json(); // Await the JSON parsing

        if (!res.ok) {
          // If response is not OK (e.g., 401, 404, 500), throw an error
          throw new Error(data.message || `API Error: ${res.status}`);
        }

        setUsers(data.data.users); // Access the 'users' array within 'data.data'
        console.log("Fetched users:", data.data.users); // Log fetched data
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to fetch users"); // Use err.message for fetch errors
      } finally {
        setIsLoading(false); // End loading regardless of success or failure
      }
    };

    fetchUsers();
  }, [authToken]); // Re-run if authToken changes (though it's hardcoded here)

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p className="text-red-500 max-w-[500px]">{error}</p>}

      {isLoading && !error && <Loading />} {/* Show loading only if no error and loading */}

      {!isLoading && !error && users.length > 0 ? (
        users.map((user) => (
          <Card key={user._id}> {/* Assuming user object has an _id for key */}
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </Card>
        ))
      ) : (
        !isLoading && !error && users.length === 0 && <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default UserList;