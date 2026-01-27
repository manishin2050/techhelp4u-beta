import MaterialTable from "@material-table/core";
import Grid from '@mui/material/Grid';
import { useStyles } from "./ContactusCss";
import { postData } from "../../services/Fetchnodeservices";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button,Divider,TextField } from "@mui/material";
export default function Contactus() {
  const classes = useStyles();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [message, setmessage] = useState('');

    const clearData=()=>{
       setname('')
       setemail('')
       setphone('')
       setmessage('')
  }
  const handleclick=async()=>{
       var body={"name":name,'phone':phone,'email':email,'message':message}
       var response=await postData('contactus/submit_contact',body)

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
;

  return (
    <div className={classes.container}>
        <Grid container spacing={2}>
               <Grid size={12} style={{display:'flex',justifyContent:'center'}}>
     <Divider style={{width:'98%'}}/>
  </Grid>
   <Grid size={12}>
     <TextField   value={name}   onChange={(e)=>setname(e.target.value)} label ="Name" fullWidth/>
    </Grid>
    <Grid size={12}>
     <TextField   value={email} onChange={(e) => setemail(e.target.value)} label ="Name" fullWidth/>
    </Grid>
     <Grid size={12}>
     <TextField   value={phone} onChange={(e) => setphone(e.target.value)}  label ="Name" fullWidth/>
    </Grid>   <Grid size={12}>
  <TextField
    label="Your Message"
    value={message}
    onChange={(e) => setmessage(e.target.value)}
    multiline
    rows={4}  // 👈 Change this to control height
    fullWidth
  />
</Grid>

     <Grid size={12}>
 
  <Button onClick={handleclick} fullWidth variant="contained">Save  </Button>
  </Grid>
        </Grid>
    </div>
  
  );
}
