import React, { useEffect, useState } from "react";
import BookmarkForm from "./BookmarkForm";
import Bookmark from "./Bookmark";

const BookmarkWrapper = () => {
  const API_URL = "http://localhost:3000/api/";
  const [bookmarks, setBookmarks] = useState([]);
  const [editBookmark, setEditBookmark] = useState(null);

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
      <h1>Welcome to Bookmark App</h1>
      <BookmarkForm
        API_URL={API_URL}
        onBookmarkAdded={fetchBookmarks}
        editBookmark={editBookmark}
        setEditBookmark={setEditBookmark}
      />
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <Bookmark
            key={bookmark.id}
            bookmark={bookmark}
            updateBookmark={fetchBookmarks}
            API_URL={API_URL}
            setEditBookmark={setEditBookmark}
          />
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
};

export default BookmarkWrapper;
