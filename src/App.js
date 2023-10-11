import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import StudentsTable from './StudentsTable';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';
import { Delete } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import CustomAlert from './CustomAlert';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import UniversityTable from './UniversityTable';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
  field: 'firstName',
  headerName: 'First name',
  width: 150,
  editable: true,
  },
  {
  field: 'lastName',
  headerName: 'Last name',
  width: 150,
  editable: true,
  },
  {
  field: 'age',
  headerName: 'Age',
  type: 'number',
  width: 110,
  editable: true,
  },
  {
  field: 'fullName',
  headerName: 'Full name',
  description: 'This column has a value getter and is not sortable.',
  sortable: false,
  width: 160,
  valueGetter: (params) =>
  `${params.getValue(params.id, 'firstName') || ''} ${ params.getValue(params.id, 'lastName') || '' }`,
  },
  ];

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
    field: 'Name',
    headerName: 'Name',
    width: 150,
    editable: true,
    },
    {
    field: 'City',
    headerName: 'City',
    width: 150,
    editable: true,
    },
    {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
    `${params.getValue(params.id, 'Name') || ''} ${ params.getValue(params.id, 'City') || '' }`,
    },
    ];
const AddStudentForm = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !gender || !age) {
      setOpenErrorAlert(true);
      return;
    }
    const data = {
      firstName,
      lastName,
      gender,
      age
    };
    const response = await fetch('https://localhost:7197/api/Student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      setOpenErrorAlert(false);
      window.location.reload();
      // setOpenUniversity(true);
    } else {
      setOpenErrorAlert(true);
      // Handle error case
    }
  };

  

  return (
    <div>
    {openErrorAlert &&
    <div style={{marginBottom:"10px"}}>
      <Alert severity="error">
        This is an error alert — <strong>fill up all the inputs!</strong>
      </Alert>
      </div>
    }
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px", justifyItems: "center" }}>
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2", textAlign: "right", alignItems: "center", display: "flex", justifyContent: "flex-end" }}>
          <label style={{display: "inline-flex", marginRight: "5px" }}>
            First_Name:
          </label>
          <input class="form-control" type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <label style={{ marginLeft: "10px", marginRight: "5px" }}>
            Last_Name:
          </label>
          <input  class="form-control" type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3", textAlign: "right", alignItems: "center", display: "flex", justifyContent: "flex-end" }}>
          <label style={{display: "inline-flex", marginRight: "5px" }}>
            Age:
          </label>
          <input class="form-control" type="number" value={age} onChange={(event) => setAge(event.target.value)} />
          <label style={{ marginLeft: "10px", marginRight: "5px" }}>
            Gender:
          </label>
          <select class="form-control" value={gender} onChange={(event) => setGender(event.target.value)} style={{ marginLeft: "5px" }}>
            <option>choose one option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        {/* <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4", textAlign: "center",marginLeft:"-170px" }}>
          <button type="submit" style={{ marginRight: "10px" }}>Save</button>
          <button type="reset">Cancel</button>
        </div> */}
        <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4", textAlign: "center", marginLeft: "-170px" }}>
          <Button variant="contained" color="primary" type="submit" style={{ marginRight: "10px" }}>Save</Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              setFirstName("");
              setLastName("");
              setAge("");
              setGender("");
            }}
          >
            Cancel
          </Button>
        </div>

      </form>
      
      </div>
  );
};

const AddUniversityForm = () => {

  const [name, setName]= React.useState('');
  const [city,setCity]= React.useState('');
  
  // const handleSubmit2 = async (event) => {
  //   event.preventDefault();
  //   const data = {
  //     name,
  //     city,
  //   };
  //   const response = await fetch('https://localhost:7197/api/University', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   if (response.ok) {
  //     window.location.reload();
   
  //   } else {
  //     // Handle error case
  //   }
  // };

  const [openStudent, setOpenStudent] = React.useState(false);
  const [openUniversity, setOpenUniversity] = React.useState(true);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);

  // Load state values from localStorage on initial mount
  React.useEffect(() => {
    const storedOpenStudent = localStorage.getItem('openStudent');
    const storedOpenUniversity = localStorage.getItem('openUniversity');
    if (storedOpenStudent !== null && storedOpenUniversity !== null) {
      setOpenStudent(storedOpenStudent === 'true');
      setOpenUniversity(storedOpenUniversity === 'true');
    }
  }, []);

  // Save state values to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('openStudent', openStudent);
    localStorage.setItem('openUniversity', openUniversity);
  }, [openStudent, openUniversity]);

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    if (!name || !city) {
      setOpenErrorAlert(true);
      return;
    }
    const data = {
      name,
      city,
    };
    const response = await fetch('https://localhost:7197/api/University', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      // Set the state variables before reloading the page
      setOpenStudent(false);
      setOpenUniversity(true);
      // Store the state variables in localStorage
      // localStorage.setItem('openStudent', false);
      // localStorage.setItem('openUniversity', true);
      setOpenErrorAlert(false);
      window.location.reload();
    } else {
      // Handle error case
      setOpenErrorAlert(true);
    }
  };

  return (
    <div>
      {openErrorAlert &&
      <div style={{marginBottom:"10px"}}>
        <Alert severity="error">
          This is an error alert — <strong>fill up all the inputs!</strong>
        </Alert>
        </div>
      }
      <form onSubmit={handleSubmit2} style={{ display: "grid", gap: "20px", justifyItems: "center" }}>
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2", textAlign: "right", alignItems: "center", display: "flex", justifyContent: "flex-end" }}>
          <label style={{display: "inline-flex", marginRight: "5px" }}>
            Name:
          </label>
          <input class="form-control" type="text" value={name} onChange={(event) => setName(event.target.value)} />
          <label style={{ marginLeft: "10px", marginRight: "5px" }}>
            City:
          </label>
          <select class="form-control" value={city} onChange={(event) => setCity(event.target.value)} style={{ marginLeft: "5px" }}>
            <option>choose one option</option>
            <option value="EL JADIDA">EL JADIDA</option>
            <option value="CASABLANCA">CASABLANCA</option>
            <option value="RABAT">RABAT</option>
            <option value="AGADIR">AGADIR</option>
            <option value="MARRAKECH">MARRAKECH</option>
            <option value="OUJDA">OUJDA</option>
            <option value="TANGER">TANGER</option>
          </select>
        </div>
        
        
        {/* <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4", textAlign: "center",marginLeft:"-170px" }}>
          <button type="submit" style={{ marginRight: "10px" }}>Save</button>
          <button type="reset">Cancel</button>
        </div> */}
        <div style={{ gridColumn: "1 / 3", gridRow: "3 / 4", textAlign: "center", marginLeft: "-170px" }}>
          <Button variant="contained" color="primary" type="submit" style={{ marginRight: "10px" }}>Save</Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              setName("");
              setCity("");
            }}
          >
            Cancel
          </Button>
        </div>

      </form>
      </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function App() {
  const [value, setValue] = React.useState(0);
  const [selectedStudentIds, setSelectedStudentIds] = React.useState([]);
  const [openUniversity,setOpenUniversity]=React.useState(false);
  const [openStudent,setOpenStudent]=React.useState(true);
  
  const [selectedUniversityIds,setSelectedUniversityIds]= React.useState([]);


  const [students, setStudents] = React.useState([]);
  const [universities, setUniversities] = React.useState([]);
   
 

  React.useEffect(() => {
    fetch("https://localhost:7197/api/Student")
      .then((response) => response.json())
      .then((data) => setStudents(data));
    const selectedIds = JSON.parse(localStorage.getItem('selectedStudentIds')) || [];
    setSelectedStudentIds(selectedIds);
    console.log("hhhhh");
    console.log(selectedIds);
  }, []);

  

  React.useEffect(() => {
    fetch("https://localhost:7197/api/University")
      .then((response) => response.json())
      .then((data) => setUniversities(data));
    const selectedUniverIds = JSON.parse(localStorage.getItem('selectedUniversityIds')) || [];
    setSelectedUniversityIds(selectedUniverIds);
    console.log("OHOOOOOH");
    console.log(selectedUniverIds);
  }, []);



  function handleAddStudentClick() {
    console.log("Add Student button clicked");
    setOpenUniversity(false);
    setOpenStudent(true);
    setValue(0);
  }
  function handleAddUniversityClick() {
    console.log("Add University button clicked");
    setOpenUniversity(true);
    setOpenStudent(false);
    setValue(0);// a penser
  }

  async function deleteStudents(ids) {
    try {
      const requests = ids.map(id => axios.delete(`https://localhost:7197/api/Student/${id}`));
      await Promise.all(requests);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function deleteUniversities(ids) {
    try {
      const requests2 = ids.map(id => axios.delete(`https://localhost:7197/api/University/${id}`));
      await Promise.all(requests2);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  function handleRemoveStudent() {
    setOpenStudent(true);
    setOpenUniversity(false);
    deleteStudents(selectedStudentIds)
      .then(() => {
        // remove deleted ids from localStorage
        const updatedIds = JSON.parse(localStorage.getItem('selectedStudentIds')).filter(id => !selectedStudentIds.includes(id));
        localStorage.setItem('selectedStudentIds', JSON.stringify(updatedIds));
        setSelectedStudentIds(updatedIds);
        setStudents(students.filter(student => !selectedStudentIds.includes(student.id)));
      })
      .catch(error => {
        // handle error
      });
  }

  function handleRemoveUniversity() {
    setOpenUniversity(true);
    setOpenStudent(false);
    deleteUniversities(selectedUniversityIds)
      .then(() => {
        // remove deleted ids from localStorage
        const updatedUniverIds = JSON.parse(localStorage.getItem('selectedUniversityIds')).filter(id => !selectedUniversityIds.includes(id));
        localStorage.setItem('selectedUniversityIds', JSON.stringify(updatedUniverIds));
        setSelectedUniversityIds(updatedUniverIds);
        setUniversities(universities.filter(university => !selectedUniversityIds.includes(university.id)));
      })
      .catch(error => {
        // handle error
      });
  }



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [open2,setOpen2]= React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>\
    <Grid xs={12}>
        <Item><img src="https://cdn-07.9rayti.com/rsrc/cache/widen_292/uploads/2012/07/logo-ensa-el-jadida.gif" alt="kdkskd" /></Item>
      </Grid>
      <Grid xs={4}>
        <Item>
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
        <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Student" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleAddStudentClick}>
            <ListItemIcon>
            <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={handleRemoveStudent}>
            <ListItemIcon>
             <Delete />
            </ListItemIcon>
            <ListItemText primary="Remove Student" />
          </ListItem>
          
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
         <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="University" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleAddUniversityClick}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add University" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={handleRemoveUniversity}>
            <ListItemIcon>
               <Delete />
            </ListItemIcon>
            <ListItemText primary="Remove University" />
          </ListItem>
          
        </List>
      </Collapse>
    </List>

        </Item>
      </Grid>
      <Grid xs={8}>
        <Item>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {openStudent && (
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Main Menu" {...a11yProps(0)} />
            <Tab label="Show students" {...a11yProps(1)} />
          </Tabs>)}
        {openUniversity && (
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Main Menu" {...a11yProps(0)} />
            <Tab label="Show Univerities" {...a11yProps(1)} />
          </Tabs>)}
        </Box>
        <TabPanel value={value} index={0}>
        {openStudent && (
            <AddStudentForm />
          )}
          {openUniversity && (
            <AddUniversityForm />
        )}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {openStudent && (
           <StudentsTable students={students} />
        )}
        {openUniversity && (
           <UniversityTable universities={universities} />
           )}
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
           <StudentsTable students={students} />
        </TabPanel>
        <TabPanel value={value} index={1}>
           <StudentsTable students={students} />
        </TabPanel> */}
      </Box>
        </Item>
      </Grid>
      
    </Grid>
  </Box>
  );
}

export default App;
