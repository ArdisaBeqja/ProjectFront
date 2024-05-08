import { Typography, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import { tokens } from "../../theme";
import { Box, Grid } from "@mui/material"; // Import Grid component
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useParams } from "react-router-dom"; // Import useParams hook
import Sidebar from "../global/Sidebar";
const Team = () => {
  const { id } = useParams(); // Extract managerId from route params

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "surname",
      headerName: "Surname",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "room",
      headerName: "Room",
      flex: 1,
    },
    {
      field: "contract",
      headerName: "Contract",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          
          <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Edit
          </Typography>
        </Box>
        );
      },
    },
  ];
 
  const [students, setStudents]=useState([]);
 
  useEffect(() => {
      const fetchStudents = async () => {
          try {
              const response = await fetch(`http://localhost:8080/api/manager/${id}/getAllStd`);
             
              if (!response.ok) {
                  throw new Error('Failed to fetch students');
              }

              const data = await response.json();
              setStudents(data);
          } catch (error) {
              console.error("Error fetching students", error);
          }
      };
  

      fetchStudents();
  }, [id]);
  const mockDataTeam = students.map(student => ({
    id: student.id, // Assuming each student object has an id property
    name: student.name,
    surname:student.surname,
    phone:student.phone,
    email: student.surname,
    room:student.room.details,
    contract:student.contract.terms

  }));
  
  return (
    
    <Grid container>
      <Grid item xs={3}>
      <Sidebar/></Grid>
      <Grid item xs={9}>
        <Box 
        m="5px" ml="-150px" mt="5px" px="100px"
        >
      <Header title="Student" subtitle="Managing the Students" />
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
       </Box>
     </Grid>
    
    </Grid >
   
     
  );
};

export default Team;
