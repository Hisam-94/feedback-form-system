import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState("");
  //   const history = useHistory();
  const navigate = useNavigate();

  // const form = [
  //   {
  //     _id: "1",
  //     title: "Customer Feedback Survey",
  //     fields: [
  //       { type: "text", label: "Name" },
  //       { type: "radio", label: "How satisfied are you?", options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] },
  //       { type: "textarea", label: "Please provide any additional feedback" },
  //     ],
  //     submitted: 125,
  //     views: 387,
  //     publishedDate: "2024-08-15",
  //   },
  //   {
  //     _id: "2",
  //     title: "Employee Onboarding Survey",
  //     fields: [
  //       { type: "select", label: "Department", options: ["Engineering", "Marketing", "Sales", "Customer Support"] },
  //       { type: "rating", label: "Rate your training experience", max: 5 },
  //       { type: "checkbox", label: "Do you feel prepared for your role?", options: ["Yes", "No"] },
  //     ],
  //     submitted: 42,
  //     views: 78,
  //     publishedDate: "2024-08-20",
  //   },
  //   {
  //     _id: "3",
  //     title: "Product Feature Request",
  //     fields: [
  //       { type: "text", label: "Feature Name" },
  //       { type: "textarea", label: "Describe the feature in detail" },
  //       { type: "rating", label: "How important is this feature for you?", max: 10 },
  //     ],
  //     submitted: 156,
  //     views: 213,
  //     publishedDate: "2024-08-25",
  //   },
  //   {
  //     _id: "4",
  //     title: "Event Registration Form",
  //     fields: [
  //       { type: "text", label: "Full Name" },
  //       { type: "email", label: "Email Address" },
  //       { type: "select", label: "Dietary Restrictions", options: ["None", "Vegetarian", "Vegan", "Gluten-free"] },
  //     ],
  //     submitted: 87,
  //     views: 129,
  //     publishedDate: "2024-08-22",
  //   },
  //   {
  //     _id: "5",
  //     title: "Bug Report",
  //     fields: [
  //       { type: "text", label: "Steps to reproduce the bug" },
  //       { type: "textarea", label: "Describe the bug in detail" },
  //       { type: "file", label: "Attach screenshot (optional)" },
  //     ],
  //     submitted: 65,
  //     views: 98,
  //     publishedDate: "2024-08-18",
  //   },
  //   {
  //     _id: "6",
  //     title: "Website Feedback Form",
  //     fields: [
  //       { type: "text", label: "URL of the page with the issue" },
  //       { type: "select", label: "What kind of issue did you encounter?", options: ["Navigation issue", "Broken link", "Formatting problem", "Other"] },
  //       { type: "textarea", label: "Describe the issue in detail" },
  //     ],
  //     submitted: 102,
  //     views: 145,
  //     publishedDate: "2024-08-21",
  //   },
  //   {
  //     _id: "7",
  //     title: "Leave Request Form",
  //     fields: [
  //       { type: "date", label: "Start Date" },
  //       { type: "date", label: "End Date" },
  //       { type: "select", label: "Reason for leave", options: ["Vacation", "Sick leave", "Personal leave"] },
  //     ],
  //     submitted: 32,
  //     views: 48,
  //     publishedDate: "2024-08-17",
  //   },
  //   {
  //     _id: "8",
  //     title: "Course Evaluation",
  //     fields: [
  //       { type: "rating", label: "Rate the overall quality of the course", max: 5 },
  //       { type: "rating", label: "Rate the clarity of the instructor's explanations", max: 5 },
  //       { type: "textarea", label: "What did you find most helpful about this course?" },
  //     ],
  //     submitted: 58,
  //     views: 85,
  //     publishedDate: "2024-08-24",
  //   },
  //   {
  //     _id: "9",
  //     title: "Job Application Form",
  //     fields: [
  //       { type: "text", label: "Full Name" },
  //       { type: "email", label: "Email Address" },
  //       { type: "file", label: "Upload your resume (PDF)" },
  //     ],
  //     submitted: 97,
  //     views: 136,
  //     publishedDate: "2024-08-19",
  //   },
  //   {
  //     _id: "10",
  //     title: "Support Ticket",
  //     fields: [
  //       { type: "select", label: "Category", options: ["Technical Issue", "Billing Question", "Account Issue"] },
  //       { type: "textarea", label: "Describe your issue in detail" },
  //       { type: "file", label: "Attach screenshot (optional)" },
  //     ],
  //     submitted: 83,
  //     views: 112,
  //     publishedDate: "2024-08-23",
  //   },
  // ];

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/forms");
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const deleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/forms/${id}`);
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewFormTitle("");
  };

  const createNewForm = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/forms", {
        title: newFormTitle,
        fields: [],
      });
      handleClose();
      fetchForms();
    } catch (error) {
      console.error("Error creating new form:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={handleOpen}>
            <CardContent>
              <IconButton size="large" color="primary">
                <AddIcon />
              </IconButton>
              <Typography variant="h6">New Form</Typography>
            </CardContent>
          </Card>
        </Grid>
        {forms.map((form) => (
          <Grid item xs={12} sm={6} md={4} key={form._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{form.title}</Typography>
                <Typography color="textSecondary">
                  Submitted: {form.submissions}
                </Typography>
                <Typography color="textSecondary">
                  Views: {form.views}
                </Typography>
                <Typography color="textSecondary">
                  Date created: {new Date(form.createdAt).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary">
                  Fields: {form.fields.length}
                </Typography>
                <Button
                  onClick={() => navigate(`/edit/${form._id}`)}
                  startIcon={<EditIcon />}>
                  Edit
                </Button>
                <IconButton onClick={() => deleteForm(form._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Feedback Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Form Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFormTitle}
            onChange={(e) => setNewFormTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createNewForm}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;

// {
//   form.map((form) => (
//     <Grid item xs={12} sm={6} md={4} key={form._id}>
//       <Card>
//         <CardContent>
//           <Typography variant="h6">{form.title}</Typography>
//           <Typography color="textSecondary">
//             Fields: {form.fields.length}
//           </Typography>
//           <Typography color="textSecondary">
//             Submitted: {form.submitted}
//           </Typography>
//           <Typography color="textSecondary">Views: {form.views}</Typography>
//           <Typography color="textSecondary">
//             Date published: {form.publishedDate}
//           </Typography>
//           <Button
//             component={Link}
//             to={`/edit/${form._id}`}
//             startIcon={<EditIcon />}>
//             Edit
//           </Button>
//           <IconButton onClick={() => deleteForm(form._id)} color="error">
//             <DeleteIcon />
//           </IconButton>
//         </CardContent>
//       </Card>
//     </Grid>
//   ));
// }
