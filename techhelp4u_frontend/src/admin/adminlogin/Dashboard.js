import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Grid } from '@mui/material'
import Event from '../event/Events';
import Team from '../team/Team';
import MenuIcon from '@mui/icons-material/Menu';
import Contactus from '../contactus/Contactus';
import Displayallcontact from '../contactus/Displayallcontact';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Displayallteam from '../team/DisplayallTeam';
import Displayallevent from '../event/Displayallevent';
import { Paper } from '@mui/material';
import { serverURL } from '../../services/Fetchnodeservices';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Displayallsponsers from '../sponser/Displayallspnsers';
import Speaker from '../Speaker/Speaker';
import DisplayallSpeaker from '../Speaker/Displayallspeaker';
import DashboardHome from '../dasboard/Dashboardhome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import GroupIcon from '@mui/icons-material/Group';
import ContactPageSharpIcon from '@mui/icons-material/ContactPageSharp';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';




export default function AdminDashboard() {
  var navigate = useNavigate()
  const handleLogout = () => {
    // Remove admin info from localStorage
    localStorage.removeItem("ADMIN");

    // Redirect to login
    navigate("/adminlogin", { replace: true });
  };
  return (
    <div>
      <AppBar position="static" color="default" elevation={3}>
  <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
    {/* Logo aur Title */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/techhelp4u.jpg" alt="logo" style={{ width: 90, height: 90, borderRadius: 40 }} />
      <div style={{ marginLeft: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 34, color: '#1976d2' }}>
          TECH
        </span>
        <span style={{ fontWeight: 700, fontSize: 34, color: '#000' }}>
          help4U
        </span>
      </div>
    </div>

    {/* Logout Button */}
    <Button onClick={handleLogout}  >
      Logout
    </Button>

  </Toolbar>
</AppBar>


      <Grid container>
    <Grid item xs={10}> 
  {/* Left Sidebar */}
  <Grid item style={{ width: 250 }}>
    <Paper
      elevation={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: 10,
        marginTop:2,
        backgroundColor: '#f5f5f5', // sidebar background
        boxSizing: 'border-box',
        
      }}
    >
      {/* Logo */}
      <img src="/techhelp4u.jpg" alt="logo" style={{ width: 90, height: 90, borderRadius: 40 }} />
      <div style={{ marginLeft: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 24, color: '#1976d2' }}>
          TECH
        </span>
        <span style={{ fontWeight: 700, fontSize: 24, color: '#000' }}>
          help4U
        </span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 'bold', color: 'grey', marginBottom: 10 }}>
        techhelp4u.cc@gmail.com
      </div>

      <Divider style={{ width: '90%', marginBottom: 20 }} />

      {/* Navigation List */}
      <List style={{ width: '100%' }}>
        <ListItem>
          <ListItemButton onClick={() => navigate('/Dashboard/Dashboardhome')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <DashboardIcon  style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Dashboard</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/Dashboard/Displayallevent')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EventSeatIcon  style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Events</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/dashboard/displayallteam')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GroupIcon  style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Team</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/dashboard/displayallcontact')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ContactPageSharpIcon style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Contactus</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/dashboard/displayallcontact')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AutoStoriesOutlinedIcon style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Pages</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/dashboard/displayallspnsers')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SensorOccupiedOutlinedIcon style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Sponsers</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => navigate('/dashboard/displayallspeaker')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SpeakerOutlinedIcon style={{ width: 30, height: 30 }} />
              <span style={{ fontWeight: 600, marginLeft: 15 }}>Speaker</span>
            </div>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={handleLogout}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutOutlinedIcon style={{ width: 30, height: 30 }} alt="logout" />
              <span style={{ marginLeft: 15, fontWeight: 600 }}>Logout</span>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  </Grid>

  {/* Right Content */}
  
</Grid>

        <Grid item xs={10} >

          <Routes>
            <Route element={<Event />} path="/event"></Route>

            <Route element={<Displayallevent />} path="/Displayallevent"></Route>

            <Route element={<Team />} path="/team"></Route>
            <Route element={<Displayallteam />} path="/displayallteam"></Route>
            <Route element={<Displayallcontact />} path="/displayallcontact"></Route>
            <Route element={<Displayallsponsers />} path="/displayallspnsers"></Route>
            <Route element={<Speaker />} path="/speaker"></Route>
            <Route element={<DashboardHome />} path="/Dashboardhome" />

            <Route element={<DisplayallSpeaker />} path="/Displayallspeaker"></Route>


          </Routes>
        </Grid>

      </Grid>

    </div>
  )
}
/*
    import React from "react";
import { Typography } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeAdminServices";

export default function ProductShowcase({ sections }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        gap: "20px",
        flexWrap: "wrap",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            minWidth: "300px",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
         
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "16px",
              textAlign: "center",
              borderBottom: "2px solid #eee",
              paddingBottom: "6px",
              color: "#2d3436",
            }}
          >
            {section.title}
          </h2>

        
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {section.products.slice(0, 4).map((product, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  height: "110px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={`${serverURL}/images/${product.picture}`}
                    alt={product.productname}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: 640,
                      margin: 0,
                      fontFamily: "'Roboto', sans-serif",
                      color: "#2d3436",
                      textAlign: "center",
                      lineHeight: "18px",
                    }}
                  >
                    {product.productname}
                  </p>

                
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "16px",
                      margin: 0,
                      color: "#2d3436",
                    }}
                  >
                    {product.productdetailname}
                  </p>

                
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontFamily: "'Oswald', sans-serif",
                      color: "blue",
                      fontSize: "16px",
                    }}
                  >
                    <span>$</span>
                    {product.offerprice}
                    <del
                      style={{
                        color: "#888",
                        marginLeft: "5px",
                        fontSize: "14px",
                        fontWeight: "normal",
                      }}
                    >
                      <s>
                        <span>$</span>
                        {product.price}
                      </s>
                    </del>
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
/*


*////