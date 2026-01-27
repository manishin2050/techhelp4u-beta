import { useStyles } from "./TeamCss";
import { Button, Divider, TextField } from "@mui/material";

import { Grid } from '@mui/material';
import Swal from 'sweetalert2'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Titlebar from "../components/Titlebar";
import { postData } from "../../services/Fetchnodeservices";

export default function Team() {
  const classes = useStyles()
  const [membername, setMembername] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: 'add-group.png' })
  const [error, seterror] = useState({ filename: '' })
  const [memberrole, setMemberrole] = useState('')
  const [memberdescription, setMemberdescription] = useState('')
  const [instagram, setinstagra] = useState('')
  const [linkedin, setlinkedin] = useState('')
  const handleError = (label, message) => {
    seterror((prev) => ({ ...prev, [label]: message }))

  }
  const clearData = () => {
    setMembername("")
    setMemberdescription("")
    setMemberrole("")
    setlinkedin("")
    setinstagra("")
    setIcon({ bytes: '', filename: 'add-group.png' })
  }
  const validateData = () => {
    var error = false
    if (membername.length == 0) {
      handleError('membername', "membername shoud not be blank")
      error = true
    }
    if (memberrole.length == 0) {
      handleError('memberrole', "MemberRole shoud not be blank")
      error = true
    }
    if (memberdescription.length == 0) {
      handleError('memberdescription', "memberdescription shoud not be blank")
      error = true
    }
    if (icon.bytes.length == 0) {
      handleError("filename", "Please choose icon for category....");
      error = true;
    }

    return error
  }
  const handleclick = async () => {


    var error = validateData()

    if (!error) {
      var formData = new FormData()
      formData.append('membername', membername)
      formData.append('memberrole', memberrole)
      formData.append('memberdescription', memberdescription)
      formData.append('icon', icon.bytes)
      formData.append('instagram',instagram)
      formData.append('linkedin',linkedin)
      var response = await postData('team/submit_team', formData)
      if (response.status) {
        Swal.fire({
          icon: "success",
          toast: true,
          text: response.message,

        });
      }
      else {
        Swal.fire({
          icon: "error",
          toast: true,
          text: response.message,

        });

      }
    }
    clearData()
  }

  const handleIconChange = (e) => {
    setIcon({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) })
    handleError("filename", "");
  }


  return (
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
            value={membername}
            helperText={error.membername}
            error={error.membername}
            onFocus={() => handleError('membername', '')}
            onChange={(e) => setMembername(e.target.value)}
            label="Member Name"
            fullWidth
          />

          <Grid size={12}>
            <TextField value={memberrole} helperText={error.memberrole} error={error.memberrole} onFocus={() => handleError('memberrole', "")} onChange={(e) => setMemberrole(e.target.value)} label="Member Role" fullWidth />

          </Grid>
          <Grid size={12}>
            <TextField value={memberdescription} helperText={error.memberdescription} error={error.memberdescription} onFocus={() => ('memberdescription', "")} onChange={(e) => setMemberdescription(e.target.value)} label="Member Description" fullWidth />

          </Grid>
           <Grid size={12}>
            <TextField value={linkedin}  onFocus={() => ('linkedin', "")} onChange={(e) => setlinkedin(e.target.value)} label="linkiedin url" fullWidth />

          </Grid>
           <Grid size={12}>
            <TextField value={instagram} onFocus={() => ('instagram', "")} onChange={(e) => setinstagra(e.target.value)} label="instagram url" fullWidth />

          </Grid>
          <Grid size={12} style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', flexDirection: "column", }}>

            <img src={icon.filename} style={{ width: '10%', alignSelf: 'center' }} />
            <div className={classes.helperTextStyle}>{error.filename}</div>
          </Grid>
          <Grid size={12}>
            <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
              <input type="file" onChange={handleIconChange} multiple hidden accept="images/*" />
              Upload
            </Button>
          </Grid>
          <Grid size={6}>

            <Button fullWidth onClick={handleclick} variant="contained">Save  </Button>
          </Grid>
          <Grid size={6}>
            <Button fullWidth onClick={clearData} variant="contained" >Reset</Button>



          </Grid>

        </Grid>

      </div>

    </div>
  )
}
