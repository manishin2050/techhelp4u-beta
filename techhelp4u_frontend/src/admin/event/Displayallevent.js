import MaterialTable from "@material-table/core";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Divider, TextField, Grid
} from "@mui/material";
import {formControlClasses,MenuItem,FormHelperText} from "@mui/material";
import { useState, useEffect } from "react";
import { InputLabel,FormControl,Select } from "@mui/material";
import { useStyles } from "./EventCss";
import Swal from 'sweetalert2';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";
import Titlebar from "../components/Titlebar";
import { postData, getData, serverURL } from "../../services/Fetchnodeservices";

export default function Displayallevent() {
  
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [type,settype]=useState('')
  const [status,setstatus]=useState('')
  const [id, setid] = useState('');
  const [open, setOpen] = useState(false);
  const [eventname, setEventName] = useState('');
  const [location, setlocation] = useState('');
  const [date, setdate] = useState('');
  const [time, setTime] = useState('');
  const [eventdescription, seteventdescription] = useState('');
  const [icon, setIcon] = useState({ bytes: '', filename: 'add-group.png' });
  const [error, seterror] = useState({});
  const [buttonStatus, setbuttonStatus] = useState(false);
  const [tempPicture, setTemPicture] = useState('');
  const navigate = useNavigate();

  const cancelpicture = () => {
    setIcon({ bytes: '', filename: `${serverURL}/images/${tempPicture}` });
    setbuttonStatus(false);
  };

  const EditandCancel = () => (
    <div>
      <Button onClick={handlepictureedit}>Edit</Button>
      <Button onClick={cancelpicture}>Cancel</Button>
    </div>
  );

  const fetchAllEvents = async () => {
    const response = await getData('workshops/display_all_event');
    if (response.status) setEvents(response.data);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const openDialog = (rowData) => {
    setid(rowData.id);
    setEventName(rowData.eventname);
    setTime(rowData.time);
    setdate(rowData.date);
    setstatus(rowData.status)
    setlocation(rowData.location);
    seteventdescription(rowData.eventdescription);
    setIcon({ bytes: '', filename: `${serverURL}/images/${rowData.icon}` });
    setTemPicture(rowData.icon);
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  const handleError = (label, message) => {
    seterror(prev => ({ ...prev, [label]: message }));
  };

  const handlepictureedit = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('icon', icon.bytes);
    const response = await postData('workshops/edit_event_picture', formData);
    Swal.fire({
      icon: response.status ? "success" : "error",
      toast: true,
      text: response.message
    });
    setbuttonStatus(false);
    fetchAllEvents();
  };

  const validateData = () => {
    let err = false;
    let newErrors = {};

    if (!eventname) {
      newErrors.eventname = "Event name should not be blank";
      err = true;
    }
    if (!eventdescription) {
      newErrors.eventdescription = "Description should not be blank";
      err = true;
    }
    if (!location) {
      newErrors.location = "Location should not be blank";
      err = true;
    }
    if (!time) {
      newErrors.time = "Time should not be blank";
      err = true;
    }
    if (!date) {
      newErrors.date = "Date should not be blank";
      err = true;
    }
    if (!icon.bytes) {
      newErrors.filename = "Please choose icon for category";
      err = true;
    }

    if (status.length==0){
            handleError('status',"description should not be blank")
            error=true
        }
    seterror(newErrors);
    return err;
  };

  const hadleeditevent = async () => {
    const hasError = validateData();
    if (!hasError) {
          const formattedDate = new Date(date).toISOString().split("T")[0];
     const body = {
  id,
  eventdescription,
  eventname,
  time,
  status,
  date: formattedDate, // 👈 fixed here
  type,
  location
};

      const response = await postData('workshops/edit_event', body);
      Swal.fire({
        icon: response.status ? "success" : "error",
        toast: true,
        text: response.message
      });
      fetchAllEvents();
      setOpen(false);
    }
  };

  const handledelete = async () => {
    const response = await postData('workshop/delete_event', { id: id });
    Swal.fire({
      icon: response.status ? "success" : "error",
      toast: true,
      text: response.message
    });
    setOpen(false);
    fetchAllEvents();
  };

  const handleIconChange = (e) => {
    setbuttonStatus(true);
    setIcon({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) });
    handleError("filename", "");
  };

  const showevntform = () => (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}><Titlebar title="Edit Event" /></Grid>
          <Grid item xs={12}><Divider style={{ width: '98%' }} /></Grid>
          <Grid item xs={12}>
            <TextField
              value={eventname}
              helperText={error.eventname}
              error={Boolean(error.eventname)}
              onFocus={() => handleError('eventname', "")}
              onChange={(e) => setEventName(e.target.value)}
              label="Event Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={time}
              helperText={error.time}
              error={Boolean(error.time)}
              onFocus={() => handleError('time', "")}
              onChange={(e) => setTime(e.target.value)}
              label="Time"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={date}
              helperText={error.date}
              error={Boolean(error.date)}
              onFocus={() => handleError('date', "")}
              onChange={(e) => setdate(e.target.value)}
              label="Date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={eventdescription}
              helperText={error.eventdescription}
              error={Boolean(error.eventdescription)}
              onFocus={() => handleError('eventdescription', "")}
              onChange={(e) => seteventdescription(e.target.value)}
              label="Description"
              fullWidth
            />
          </Grid>
<Grid size={12}>
            <FormControl fullWidth>
              <InputLabel> type </InputLabel>
              <Select
               value={type || ""}

error={Boolean(error?.type)}
                onFocus={() => handleError("type", null)}
                label="type"
                onChange={(e) => settype(e.target.value)}
              >  <MenuItem value="worskhop">workshops</MenuItem>
                <MenuItem value="seminar">seminar</MenuItem>
                <MenuItem value="webinar">webinar</MenuItem>
                <MenuItem value="Festival">Festival</MenuItem>
                <MenuItem value="Competetion">Competetion</MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Meetup">Meetup</MenuItem>
                <MenuItem value="Celebration">Celebration</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
                <MenuItem value="Lounch">Lounch</MenuItem>

              
              </Select>
              <FormHelperText>
  <span className={classes.error}>{error?.type}</span> ✅
</FormHelperText>

            </FormControl>
          </Grid>
                      <Grid size={12}>
                      <FormControl fullWidth>
                        <InputLabel>Status </InputLabel>
                       <Select
  value={status || ""}

                          error={Boolean(error?.status)}
                          onFocus={() => handleError("status", null)}
                          label="status"
                          onChange={(e) => setstatus(e.target.value)}
                        >  <MenuItem value="Upcoming">upcoming</MenuItem>
                          <MenuItem value="ongoing">ongoing</MenuItem>
                          <MenuItem value="cancelled">cancelled</MenuItem>
                          <MenuItem value="Past">past</MenuItem>
                          <MenuItem value="schedule">schedule</MenuItem>
                         
                        
                        </Select>
                        <FormHelperText>
            <span className={classes.error}>{error?.status}</span> ✅
          </FormHelperText>
          
                      </FormControl>
                    </Grid>
          <Grid item xs={12}>
            <TextField
              value={location}
              helperText={error.location}
              error={Boolean(error.location)}
              onFocus={() => handleError('location', "")}
              onChange={(e) => setlocation(e.target.value)}
              label="Location"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src={icon.filename} style={{ width: '10%' }} />
            <div className={classes.helperTextStyle}>{error.filename}</div>
          </Grid>
          <Grid item xs={12}>
            {buttonStatus ? EditandCancel() : (
              <Button fullWidth startIcon={<CloudUploadIcon />} component="label" variant="contained">
                <input onChange={handleIconChange} type="file" hidden accept="image/*" />
                Upload
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button onClick={hadleeditevent} fullWidth variant="contained">Save</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handledelete} fullWidth variant="contained">Delete</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const showDialog = () => (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogContent>{showevntform()}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  const showallevent = () => (
    <MaterialTable
      title="Event List"
      columns={[
        { title: 'Id', field: 'workshopid' },
        { title: 'Event Name', field: 'eventname' },
            { title: 'Event Time', field: 'time' },
                { title: 'Event date', field: 'date' },
                    { title: 'Event type', field: 'type' },
                        { title: 'location', field: 'location' },
        { title: 'Event Description', field: 'eventdescription' },
         { title: 'status', field: 'status' },
        {
          title: 'Icon',
          render: rowData => <img src={`${serverURL}/images/${rowData.icon}`} width={30} alt="event-icon" />
        }
      ]}
      data={events}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Event',
          onClick: (event, rowData) => openDialog(rowData)
        },
        {
          icon: 'add',
          tooltip: 'Add Event',
          isFreeAction: true,
          onClick: (event) => navigate('/Dashboard/event')
        }
      ]}
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {showallevent()}
        {showDialog()}
      </div>
    </div>
  );
}
