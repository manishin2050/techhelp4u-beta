import { useStyles } from "./Pagecss";
import Titlebar from "../components/Titlebar";
import Grid from '@mui/material/Grid';
import { Button, Divider, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postData } from "../../services/Fetchnodeservices";

export default function Pages() {
  const classes = useStyles();

  const [selectedPage, setSelectedPage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  // file change
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // save
  const handleClick = async () => {
    if (!title || !description || !link || !image || !selectedPage) {
      Swal.fire({
        icon: "error",
        text: "Please fill all fields",
      });
      return;
    }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("page_name", selectedPage);
    formData.append("description", description);
    formData.append("link", link);

    var response = await postData("page/save", formData);

    if (response.status) {
      Swal.fire({
        icon: "success",
        toast: true,
        text: response.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        toast: true,
        text: response.message,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Titlebar title=" Add Event" />
          </Grid>

          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          {/* Page Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel> Page </InputLabel>
              <Select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="workshop">Workshop</MenuItem>
                <MenuItem value="about">About</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
                <MenuItem value="team">Team</MenuItem>
                <MenuItem value="event">Event</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Show form only if page selected */}
          {selectedPage && (
            <>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                {preview && (
                  <img src={preview} alt="preview" style={{ width: "150px", margin: "10px auto" }} />
                )}
              </Grid>



              <Grid item xs={12}>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-md p-2 mb-4"
                />
              </Grid>

              <Grid item xs={12}>
                <label className="block mb-2 font-medium">Link</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border rounded-md p-2 mb-4"
                />
              </Grid>

              <Grid item xs={12}>
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md p-2 mb-4"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  component="label"
                  variant="contained"
                >
                  Upload
                  <input
                    onChange={handleIconChange}
                    type="file"
                    hidden
                    accept="image/*"
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Save
                </Button>
              </Grid>

            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
