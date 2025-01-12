// Example of the fetchUserRole function
export const fetchUserRole = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${userId}/role`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user role");
    }
    const data = await response.json();
    return data.role; // Assuming the response contains a "role" field
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};
