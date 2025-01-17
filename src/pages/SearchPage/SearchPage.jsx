import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AllResult from "../../components/AllResults/AllResult";
import Paginator from "../../components/Paginator/Paginator";
import PreviewResults from "../../components/PreviewResults/PreviewResults";
import Allprojects from "../../components/AllProjects/Allprojects";
import Logo from "../../components/Logo";
import { Profile } from "../../components/Profile/Profile";
import NotFoundResults from "./NotFoundResults";
import img from '../../assets/Egv3.png'

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const [searchQuery, setSearchQuery] = useState("");
  const [allResultsData, setAllResultsData] = useState([]);
  const [allResultsDataImages, setAllResultsDataImages] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [allResultsPages, setAllResultsPages] = useState(0);
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_PORT;

  const handleSearch = () => {
    if (searchQuery === "" || searchQuery === undefined || searchQuery === null)
      return;
    fetchSearchPortfolio(searchQuery, 1, 10);
    const newUrl = new URLSearchParams(location.search);
    newUrl.set("query", searchQuery);
    navigate(`?${newUrl.toString()}`, { replace: true });
  };

  const onHome = () => {
    navigate(`/`);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangetext = (event) => {
    console.log(event.target.value, searchQuery);
    setSearchQuery(event.target.value);
  };

  const handleOnTab = () => {
    setValue("2");
  };


  const renderTabContent = () => {
    switch (value) {
      case "1":
        return allResultsData.length === 0 ? (
          <NotFoundResults fetchSearchPortfolio={fetchSearchPortfolio} suggestionSearch={suggestion} />
        ) : (
          <>
            <AllResult data={allResultsData} />
            <Paginator phrase="Portafolio" totalPages={allResultsPages} />
          </>
        );
      case "2":
        return <Allprojects />;
      case "3":
        return <div> 222222222222222222</div>;
      case "4":
        return <div> 3</div>;
      case "5":
        return <div> 4</div>;
      default:
        return null;
    }
  };

  const title = ["P", "o", "r", "t", "a", "f", "o", "l", "i", "o"];
  const colors = [
    "text-blue-500",
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
  ];

  async function fetchSearchPortfolio(query, page = 1, limit = 10) {
    setIsLoading(true);
    try {
      const endpoint = "searchPortfolio";

      const response = await fetch(
        `${host}${port}/api/${endpoint}?query=${encodeURIComponent(
          query
        )}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Error al realizar la búsqueda");
      }
      const data = await response.json();
      const onlyImages = data?.results?.flatMap((item) => item.images);
      setIsLoading(false);
      setAllResultsData(data.results ? data.results : []);
      setSuggestion(data.suggestions ? data.suggestions : []);
      setAllResultsDataImages(onlyImages);
      setAllResultsPages(data?.totalPages);

    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setIsLoading(false);
      return null;
    }
  }

  useEffect(() => {
    if (!searchTerm) return;
    fetchSearchPortfolio(searchTerm, 1, 10);
    setSearchQuery(searchTerm);

  }, []);


  useEffect(() => {
    if (!searchTerm) return;
    setSearchQuery(searchTerm);
  }, [searchTerm]);
  
  return (
    <div className="min-h-screen flex flex-col mt-[1%]">

      <Logo open={isLoading} />
      <header className="border-b flex flex-col sm:flex-row items-center px-4 py-2 justify-center sm:justify-start">
        <div
          className="flex items-center cursor-pointer w-full sm:w-auto"
          onClick={onHome}
        >
          <div className="flex w-full justify-center sm:justify-start">
            <h1 className="text-3xl font-extrabold mr-4 tracking-tight drop-shadow-md">
              {title.map((item, index) => (
                <span key={index} className={`${colors[index % colors.length]} drop-shadow-lg`}>
                  {item}
                </span>
              ))}
            </h1>

          </div>
        </div>
        <div className="flex w-full sm:justify-start justify-center">
          <form className="w-full sm:w-auto max-w-md lg:max-w-2xl sm:ml-0 mx-auto">
            <div>
              <div className="flex w-[350px] sm:w-[500px] mt-[5%] sm:mt-0">
                <TextField
                  value={searchQuery}
                  onChange={handleChangetext}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon onClick={handleSearch} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="absolute top-[2%] right-[5%] sm:relative sm:top-0 sm:right-0 ml-[70%] sm:ml-0">
          <Profile imgLogo={img}  />
        </div>
      </header>

      <div className="px-4 mx-auto w-full md:w-[90%]">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Todo" value="1" className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer" />
          <Tab label="Proyectos" value="2" className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer" />
          <Tab label="Skills" value="3" className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer" />
          <Tab label="Experiencia" value="4" className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer" />
          <Tab label="Más" value="5" className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer" />
        </Tabs>
      </div>
      <div className="flex flex-col sm:flex-row items-start mx-4 sm:mx-[10%] mt-4">
        <div
          className={`${value === "1" && allResultsData.length > 0 ? "sm:w-3/4" : "w-full"
            }`}
        >
          {renderTabContent()}
        </div>
        {value === "1" && allResultsData.length > 0 && (
          <div className="hidden sm:flex flex-col sm:w-1/4 p-4 bg-white shadow">
            <PreviewResults
              data={allResultsDataImages}
              handleOnTab={handleOnTab}
            />
          </div>
        )}
      </div>
    </div>
  );
};
