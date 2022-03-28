import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../../features/recipe';

const Filter = () => {
  const [open, setOpen] = useState(false);
  const [cuisine, changeCuisine] = useState("");
  const [mealType, changeMealType] = useState("");
  const dispatch = useDispatch();
  const ingdts = useSelector((state) => state.recipe.ingdts);

  const handleCuisineChange = (event) => {
    changeCuisine(event.target.value);
  };

  const handleTypeChange = (event) => {
    changeMealType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleOk = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
    if (ingdts.length > 0) {
        let request = ingdts[0];
        for(let i = 1; i < ingdts.length; i++) {
            request += "%20" + ingdts[i];
        }
        dispatch(applyFilter(cuisine, mealType, request));
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Filters</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Cuisine</InputLabel>
              <Select
                labelId="demo-dialog-label"
                id="demo-dialog"
                value={cuisine}
                onChange={handleCuisineChange}
                input={<OutlinedInput label="Cuisine" id="demo-dialog-native" />}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Asian">Asian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Meal Type</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={mealType}
                onChange={handleTypeChange}
                input={<OutlinedInput label="Meal Type" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Filter;
