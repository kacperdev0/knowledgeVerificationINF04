import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Questions40 from "./questrions40/Questions40";
import SingleQuestion from "./singleQuestion/singleQuestion";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
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
        <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Quiz App
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Tabs value={currentView} onChange={handleViewChange} textColor="inherit">
                <Tab label="40 Questions" icon={<QuizIcon />} component={Link} to="/" />
                <Tab label="Single question" icon={<HelpCenterIcon />} component={Link} to="/singleQuestion" />
              </Tabs>
            </Toolbar>
          </AppBar>
        <div className="container">
          <Routes>
            <Route path="/" element={<Questions40 allQuestions={data}/>} />
            <Route path="/singleQuestion" element={<SingleQuestion allQuestions={data}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
