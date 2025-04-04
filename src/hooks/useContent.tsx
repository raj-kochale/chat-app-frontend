import { useState, useEffect } from 'react';

const BACKEND_URL = "http://localhost:5000/api/v1/";

export function useContent() {
  const [content, setContent] = useState([]); // ✅ Default to an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`${BACKEND_URL}content`); // ✅ Fetch from API
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Content:", data);  // ✅ Debugging step
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent([]);  // ✅ Prevents app from breaking
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, loading };
}
