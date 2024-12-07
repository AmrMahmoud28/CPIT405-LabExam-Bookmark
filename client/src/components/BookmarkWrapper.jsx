import React, { useEffect, useState } from "react";
import BookmarkForm from "./BookmarkForm";

const BookmarkWrapper = () => {
  const API_URL = "http://localhost:3000/api/";
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const response = await fetch(API_URL + "readAll.php");
    const jsonData = await response.json();
    setBookmarks(jsonData);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="bookmarkWrapper">
      <BookmarkForm API_URL={API_URL} onBookmarkAdded={fetchBookmarks}/>
      {bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark) => (
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

export default BookmarkWrapper;
