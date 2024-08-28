import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";

const EditingFields = ({
  editingField,
  handleEditingFieldChange,
  saveEditingField,
  cancelEditingField,
}) => {
  const renderField = () => {
    switch (editingField.type) {
      case "Star Rating":
        return (
          <Box>
            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={(value) => handleEditingFieldChange(value)}
            />
          </Box>
        );
      case "Smile Rating":
        return (
          <Box>
            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={(value) => handleEditingFieldChange(value)}
            />
          </Box>
        );
      case "Text Area":
        return (
          <Box>
            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={(value) => handleEditingFieldChange(value)}
            />
          </Box>
        );
      case "Numerical Rating":
        return (
          <Box>
            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={(value) => handleEditingFieldChange(value)}
            />
          </Box>
        );
      case "Single Line Input":
        return (
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={handleEditingFieldChange}
            />
          </Box>
        );

      case "Radio Buttons":
        return (
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Label"
              name="label"
              value={editingField.label}
              onChange={handleEditingFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Option 1"
              name="option1"
              value={editingField.options.option1}
              onChange={(e) =>
                handleEditingFieldChange({
                  target: {
                    name: "options",
                    value: { ...editingField.options, option1: e.target.value },
                  },
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Option 2"
              name="option2"
              value={editingField.options.option2}
              onChange={(e) =>
                handleEditingFieldChange({
                  target: {
                    name: "options",
                    value: { ...editingField.options, option2: e.target.value },
                  },
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Option 3"
              name="option3"
              value={editingField.options.option3}
              onChange={(e) =>
                handleEditingFieldChange({
                  target: {
                    name: "options",
                    value: { ...editingField.options, option3: e.target.value },
                  },
                })
              }
            />
          </Box>
        );

        case "Categories":
            return (
              <Box>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Label"
                  name="label"
                  value={editingField.label}
                  onChange={handleEditingFieldChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Category Option 1"
                  name="option1"
                  value={editingField.categoryOptions.option1}
                  onChange={(e) =>
                    handleEditingFieldChange({
                      target: {
                        name: "categoryOptions",
                        value: { ...editingField.categoryOptions, option1: e.target.value },
                      },
                    })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Category Option 2"
                  name="option2"
                  value={editingField.categoryOptions.option2}
                  onChange={(e) =>
                    handleEditingFieldChange({
                      target: {
                        name: "categoryOptions",
                        value: { ...editingField.categoryOptions, option2: e.target.value },
                      },
                    })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Category Option 3"
                  name="option3"
                  value={editingField.categoryOptions.option3}
                  onChange={(e) =>
                    handleEditingFieldChange({
                      target: {
                        name: "categoryOptions",
                        value: { ...editingField.categoryOptions, option3: e.target.value },
                      },
                    })
                  }
                />
              </Box>
            );
          
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{editingField.type}</Typography>
      {renderField()}
      <FormControlLabel
        control={
          <Switch
            checked={editingField.required}
            onChange={handleEditingFieldChange}
            name="required"
          />
        }
        label="Required"
      />
      {editingField.required && (
        <TextField
          fullWidth
          margin="normal"
          label="Error Message"
          name="errorMessage"
          value={editingField.errorMessage}
          onChange={handleEditingFieldChange}
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={saveEditingField}>
          Save
        </Button>
        <Button sx={{ ml: 1 }} onClick={cancelEditingField}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditingFields;
