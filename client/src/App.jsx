import { useEffect, useState } from "react";

const App = () => {
  const apiUrl = "http://localhost:3000/api/";
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl + "readAll.php");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Bookmarks</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>{" "}
              - Added on {bookmark.date_added}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
};

export default App;
