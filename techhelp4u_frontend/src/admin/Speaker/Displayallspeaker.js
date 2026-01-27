import MaterialTable from "@material-table/core";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Divider, TextField, Grid
} from "@mui/material";
import { formControlClasses, MenuItem, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import { InputLabel, FormControl, Select } from "@mui/material";
import { useStyles } from "./Speakercss";
import Swal from 'sweetalert2';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";
import Titlebar from "../components/Titlebar";
import { postData, getData, serverURL } from "../../services/Fetchnodeservices";
export default function DisplayallSpeaker() {
  const classes = useStyles()
  const [id, setid] = useState()
  const [speaker, setspeaker] = useState([])
  const navigate = useNavigate();
  const [speakername, setSpeakername] = useState()
  const [speakerrole, setSpeakerrole] = useState()
const [time, settime] = useState()
      const [session, setSession] = useState()
       const [venue, setvenue] = useState()
  const [linkedin, setlinkedin] = useState()
  const [open, setOpen] = useState(false);
  const [buttonStatus, setbuttonStatus] = useState(false);
  const [tempPicture, setTemPicture] = useState('');
  const [icon, setIcon] = useState({ bytes: '', filename: 'add-group.png' });

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
  const fetchAllspeaker = async () => {
    const response = await getData('speaker/display_all_speaker');
    if (response.status) setspeaker(response.data);
  };

  useEffect(() => {
    fetchAllspeaker();
  }, []);

  const openDialog = (rowData) => {
    setid(rowData.id);
  setSpeakername(rowData.speakername)
  setSpeakerrole(rowData.speakerrole)
  setlinkedin(rowData.linkedin)
  setSession(rowData.session)
  settime(rowData.time)
  setvenue(rowData.venue)
  setOpen(true)
  setIcon({ bytes: '', filename: `${serverURL}/images/${rowData.icon}` });
}


const closeDialog = () => setOpen(false);



const handlepictureedit = async () => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('icon', icon.bytes);
  const response = await postData('speaker/edit_speaker_picture', formData);
  Swal.fire({
    icon: response.status ? "success" : "error",
    toast: true,
    text: response.message
  });
  setbuttonStatus(false);
  fetchAllspeaker();
};


const handleeditteam=async()=>{
            
            
   
          
            {
               var body ={'id':id,'speakername':speakername,'speakerrole':speakerrole,'linkedin':linkedin,'session':session,'venue':venue,'time':time}
                
                var response=await postData('speaker/edit_speaker',body)
          if (response.status)
          {
          Swal.fire({
            icon: "success",
            toast: true,
            text: response.message,
          
          });
        }
          else
          {
            Swal.fire({
              icon: "error",
              toast: true,
              text: response.message,
              
            });
    
          }
        }
        fetchAllspeaker()
      }
const handledelete = async () => {
  const response = await postData('speaker/delete_speaker', { id: id });
  Swal.fire({
    icon: response.status ? "success" : "error",
    toast: true,
    text: response.message
  });
  setOpen(false);
  fetchAllspeaker();
};

const handleIconChange = (e) => {
  setbuttonStatus(true);
  setIcon({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) });
  
};


const showevntform = () => (
  <div className={classes.root}>
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid size={12}>

          <Titlebar title="Add Team Member" />

        </Grid>
        <Grid size={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Divider style={{ width: '98%' }} />
        </Grid>
        <TextField
          value={speakername}


          onChange={(e) => setSpeakername(e.target.value)}
          label="speaker Name"
          fullWidth
        />

        <Grid size={12}>
          <TextField value={speakerrole} onChange={(e) => setSpeakerrole(e.target.value)} label="speaker Role" fullWidth />

        </Grid>
        <Grid size={12}>
          <TextField value={linkedin} onChange={(e) => setlinkedin(e.target.value)} label="linkin" fullWidth />

        </Grid>
         <Grid size={12}>
                            <TextField value={session} onChange={(e) => setSession(e.target.value)} label="session" fullWidth />
        
                        </Grid>
                        <Grid size={12}>
                            <TextField value={venue} onChange={(e) => setvenue(e.target.value)} label="venue" fullWidth />
        
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
                        
        <Grid size={12} style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', flexDirection: "column", }}>

          <img src={icon.filename} style={{ width: '10%', alignSelf: 'center' }} />
          
        </Grid>
        <Grid size={12}>
          {buttonStatus ? EditandCancel() : (
            <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
              <input type="file" onChange={handleIconChange} multiple hidden accept="images/*" />
              Upload
            </Button>
          )}
        </Grid>
        <Grid size={6}>

          <Button fullWidth onClick={handleeditteam} variant="contained">Save  </Button>
        </Grid>
        <Grid size={6}>
          <Button fullWidth onClick={handledelete} variant="contained" >Reset</Button>



        </Grid>

      </Grid>

    </div>

  </div>
)
const showDialog = () => (
  <Dialog open={open} fullWidth maxWidth="md">
    <DialogContent>{showevntform()}</DialogContent>
    <DialogActions>
      <Button onClick={closeDialog}>Close</Button>
    </DialogActions>
  </Dialog>
);
const showallforms = () => (
  <MaterialTable
    title="spinsers List"
    columns={[
      { title: 'Id', field: 'id' },
      { title: 'Type', field: 'speakername' },
      { title: 'speakerrole', field: 'speakerrole' },
      { title: 'linkin', field: 'linkedin' },

      { title: 'time', field: 'time' },

      { title: 'venue', field: 'venue' },

      { title: 'session', field: 'session' },

      {
        title: 'Icon',
        render: rowData => <img src={`${serverURL}/images/${rowData.icon}`} width={30} alt="event-icon" />
      }

    ]}
    data={speaker}
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
        onClick: (event) => navigate('/Dashboard/speaker')
      }
    ]}
  />
);

return (
  <div className={classes.root}>
    <div className={classes.box}>
      {showallforms()}
      {showDialog()}
    </div>
  </div>
);
 
}