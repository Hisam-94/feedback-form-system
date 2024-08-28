import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  FormControlLabel,
  FormControl,
  RadioGroup,
  MenuItem,
  Radio,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import EditingFields from "./FieldTypes/EditingFields";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const fieldTypes = [
  "Star Rating",
  "Smile Rating",
  "Text Area",
  "Radio Buttons",
  "Categories",
  "Numerical Rating",
  "Single Line Input",
];

const FormEditor = () => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editingFieldIndex, setEditingFieldIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/forms/${id}`);
      setTitle(response.data.title);
      setFields(response.data.fields);
    } catch (error) {
      console.error("Error fetching form:", error);
    }
  };

  const BoxRadio = styled(Radio)(({ theme }) => ({
    "&.MuiRadio-root": {
      display: "none", // Hide the default radio button
    },
  }));

  const BoxLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    "& .MuiFormControlLabel-label": {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1, 2),
      width: "100%",
      transition: theme.transitions.create([
        "background-color",
        "border-color",
      ]),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    "&.Mui-checked .MuiFormControlLabel-label": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.action.selected,
    },
  }));

  const startEditingField = (type) => {
    let initialFieldState = {
      type,
      label: "",
      required: false,
      errorMessage: "",
    };

    // Handling specific field types with initial values
    switch (type) {
      case "Star Rating":
        initialFieldState = {
          ...initialFieldState,
          rating: 0, // Initial rating value for star rating
        };
        break;

      case "Numerical Rating":
        initialFieldState = {
          ...initialFieldState,
          rating: null, // Initial rating value for numerical rating (no selection)
        };
        break;

      case "Text Area":
        initialFieldState = {
          ...initialFieldState,
          content: "", // Initial content value for text area
        };
        break;

      case "Single Line Input":
        initialFieldState = {
          ...initialFieldState,
          value: "", // Initial value for single line input
        };
        break;

      case "Radio Buttons":
        initialFieldState = {
          ...initialFieldState,
          options: "", // Initial value for single line input
        };
        break;

      case "Categories":
        initialFieldState = {
          ...initialFieldState,
          categoryOptions: "", // Initial value for single line input
        };
        break;

      // Add more cases if you have additional field types
      default:
        break;
    }

    setEditingField(initialFieldState);
  };

  const handleEditingFieldChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log("name", name);
    console.log("type", type);
    console.log("value", value);
    setEditingField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSmileRatingChange = (selectedSmile, index) => {
    setFields((prevFields) =>
      prevFields.map((f, idx) =>
        idx === index ? { ...f, smileRating: selectedSmile } : f
      )
    );
  };

  const handleStarRatingChange = (selectedStar, index) => {
    setFields((prevFields) =>
      prevFields.map((f, idx) =>
        idx === index ? { ...f, rating: selectedStar } : f
      )
    );
  };

  const handleNumericRatingChange = (selectedRating, index) => {
    setFields((prevFields) =>
      prevFields.map((f, idx) =>
        idx === index ? { ...f, rating: selectedRating } : f
      )
    );
  };

  const handleFieldChange = (value, index, fieldName) => {
    setFields((prevFields) =>
      prevFields.map((f, idx) =>
        idx === index ? { ...f, [fieldName]: value } : f
      )
    );
  };

  const handleRadioButtonChange = (selectedOption, index) => {
    setSelectedIndex(index);
    console.log("selectedOption", selectedOption);
    console.log("index", index);
    setFields((prevFields) =>
      prevFields.map((f, idx) => (idx === index ? { ...f, selectedOption } : f))
    );
  };

  const handleCategoryChange = (selectedCategory, index) => {
    setFields((prevFields) =>
      prevFields.map((f, idx) =>
        idx === index ? { ...f, selectedCategory } : f
      )
    );
  };

  const saveEditingField = () => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      if (editingFieldIndex !== null) {
        newFields[editingFieldIndex] = editingField;
      } else {
        newFields.push(editingField);
      }
      return newFields;
    });
    setEditingField(null);
    setEditingFieldIndex(null);
  };

  const cancelEditingField = () => {
    setEditingField(null);
    setEditingFieldIndex(null);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items);
  };

  const handleSubmit = async (e) => {
    console.log("submitted");
    // e.preventDefault();
    console.log("title", title);
    console.log("fields", fields);
    try {
      await axios.put(`http://localhost:8000/api/forms/${id}`, {
        title,
        fields,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }} border={1}>
        <Box
          px={2}
          mb={4}
          border={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Box>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => handleSubmit()}
              type="submit"
              variant="contained"
              color="success">
              Publish
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} m={"auto"}>
            <Paper sx={{ p: 2, minHeight: 400 }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      {fields.length === 0 && (
                        <Typography align="center" color="textSecondary">
                          Add Fields
                        </Typography>
                      )}

                      {fields.map((field, index) => (
                        <Draggable
                          key={index}
                          draggableId={`field-${index}`}
                          index={index}>
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ p: 2, mb: 2 }}>
                              {/* <Typography variant="subtitle1">
                                  {field.type}
                                </Typography> */}
                              <Typography color="textSecondary">
                                {field.label}
                              </Typography>

                              {/* Star Rating Field */}
                              {field.type === "Star Rating" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "4rem",
                                    mt: 1,
                                  }}>
                                  {[...Array(5)].map((_, starIndex) => (
                                    <StarIcon
                                      key={starIndex}
                                      color={
                                        starIndex < field.rating
                                          ? "primary"
                                          : "action"
                                      } // Conditionally change color based on rating
                                      onClick={() =>
                                        handleStarRatingChange(
                                          starIndex + 1,
                                          index
                                        )
                                      } // Update star rating on click
                                      style={{ cursor: "pointer" }}
                                    />
                                  ))}
                                </Box>
                              )}

                              {/* Smile Rating Field */}
                              {field.type === "Smile Rating" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 1,
                                  }}>
                                  {[...Array(5)].map((_, smileIndex) => {
                                    const emoji =
                                      smileIndex === 0
                                        ? "😢"
                                        : smileIndex === 1
                                        ? "😟"
                                        : smileIndex === 2
                                        ? "😐"
                                        : smileIndex === 3
                                        ? "🙂"
                                        : "😊";
                                    return (
                                      <span
                                        key={smileIndex}
                                        role="img"
                                        aria-label={`smile-${smileIndex}`}
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "2em",
                                          margin: "0 15px",
                                          opacity:
                                            field.smileRating === smileIndex + 1
                                              ? 0.3
                                              : 1, // Conditionally apply opacity for selected
                                        }}
                                        onClick={() =>
                                          handleSmileRatingChange(
                                            smileIndex + 1,
                                            index
                                          )
                                        } // Update smile rating on click
                                      >
                                        {emoji}
                                      </span>
                                    );
                                  })}
                                </Box>
                              )}

                              {/* Radio Button Field */}
                              {field.type === "Radio Buttons" && (
                                <FormControl
                                  component="fieldset"
                                  sx={{ mt: 1 }}>
                                  <RadioGroup name="radio-buttons-group">
                                    {Object.keys(field.options).map(
                                      (key, index) => (
                                        <FormControlLabel
                                          key={key}
                                          value={field.options[key]}
                                          control={<Radio />}
                                          label={field.options[key]}
                                          onChange={(event) =>
                                            handleRadioButtonChange(
                                              event.target.value,
                                              index
                                            )
                                          }
                                          checked={selectedIndex === index}
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              )}

                              {/* Categories Field */}
                              {field.type === "Categories" && (
                                <FormControl
                                  component="fieldset"
                                  sx={{ mt: 1, width: "100%" }}>
                                  <RadioGroup
                                    name={`categories-${index}`}
                                    value={field.selectedCategory || ""} // Apply the selected category from state
                                    onChange={(e) =>
                                      handleCategoryChange(
                                        e.target.value,
                                        index
                                      )
                                    } // Capture selected category
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      justifyContent: "space-around",
                                    }}>
                                    {field.categoryOptions.map(
                                      (category, categoryIndex) => (
                                        <BoxLabel
                                          key={categoryIndex}
                                          value={category}
                                          control={<BoxRadio />}
                                          label={category}
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              )}
                              {/* Text Area Field */}
                              {/* {field.type === "Text Area" && (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={4}
                                  variant="outlined"
                                  value={field.content || ""}
                                  placeholder={field.label}
                                  disabled
                                  sx={{ mt: 1 }}
                                />
                              )} */}

                              {field.type === "Text Area" && (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={4}
                                  variant="outlined"
                                  value={field.content || ""}
                                  placeholder={field.label}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e.target.value,
                                      index,
                                      "content"
                                    )
                                  } // Capture text area content
                                  sx={{ mt: 1 }}
                                />
                              )}

                              {/* Numerical Rating Field */}
                              {field.type === "Numerical Rating" && (
                                <Box sx={{ display: "flex", mt: 1 }}>
                                  {[...Array(10)].map((_, numIndex) => (
                                    <Box
                                      key={numIndex}
                                      sx={{
                                        padding: "8px 16px",
                                        margin: "0 4px",
                                        border: "1px solid",
                                        borderColor:
                                          field.rating === numIndex + 1
                                            ? "#007bff"
                                            : "#ccc", // Conditionally apply border color for selected
                                        borderRadius: "4px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor:
                                          field.rating === numIndex + 1
                                            ? "#007bff"
                                            : "#fff", // Conditionally apply background color for selected
                                        color:
                                          field.rating === numIndex + 1
                                            ? "#fff"
                                            : "#000", // Conditionally apply text color for selected
                                        "&:hover": {
                                          backgroundColor:
                                            field.rating === numIndex + 1
                                              ? "#007bff"
                                              : "#f0f0f0",
                                        },
                                      }}
                                      onClick={() =>
                                        handleNumericRatingChange(
                                          numIndex + 1,
                                          index
                                        )
                                      } // Update numerical rating on click
                                    >
                                      {numIndex + 1}
                                    </Box>
                                  ))}
                                </Box>
                              )}

                              {/* Single Line Input Field */}
                              {/* {field.type === "Single Line Input" && (
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  value={field.value || ""}
                                  placeholder={field.label}
                                  disabled
                                  sx={{ mt: 1 }}
                                />
                              )} */}
                              {field.type === "Single Line Input" && (
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  value={field.value || ""}
                                  placeholder={field.label}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      e.target.value,
                                      index,
                                      "value"
                                    )
                                  } // Capture input value
                                  sx={{ mt: 1 }}
                                />
                              )}

                              {/* Action Buttons */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  mt: 2,
                                }}>
                                <IconButton
                                  size="small"
                                  onClick={() => removeField(index)}>
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => startEditingField(index)}>
                                  <EditIcon />
                                </IconButton>
                              </Box>
                            </Paper>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Add Fields
              </Typography>
              <List>
                {!editingField &&
                  fieldTypes.map((type) => (
                    <ListItem key={type} disablePadding>
                      <ListItemText primary={type} />
                      <IconButton
                        onClick={() => startEditingField(type)}
                        color="primary">
                        +
                      </IconButton>
                    </ListItem>
                  ))}
              </List>
              {editingField && (
                //   <Box sx={{ mt: 2 }}>
                //     <Typography variant="h6">{editingField.type}</Typography>
                //     <TextField
                //       fullWidth
                //       margin="normal"
                //       label="Label"
                //       name="label"
                //       value={editingField.label}
                //       onChange={handleEditingFieldChange}
                //     />
                //     <FormControlLabel
                //       control={
                //         <Switch
                //           checked={editingField.required}
                //           onChange={handleEditingFieldChange}
                //           name="required"
                //         />
                //       }
                //       label="Required"
                //     />
                //     {editingField.required && (
                //       <TextField
                //         fullWidth
                //         margin="normal"
                //         label="Error Message"
                //         name="errorMessage"
                //         value={editingField.errorMessage}
                //         onChange={handleEditingFieldChange}
                //       />
                //     )}
                //     <Box sx={{ mt: 2 }}>
                //       <Button
                //         variant="contained"
                //         color="primary"
                //         onClick={saveEditingField}>
                //         Save
                //       </Button>
                //       <Button sx={{ ml: 1 }} onClick={cancelEditingField}>
                //         Cancel
                //       </Button>
                //     </Box>
                //   </Box>
                <EditingFields
                  editingField={editingField}
                  handleEditingFieldChange={handleEditingFieldChange}
                  saveEditingField={saveEditingField}
                  cancelEditingField={cancelEditingField}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FormEditor;
