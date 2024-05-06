import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Questions40 from "./questrions40/Questions40";
import QuizIcon from '@mui/icons-material/Quiz';
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('data.json');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const handleViewChange = (view) => {
     setCurrentView(view);
  };

  return (
    <div className="App">
      <Router>
      <div className="container">
        <div className="bg" id="navigation-panel">
          <Divider />
            <List>
              <ListItem key="Home" disablePadding>
                <ListItemButton component={Link} to="/" onClick={() => handleViewChange("home")}>
                  <ListItemIcon>
                      <QuizIcon/>              
                  </ListItemIcon>
                  <ListItemText primary="40 Questions" />
                </ListItemButton>
              </ListItem>
            </List>
          <Divider /> 
        </div>
        <Routes>
          <Route path="/" element={<Questions40 allQuestions={data}/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
