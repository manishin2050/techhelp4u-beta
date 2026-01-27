import { useStyles } from "./EventCss";
import Titlebar from "../components/Titlebar";
import Grid from '@mui/material/Grid';
import { Button,Divider,InputLabel,TextField,FormControl,Select } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import {formControlClasses,MenuItem,FormHelperText} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postData } from "../../services/Fetchnodeservices";
export default function Event(){
    const classes=useStyles()
    const [eventname, setEventName] = useState('')
const [location,setlocation]=useState('')
 const [date,setdate]=useState('')
 const [time,setTime]=useState('')
  const [type,settype]=useState('')
  const [status,setstatus]=useState('')
  
    const [eventdescription,seteventdescription]=useState('')
    const[icon,setIcon]=useState({bytes:'',filename:'add-group.png'})
    const [error,seterror]=useState({filename:''})
   
    const handleError=(label,message)=>{
        seterror((prev)=>({...prev,[label]:message}))
    }
    const clearData=()=>{
        setEventName("")
        setTime("")
        setdate("")
        settype("")
        setstatus("")
        setlocation("")
        seteventdescription("")
       
        setIcon({bytes:'',filename:'add-group.png'})
    }
    const validateData=()=>{
        var error=false
        if (eventname.length==0){
            handleError('eventname',"eventname should not be blank")
            error=true
        }
        if (eventdescription.length==0){
            handleError('eventdescription',"description should not be blank")
            error=true
        }
        if (location.length==0){
            handleError('location',"description should not be blank")
            error=true
        }
        if (time.length==0){
            handleError('time',"description should not be blank")
            error=true
        }
        if (date.length==0){
            handleError('date',"description should not be blank")
            error=true
        }
        if (type.length==0){
            handleError('type',"description should not be blank")
            error=true
        }
        if (status.length==0){
            handleError('status',"description should not be blank")
            error=true
        }
        
        
        if (icon.bytes.length == 0) {
      handleError("filename", "Please choose icon for category....");
      error = true;
    }
    return error
    }
    const handleclick = async () => {
  var error = validateData();
  if (!error) {
    var formData = new FormData();
    formData.append("eventname", eventname);
       formData.append("date", date);
          formData.append("time", time);
             formData.append("type", type);
             formData.append("status", status);
             formData.append("location", location);
    formData.append("eventdescription", eventdescription);
    formData.append("icon", icon.bytes);
  for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    var response = await postData('workshops/submit_event', formData);
    


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
        text: response.message 
      });
    }

    clearData();
  }
};
 const handleIconChange=(e)=>{
      setIcon({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
       handleError("filename", "");
  }

  return(
      <div className={classes.root}>
<div className={classes.box}>
  <Grid container spacing={2}>
    <Grid size ={12}>
     
            <Titlebar title=" Add event"/>

    </Grid>
 <Grid size={12} style={{display:'flex',justifyContent:'center'}}>
     <Divider style={{width:'98%'}}/>
  </Grid>
 <Grid size={12}>
   <TextField  value={eventname} helperText={error.eventname} error={error.eventname}  onFocus={()=>handleError('eventname',"")} onChange={(e)=>setEventName(e.target.value)} label ="Event Name" fullWidth/>
  </Grid>
   <Grid size={12}>
   <Grid item xs={12}>
  <TextField
    label="Time"
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    fullWidth
    InputLabelProps={{ shrink: true }}
    helperText={error.time}
    error={Boolean(error.time)}
    onFocus={() => handleError("time", "")}
  />
</Grid>

  </Grid>
   <Grid size={12}>
   <TextField
  label="Date"
  type="date"
  value={date}
  fullWidth
  InputLabelProps={{
    shrink: true,
  }}
  helperText={error.date}
  error={Boolean(error.date)}
  onFocus={() => handleError("date", "")}
  onChange={(e) => setdate(e.target.value)}
/>
</Grid>
  
  <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel> type </InputLabel>
              <Select
                value={type}
                error={error?.type}
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
                value={status}
                error={error?.type}
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
  <span className={classes.error}>{error?.type}</span> ✅
</FormHelperText>

            </FormControl>
          </Grid>
  <Grid size={12}>
   <TextField  value={eventdescription} helperText={error.eventdescription} error={error.eventdescription}  onFocus={()=>handleError('eventdescription',"")} onChange={(e)=>seteventdescription(e.target.value)} label ="description" fullWidth/>
  </Grid>
   <Grid size={12}>
   <TextField  value={location} helperText={error.location} error={error.location}  onFocus={()=>handleError('location',"")} onChange={(e)=>setlocation(e.target.value)} label ="location" fullWidth/>
  </Grid>
  
   <Grid size={12} style={{display:'flex',justifyContent:'center',alignItem:'center', flexDirection: "column",}}>
   
   
    <img src={icon.filename} style={{width:'10%',alignSelf:'center'}}/>
  <div className={classes.helperTextStyle}>{error.filename}</div>
    </Grid>
    <Grid size={12}>
    <Button  fullWidth startIcon={<CloudUploadIcon/>}component='label' variant="contained">
  <input   onChange={handleIconChange} type="file" multiple hidden accept="images/*"/>
  Upload
    </Button>
   
   
  </Grid>
  <Grid size={6}>
 
  <Button onClick={handleclick} fullWidth variant="contained">Save  </Button>
  </Grid>
  <Grid size={6}>
  <Button fullWidth  onClick={clearData} variant="contained" >Reset</Button>


 
  </Grid>
    </Grid>

        </div>
    </div>
  )

}