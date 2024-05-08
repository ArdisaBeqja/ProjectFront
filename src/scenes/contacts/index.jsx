import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams hook
import { useState, useEffect } from "react";

import "../../Styles/popUpfrom.css";

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
    topic: "",
    priority: "",
  });

  const handleSubmit = async (e) => {
    
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/tickets/${stdId}/createTicket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: stdId,
            ...formData,
          }),
        }
      );
      const responseData = await response.json(); // Parse response body as JSON
      console.log("Response from server:", responseData);
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted successfully!");
      setShowForm(false); // Close the form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Close the form if cancel button is clicked
  };

  const formStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:"#cfd7ec",// Using camelCase notation
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    borderRadius: "20px",
    border: "none",
    color: "white",
    cursor: "pointer",
    width: "50vh",
    height: "50vh",
  };

  const { stdId } = useParams(); // Extract managerId from route params

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "topic",
      headerName: "Topic",
      type: "number",
      headerAlign: "left",
      align: "left",
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
              <button
                id="addbtn"
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  border: "none",
                  color: "white",
                }}
                onClick={() => setShowForm(true)}
              >
                Add new
              </button>
            </Typography>
          </Box>
        );
      },
    },
  ];

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/students/${stdId}/ticketsOfStd`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();

        const ticketList = data.ticketlist || []; // Extract ticket list from response data

        setTickets(ticketList);

        console.log("provaaaaa" + tickets);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, [stdId]);

  const mockTicket = tickets.map((ticket, index) => ({
    id: index + 1, // Generate unique ID
    status: ticket.status,
    ticketId: ticket.ticketId,
    topic: ticket.topic,
    priority: ticket.priority,
    createdAt: ticket.createdAt,
  }));

  return (
    <>
 
      {showForm && (
        <div style={formStyle}>
          <form id="formpopup" onSubmit={handleSubmit}>
            <div>
              <label>Status:</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>
            <div>
              <label>Topic:</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
            </div>
            <div>
              <label>Priority:</label>
              <input
                type="text"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              />
            </div>
            <div>
              <button type="button" onClick={handleCancel} className="buttonss">
                Cancel
              </button>
              <button type="submit"  className="buttonss1">Submit</button>
            </div>
          </form>
        </div>
      )}
      <Box m="20px">
        <Header
          title="Supporting Tickets"
          subtitle="List of all Supporing Tickets"
        />
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={mockTicket}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
      </>
    
  );
};

export default Contacts;
