import React, { useState } from "react";

const BookmarkForm = ({ API_URL , onBookmarkAdded}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
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

  return (
    <form className="bookmarkForm" onSubmit={handleSubmit}>
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
      />
      <button type="submit" className="bookmark-btn">
        Add Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
