import MaterialTable from "@material-table/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useState, useEffect } from "react";

import { useStyles } from "./TeamCss";
import { Divider, TextField } from "@mui/material";

import { Grid } from '@mui/material';
import Swal from 'sweetalert2'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";
import Titlebar from "../components/Titlebar";
import { postData, getData, serverURL } from "../../services/Fetchnodeservices";
export default function Displayallteam() {
  const classes = useStyles()
  const [Team, setTeam] = useState([])
  const [teamid, setteamId] = useState('')
  const [open, setOpen] = useState(false)
  const [instagram, setinstagra] = useState('')
  const [linkedin, setlinkedin] = useState('')
  const [membername, setMembername] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: 'add-group.png' })
  const [error, seterror] = useState({ filename: '' })
  const [memberrole, setMemberrole] = useState('')
  const [memberdescription, setMemberdescription] = useState('')
  const [buttonStatus, setbuttonStatus] = useState(false)
  const [tempPicture, setTemPicture] = useState('')




  const navigate = useNavigate();
  const cancelpicture = () => {
    setIcon({ bytes: '', filename: `${serverURL}/images/${tempPicture}` })
    setbuttonStatus(false)
  }
  const EditandCancel = () => {
    return <div>
      <Button onClick={handlepictureedit}> Edit</Button>
      <Button onClick={cancelpicture}> Cancel</Button>
    </div>
  }




  const fetchallteam = async () => {
    var response = await getData('team/display_all_team')

    if (response.status) {
      setTeam(response.data);
    } else {
      Swal.fire({
        icon: "error",
        text: response.message,
        toast: true,
      });
    }



  }
  useEffect(() => {
    fetchallteam()
  }, [])
  const openDialog = (rowData) => {
    setteamId(rowData.teamid)
    setMembername(rowData.membername)
    setMemberrole(rowData.memberrole)
    setlinkedin(rowData.linkedin)
    setinstagra(rowData.instagram)
    setMemberdescription(rowData.memberdescription)
    setIcon({ bytes: '', filename: `${serverURL}/images/${rowData.img_url}` })
    setTemPicture(rowData.img_url)
    setOpen(true)

  }
  const closeDialog = () => setOpen(false);


  /********************************** */
  const handleError = (label, message) => {
    seterror((prev) => ({ ...prev, [label]: message }))

  }
  const handlepictureedit = async () => {


    var formData = new FormData()
    formData.append('teamid', teamid)
    formData.append('icon', icon.bytes)
    var response = await postData('team/edit_team_picture', formData)
    if (response.status) {
      Swal.fire({
        icon: "success",
        toast: true,
        text: response.message,

      });

      setbuttonStatus(false)

    }
    else {
      Swal.fire({
        icon: "error",
        toast: true,
        text: response.message,

      });
      setbuttonStatus(false)

    }

    fetchallteam()

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


    return error
  }
  const handleeditteam = async () => {


    var error = validateData()

    if (error == false) {
      var body = { 'teamid': teamid, 'membername': membername, 'memberrole': memberrole, 'memberdescription': memberdescription, 'linkedin': linkedin, 'instagram': instagram }

      var response = await postData('team/edit_team', body)
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
    fetchallteam()
  }

  const handledelete = async () => {
    var body = { 'teamid': teamid }
    var response = await postData('team/delete_team', body)
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
    setOpen(false)
    fetchallteam()

  }
  const handleIconChange = (e) => {
    setbuttonStatus(true)
    setIcon({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) })
    handleError("filename", "");
  }

  const showteamform = () => (
    
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid size={12}>

              <Titlebar title="Edit Team Member" />

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
              <TextField value={linkedin} onFocus={() => ('linkedin', "")} onChange={(e) => setlinkedin(e.target.value)} label="linkiedin url" fullWidth />

            </Grid>
            <Grid size={12}>
              <TextField value={instagram} onFocus={() => ('instagram', "")} onChange={(e) => setinstagra(e.target.value)} label="instagram url" fullWidth />

            </Grid>
            <Grid size={12} style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', flexDirection: "column", }}>

              <img src={icon.filename} style={{ width: '10%', alignSelf: 'center' }} />
              <div className={classes.helperTextStyle}>{error.filename}</div>
            </Grid>
            <Grid size={12}>
              {buttonStatus ? EditandCancel() :
                <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
                  <input type="file" onChange={handleIconChange} multiple hidden accept="images/*" />
                  Upload
                </Button>}
            </Grid>
            <Grid size={6}>

              <Button onClick={handleeditteam} fullWidth variant="contained">edit  </Button>
            </Grid>
            <Grid size={6}>
              <Button fullWidth onClick={handledelete} variant="contained" >delete</Button>



            </Grid>

          </Grid>
        </div></div>)

    /*************************** */
              
  const showDialog = () => {
    return <Dialog open={open} >

      <DialogContent>
        {showteamform()}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()}>
          CLOSE
        </Button>
      </DialogActions>

    </Dialog>

  }
  const showallteam=() => (

    <MaterialTable
      title="Team list"
      columns={[
        { title: 'Id', field: 'teamid' },
        { title: 'Member name', field: 'membername' },
        { title: 'Member role', field: 'memberrole' },
        { title: 'instagram', field: 'instagram' },
        { title: 'linkedin', field: 'linkedin' },
        { title: 'Member Disription', field: 'memberdescription' },
        { title: 'icon', render: (rowData) => <img src={`${serverURL}/images/${rowData.img_url}`} width={30} /> },

      ]}
      data={Team}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Team Member',
          onClick: (event, rowData) => openDialog(rowData)
        },
        {
          icon: 'add',
          tooltip: 'Add Team Member',
          isFreeAction: true,
          onClick: (event) => navigate('/Dashboard/team')
        }
      ]}

    />
  )

  return (<div className={classes.root}>
    <div className={classes.box}>
      {showallteam()}
      {showDialog()}
    </div>

  </div>
  )

}                               