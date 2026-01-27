import MaterialTable from "@material-table/core";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Divider, TextField, Grid
} from "@mui/material";
import {formControlClasses,MenuItem,FormHelperText} from "@mui/material";
import { useState, useEffect } from "react";
import { InputLabel,FormControl,Select } from "@mui/material";
import { useStyles } from "./ContactusCss";
import Swal from 'sweetalert2';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";
import Titlebar from "../components/Titlebar";
import { postData, getData, serverURL } from "../../services/Fetchnodeservices";

export default function Displayallevent() {
  
  const classes = useStyles();
  const [Contact, setContact] = useState([]);
  const [name, setname] = useState('');
     const [email, setemail] = useState('');
     const [phone, setphone] = useState('');
     const [message, setmessage] = useState('');
  const [id, setid] = useState('');
 
 


  const fetchAllcontact = async () => {
    const response = await getData('contactus/display_all_contact');
    if (response.status) setContact(response.data);
  };

  useEffect(() => {
    fetchAllcontact();
  }, []);

 
  

  

   
  

     

  


          

       
  const showallforms = () => (
    <MaterialTable
      title="Event List"
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'student name', field: 'name' },
            { title: 'student email', field: 'email' },
                { title: 'student phone number', field: 'phone' },
                    { title: 'Student message', field: 'message' },
                        { title: 'Time', field: 'created_at' },

        
      ]}
      data={Contact}
      
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {showallforms()}

      </div>
    </div>
  );
}
