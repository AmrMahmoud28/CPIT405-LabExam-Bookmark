<?php

class Bookmark
{
    private $id;
    private $title;
    private $link;
    private $dateAdded;
    private $dbConnection;
    private $dbTable = "bookmarks";

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getLink()
    {
        return $this->link;
    }

    public function setLink($link)
    {
        $this->link = $link;
    }

    public function getDateAdded()
    {
        return $this->dateAdded;
    }

    public function setDateAdded($dateAdded)
    {
        $this->dateAdded = $dateAdded;
    }

    public function create()
    {
        $query = "INSERT INTO $this->dbTable (title, link, date_added) VALUES (:title, :link, NOW());";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':link', $this->link);
        if ($stmt->execute()) {
            $this->id = $this->dbConnection->lastInsertId();
            return true;
        }
        printf("ERROR: %s", $stmt->error);
        return false;
    }

    public function readOne()
    {
        $query = "SELECT * FROM $this->dbTable WHERE id = :id;";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute() && $stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->title = $row['title'];
            $this->link = $row['link'];
            $this->dateAdded = $row['date_added'];
            return true;
        }
        return false;
    }

    public function readAll()
    {
        $query = "SELECT * FROM $this->dbTable ORDER BY date_added DESC;";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update()
    {
        $query = "UPDATE $this->dbTable SET title = :title WHERE id = :id;";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute() && $stmt->rowCount() == 1) {
            return true;
        }
        printf("ERROR: %s", $stmt->error);
        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM $this->dbTable WHERE id = :id;";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute() && $stmt->rowCount() == 1) {
            return true;
        }
        printf("ERROR: %s", $stmt->error);
        return false;
    }
}
