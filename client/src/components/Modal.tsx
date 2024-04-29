import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid black",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ reload }: { reload: () => void }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [year, setYear] = React.useState(0);
  const handleAddFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      title,
      author,
      year,
    });
    axios({
      method: "POST",
      url: "http://localhost:4000/api/books",
      data: {
        title,
        author,
        year,
      },
    })
      .then(() => alert("Book added successfully!"))
      .then(() => {
        setTitle("");
        setAuthor("");
        setYear(0);
      })
      .then(() => reload());
  };
  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          right: "30px",
          top: "40px",
          color: "black",
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "10px",
          zIndex: 4,
        }}
        onClick={handleOpen}
      >
        Add A Book 📚
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Book info
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
            onSubmit={handleAddFormSubmit}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <label htmlFor="title">Title</label>
              <input
                style={{ flex: "auto", padding: "7px 10px" }}
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <label htmlFor="author">Author</label>
              <input
                style={{ flex: "auto", padding: "7px 10px" }}
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <label htmlFor="">Year</label>
              <input
                style={{ flex: "auto", padding: "7px 10px" }}
                name="year"
                type="number"
                value={year}
                onChange={(e) => setYear(+e.target.value)}
              />
            </div>
            <Button
              sx={{
                color: "black",
              }}
              type="submit"
            >
              add to database
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
