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

function StudentsTable(props) {
  const classes = useStyles();
//   const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState(() => {
    const storedIds = localStorage.getItem('selectedStudentIds');
    return storedIds ? JSON.parse(storedIds) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('selectedStudentIds', JSON.stringify(selectedStudentIds));
  }, [selectedStudentIds]);

  const handleStudentSelect = (event, id) => {
    const selectedIndex = selectedStudentIds.indexOf(id);
    let newSelectedStudentIds = [];

    if (selectedIndex === -1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds, id);
    } else if (selectedIndex === 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds.slice(1));
    } else if (selectedIndex === selectedStudentIds.length - 1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, selectedIndex),
        selectedStudentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };

  const isSelected = (id) => selectedStudentIds.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="students table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedStudentIds.length > 0 &&
                  selectedStudentIds.length < props.students.length
                }
                checked={
                  props.students.length > 0 &&
                  selectedStudentIds.length === props.students.length
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    const newSelectedStudentIds = props.students.map((student) => student.id);
                    setSelectedStudentIds(newSelectedStudentIds);
                  } else {
                    setSelectedStudentIds([]);
                  }
                }}
                inputProps={{ 'aria-label': 'select all students' }}
              />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.students.map((student) => {
            const isStudentSelected = isSelected(student.id);

            return (
              <TableRow
                key={student.id}
                hover
                onClick={(event) => handleStudentSelect(event, student.id)}
                role="checkbox"
                aria-checked={isStudentSelected}
                selected={isStudentSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isStudentSelected} />
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.age}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

StudentsTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default StudentsTable;
