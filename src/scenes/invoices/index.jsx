import {Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect,useState } from "react";
import { Box, Grid } from "@mui/material"; // Import Grid component
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../global/Sidebar";
import LevelServiceSidebar from "../global/TopLevel_sidebar";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "id" },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "studentName",
      headerName: "studentName",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Send To which level",
      flex: 1,
      renderCell: ({ row }) => {
        const { id } = row;
        return (
          <>
            <button onClick={() => sendLevel1(id)}>Level1</button>
            <button>Level2</button>
            <button>Level3</button>
          </>
        );
      },
    },
  ];
  const [allTick, setAllTick]=useState([]);
  const [serv1, setServ1]=useState([]);
  useEffect(() => {
      const fetchStudents = async () => {
          try {
              const response = await fetch("http://localhost:8080/mainService/fetchTickets");
             
              if (!response.ok) {
                  throw new Error('Failed to fetch students');
              }

              const data = await response.json();
              setAllTick(data);
          } catch (error) {
              console.error("Error fetching students", error);
          }
      };
  

      fetchStudents();
  }, );
  const mockDataAllTick = allTick.map(items => ({
    
    id: items.ticketId, // Assuming each student object has an id property
    topic:items.topic,
    priority:items.priority,
    studentName:items.stdName,
    createdAt:items.createdAt
    


  }));




  const sendLevel1 = async (id) => {
    const servId = '66096ce64e39ae5ac533bd18'; // Replace this with your actual servId
    const url = `http://localhost:8080/mainService/sentTickTo/${servId}/${id}`;
    
    const level1Fetch = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST' // Specify the method as POST
        });
        
        if (!response.ok) {
          throw new Error('Failed to send ticket to level 1');
        }
    
        const data = await response.json();
        setServ1(data);
      } catch (error) {
        console.error("Error sending ticket to level 1", error);
      }
    };
    
    await level1Fetch();
  };
  
  
  
  return (
    <Grid container>
      <Grid item xs={2}>
      <LevelServiceSidebar/>
      </Grid>
      <Grid item xs={10}>
    <Box m="20px">
      <Header title="Tickets" subtitle="List of all Tickets form each student" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataAllTick} columns={columns} />
      </Box>
    </Box>
    </Grid>
    </Grid>
  
  );
};

export default Invoices;
