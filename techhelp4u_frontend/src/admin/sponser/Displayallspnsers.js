import MaterialTable from "@material-table/core";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Divider, TextField, Grid
} from "@mui/material";
import {formControlClasses,MenuItem,FormHelperText} from "@mui/material";
import { useState, useEffect } from "react";
import { InputLabel,FormControl,Select } from "@mui/material";
import { useStyles } from "./SPONSERSCSS";
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
 
 


  const fetchAllsponser = async () => {
    const response = await getData('sponser/display_all');
    if (response.status) setContact(response.data);
  };

  useEffect(() => {
    fetchAllsponser();
  }, []);

 
  

  

   
  

     

  


          

       
  const showallforms = () => (
    <MaterialTable
      title="spinsers List"
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'Type', field: 'type' },
            { title: 'compnayname', field: 'cpmpany_name' },
                { title: 'url', field: 'url' },
                    { title: 'email', field: 'email' },
                                        { title: 'personname', field: 'name' },
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
