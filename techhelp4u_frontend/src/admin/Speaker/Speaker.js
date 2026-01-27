import { useStyles } from "./Speakercss";
import { Button, Divider, TextField } from "@mui/material";
import { Select, InputLabel, FormControl, MenuItem, Grid } from "@mui/material";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";

import Titlebar from "../components/Titlebar";
import { postData, getData } from "../../services/Fetchnodeservices";

export default function Speaker() {
  const classes = useStyles();
  const [workshopid, setworkshopid] = useState("");
  const [Speakername, setSpeakername] = useState("");
  const [speakerrole, setSpeakerrole] = useState("");
  const [time, settime] = useState("");
  const [session, setSession] = useState("");
  const [venue, setvenue] = useState("");
  const [icon, setIcon] = useState({ bytes: "", filename: "add-group.png" });
  const [linkedin, setlinkedin] = useState("");
  const [eventlist, seteventlist] = useState([]);

  // ✅ Safe API call
  const fetchAllevent = async () => {
        var response = await getData("workshops/display_all_event");
        seteventlist(response.data);
      };

  useEffect(() => {
    fetchAllevent();
  }, []);

  // ✅ Safe rendering
  const filleventMenu = () => {
    return (eventlist || []).map((item) => (
      <MenuItem key={item.workshopid} value={item.workshopid}>
        {item.eventname}
      </MenuItem>
    ));
  };

  const clearData = () => {
    setworkshopid("");
    setSpeakername("");
    setSpeakerrole("");
    setlinkedin("");
    settime("");
    setSession("");
    setvenue("");
    setIcon({ bytes: "", filename: "add-group.png" });
  };

  const handleClick = async () => {
    var formData = new FormData();
    formData.append("workshopid", workshopid);
    formData.append("speakername", Speakername);
    formData.append("speakerrole", speakerrole);
    formData.append("linkedin", linkedin);
    formData.append("time", time);
    formData.append("session", session);
    formData.append("venue", venue);
    formData.append("icon", icon.bytes);

    var response = await postData("speaker/submit", formData);
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

  const handleIconChange = (e) => {
    setIcon({
      bytes: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Titlebar title="Add Team Member" />
          </Grid>

          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>event</InputLabel>
              <Select
                label="CategoryId"
                value={workshopid}
                onChange={(e) => setworkshopid(e.target.value)}
              >
                {filleventMenu()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={Speakername}
              onChange={(e) => setSpeakername(e.target.value)}
              label="Speaker Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={speakerrole}
              onChange={(e) => setSpeakerrole(e.target.value)}
              label="Speaker Role"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={linkedin}
              onChange={(e) => setlinkedin(e.target.value)}
              label="LinkedIn"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={session}
              onChange={(e) => setSession(e.target.value)}
              label="Session"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={venue}
              onChange={(e) => setvenue(e.target.value)}
              label="Venue"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Time"
              type="time"
              value={time}
              onChange={(e) => settime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={icon.filename} style={{ width: "10%", alignSelf: "center" }} alt="preview" />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              startIcon={<CloudUploadIcon />}
              component="label"
              variant="contained"
            >
              <input type="file" onChange={handleIconChange} hidden accept="image/*" />
              Upload
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth onClick={handleClick} variant="contained">
              Save
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth onClick={clearData} variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
