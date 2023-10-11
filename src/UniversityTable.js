import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UniversityTable(props) {
  const classes = useStyles();
//   const [selectedUniversityIds, setSelectedStudentIds] = useState([]);
  const [selectedUniversityIds, setSelectedUniversityIds] = useState(() => {
    const storedUniverIds = localStorage.getItem('selectedUniversityIds');
    return storedUniverIds ? JSON.parse(storedUniverIds) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('selectedUniversityIds', JSON.stringify(selectedUniversityIds));
  }, [selectedUniversityIds]);

  const handleUniversitySelect = (event, id) => {
    const selectedIndex = selectedUniversityIds.indexOf(id);
    let newSelectedUniversityIds = [];

    if (selectedIndex === -1) {
      newSelectedUniversityIds = newSelectedUniversityIds.concat(selectedUniversityIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUniversityIds = newSelectedUniversityIds.concat(selectedUniversityIds.slice(1));
    } else if (selectedIndex === selectedUniversityIds.length - 1) {
      newSelectedUniversityIds = newSelectedUniversityIds.concat(selectedUniversityIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUniversityIds = newSelectedUniversityIds.concat(
        selectedUniversityIds.slice(0, selectedIndex),
        selectedUniversityIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUniversityIds(newSelectedUniversityIds);
  };

  const isSelected = (id) => selectedUniversityIds.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="universities table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedUniversityIds.length > 0 &&
                  selectedUniversityIds.length < props.universities.length
                }
                checked={
                  props.universities.length > 0 &&
                  selectedUniversityIds.length === props.universities.length
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    const newSelectedUniversityIds = props.universities.map((university) => university.id);
                    setSelectedUniversityIds(newSelectedUniversityIds);
                  } else {
                    setSelectedUniversityIds([]);
                  }
                }}
                inputProps={{ 'aria-label': 'select all universities' }}
              />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.universities.map((university) => {
            const isUniversitySelected = isSelected(university.id);

            return (
              <TableRow
                key={university.id}
                hover
                onClick={(event) => handleUniversitySelect(event, university.id)}
                role="checkbox"
                aria-checked={isUniversitySelected}
                selected={isUniversitySelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isUniversitySelected} />
                </TableCell>
                <TableCell>{university.id}</TableCell>
                <TableCell>{university.name}</TableCell>
                <TableCell>{university.city}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UniversityTable.propTypes = {
  universities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default UniversityTable;
