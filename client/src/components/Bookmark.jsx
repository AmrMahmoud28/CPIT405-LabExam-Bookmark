import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Bookmark = ({ bookmark, updateBookmark, API_URL, setEditBookmark }) => {
  const id = bookmark.id;
  const title = bookmark.title;
  const link = bookmark.link;

  const deleteBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch(API_URL + "delete.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      updateBookmark();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="bookmark">
        <p>{title}</p>
        <div>
          <FaEdit
            className="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditBookmark(bookmark);
            }}
          />
          <FaTrash className="icon" onClick={deleteBookmark} />
        </div>
      </div>
    </a>
  );
};

export default Bookmark;
