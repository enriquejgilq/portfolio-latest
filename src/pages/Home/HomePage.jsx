import { useState, useEffect } from "react";
import { Profile } from "../../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

import { CiMenuKebab } from "react-icons/ci";
export default function Component() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const technologies = [];

  const handleSearch = (e) => {
    const trimmedQuery = searchQuery.trim();
    e.preventDefault();
    if (!trimmedQuery) return;
    navigate(`/search?query=${searchQuery}`);
  };

  const handleSelection = (event, newValue) => {
    if (newValue === null || newValue === undefined || newValue === "") return;

    if (newValue && !searchHistory.includes(newValue)) {
      const updatedHistory = [newValue, ...searchHistory];
      if (updatedHistory.length > 5) updatedHistory.pop();
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    navigate(`/search?query=${newValue}`);
  };

  const options = [...searchHistory, ...technologies.map((tech) => tech.title)];
  const handleInputChange = (event, newInputValue) => {
    setSearchQuery(newInputValue);
  };

  const handleLucky = () => {
    console.log("I'm feeling lucky!");
  };
  const title = ["P", "o", "r", "t", "a", "f", "o", "l", "i", "o"];
  const colors = [
    "text-blue-500",
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
  ];

  const tendencies = [
    { title: "React", value: "React" },
    { title: "css", value: "css" },
    { title: "MongoDb", value: "MongoDb" },
    { title: "node", value: "node" },
  ];

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">

      <header className="flex justify-end items-center p-2 md:p-4">
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Profile img="https://imgcdn.stablediffusionweb.com/2024/2/24/31aad3d9-a853-4296-88d7-58b3104a0527.jpg" />
        </nav>
      </header>

      <main className="flex-grow flex flex-col md:items-center md:justify-center px-2 md:px-4">
        <h1 className="text-4xl md:text-8xl font-bold mb-4 md:mb-8 text-center">
          {title.map((item, index) => (
            <span key={index} className={colors[index % colors.length]}>
              {item}
            </span>
          ))}
        </h1>

        <form
          onSubmit={handleSelection}
          className="w-full max-w-md md:max-w-2xl"
        >
          <div className="relative">
            <div className="w-full py-2 md:py-3 px-3 md:px-5 rounded-full border border-gray-200 focus-within:border-gray-300 shadow-lg">
              <Autocomplete
                clearIcon={null}
                freeSolo
                options={options}
                onChange={handleSelection}
                onInputChange={handleInputChange}
                renderOption={(props, option, index) => (
                  <li
                    key={index}
                    {...props}
                    className="flex items-center space-x-2 cursor-pointer p-1"
                  >
                    <AccessTimeIcon className="text-gray-500" />
                    <span className="text-sm">{option}</span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    placeholder="Buscar proyectos"
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        paddingY: "0",
                      },
                      "& .MuiInputBase-input": {
                        paddingY: "6px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  />
                )}
              />
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center pr-2 md:pr-3 space-x-2 md:space-x-3">
              <Button
                disableRipple
                onClick={handleSearch}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                type="submit"
                className="text-blue-500 hover:text-blue-600"
              >
                <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>

          <div className="block md:hidden mt-2">
            <div className="text-left ml-2 mt-12 flex flex-row items-center">
              <Typography sx={{ fontWeight: "bold" }}>
                Tendencias de búsquedas
              </Typography>
              <CiMenuKebab className="ml-auto" />

            </div>

            <List>
              {tendencies.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <TrendingUpIcon sx={{ color: 'black', marginRight: '8px' }} />
                    <ListItemText sx={{ color: 'black'  }} primary={item.title} />
                  </ListItem>
                  <Divider component="li" />
                </div>
              ))}
            </List>
          </div>
          <div className="flex flex-col md:flex-row justify-center mt-4 md:mt-8 space-y-2 md:space-y-0 md:space-x-4">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:shadow transition-shadow duration-200 w-full md:w-auto"
            >
              Buscar proyectos
            </button>
            <button
              onClick={handleLucky}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:shadow transition-shadow duration-200 w-full md:w-auto"
            >
              Voy a tener suerte
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
