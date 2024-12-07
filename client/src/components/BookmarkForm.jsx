import React, { useEffect, useState } from "react";

const BookmarkForm = ({
  editBookmark,
  setEditBookmark,
  API_URL,
  onBookmarkAdded,
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (editBookmark) {
      setTitle(editBookmark.title);
      setLink(editBookmark.link);
    }
  }, [editBookmark]);

  const handleAdding = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + "create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, link }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the bookmark.");
      }

      onBookmarkAdded();
      setTitle("");
      setLink("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (title === editBookmark.title) {
      setEditBookmark(null);
      setTitle("");
      setLink("");
      return;
    }

    const id = editBookmark.id;

    try {
      const response = await fetch(API_URL + "update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the bookmark.");
      }

      onBookmarkAdded();
      setEditBookmark(null);
      setTitle("");
      setLink("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="bookmarkForm"
      onSubmit={editBookmark ? handleUpdate : handleAdding}
    >
      <input
        type="text"
        className="bookmark-input"
        placeholder="Title of bookmark..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="bookmark-input"
        placeholder="Link of bookmark..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        pattern="https?://[^\s]+\.[^\s]+"
        title="Please enter a valid URL"
        disabled={!!editBookmark}
      />
      <button type="submit" className="bookmark-btn">
        {editBookmark ? "Update" : "Add"} Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
