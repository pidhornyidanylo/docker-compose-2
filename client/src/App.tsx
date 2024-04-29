import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import BasicModal from "./components/Modal";
import EditModal from "./components/EditModal";

export type Book = {
  _id: string;
  title: string;
  author: string;
  year: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/api/books").then((res) => {
      setBooks(res.data);
    });
  }, [state]);
  const handleBookDelete = (id: string) => {
    axios
      .delete(`http://localhost:4000/api/books/${id}`)
      .then(() => setState((prev) => prev + 1));
  };
  const reload = () => {
    setState(prev => prev + 1)
  }
  return (
    <>
      <BasicModal reload={reload} />
      <h3>Books List</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {books.map((book, index) => (
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              minWidth: "350px",
              position: "relative",
              padding: "10px 5px",
            }}
            key={index}
          >
            <span
              style={{
                backgroundColor: "pink",
                borderRadius: "5px",
                position: "absolute",
                right: "5px",
                top: "5px",
                padding: "2px 5px",
                fontWeight: "600",
              }}
            >
              {book.year}
            </span>
            <span
              style={{
                borderRadius: "5px",
                position: "absolute",
                left: "5px",
                top: "5px",
                fontSize: "12px",
                padding: "2px 5px",
                fontWeight: "600",
              }}
            >
              {book._id}
            </span>
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  margin: "0",
                  lineHeight: "150%",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                {book.title}
              </p>
              <p
                style={{
                  margin: "0",
                  lineHeight: "150%",
                  fontSize: "18px",
                  fontStyle: "italic",
                }}
              >
                by: {book.author}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <EditModal reload={reload} book={book} />
              <button
                onClick={() => handleBookDelete(book._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "pink",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
