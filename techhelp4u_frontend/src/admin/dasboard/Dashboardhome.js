import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { serverURL } from "../../services/Fetchnodeservices";

export default function DashboardHome() {
  // Sample state (API se fetch kar sakte ho)
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Sample data for demo
    setEvents([{ id: 1, name: "Event 1" }, { id: 2, name: "Event 2" }]);
    setTeams([{ id: 1, name: "Team 1" }, { id: 2, name: "Team 2" }]);
    setSpeakers([{ id: 1, name: "Speaker 1" }]);
    setContacts([{ id: 1, name: "Contact 1" }, { id: 2, name: "Contact 2" }]);
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Events</Typography>
            <Typography variant="h4" color="primary">
              {events.length}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              View Events
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Teams</Typography>
            <Typography variant="h4" color="secondary">
              {teams.length}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              View Teams
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Speakers</Typography>
            <Typography variant="h4" color="success.main">
              {speakers.length}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              View Speakers
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Contacts</Typography>
            <Typography variant="h4" color="error.main">
              {contacts.length}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              View Contacts
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Items Section */}
      <Typography variant="h5" gutterBottom>
        Recent Activities
      </Typography>
      <Grid container spacing={2}>
        {/* Events */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Events</Typography>
            {events.map((event) => (
              <Box
                key={event.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingY: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{event.name}</span>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Teams */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Teams</Typography>
            {teams.map((team) => (
              <Box
                key={team.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingY: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{team.name}</span>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
