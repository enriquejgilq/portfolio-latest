import { useState, useEffect } from "react";
import { Profile } from "../../components/Profile/Profile";
import { useNavigate, useLocation } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import AllResult from "../../components/AllResults/AllResult";
import Paginator from "../../components/Paginator/Paginator";
import PreviewResults from "../../components/PreviewResults/PreviewResults";
import Allprojects from "../../components/AllProjects/Allprojects";
import Logo from "../../components/Logo";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const [searchQuery, setSearchQuery] = useState("");
  const [allResultsData, setAllResultsData] = useState([]);
  const [allResultsDataImages, setAllResultsDataImages] = useState([]);
  const [allResultsPages, setAllResultsPages] = useState(0);
  const [value, setValue] = useState("1");
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

  const handleOnTab = () => {
    setValue("2");
  };
  const renderTabContent = () => {
    switch (value) {
      case "1":
        return allResultsData.length === 0 ? (
          <p> Sin resultados</p>
        ) : (
          <>
            <AllResult data={allResultsData} />
            <Paginator phrase="Portafolio" totalPages={allResultsPages} />
          </>
        );
      case "2":
        return <Allprojects />;
      case "3":
        return <div> 2</div>;
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
      setAllResultsData(data.results);
      const onlyImages = data.results.flatMap((item) => item.images);
      setAllResultsDataImages(onlyImages);

      setAllResultsPages(data?.totalPages);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      return null;
    }
  }
  useEffect(() => {
    if (!searchTerm) return;
    fetchSearchPortfolio(searchTerm, 1, 10);
    setSearchQuery(searchTerm);
  }, []);

  return (
    <div className="min-h-screen flex flex-col mt-[1%]">

      <Logo open={false} />
      <header className="border-b flex flex-col sm:flex-row items-center px-4 py-2 justify-center sm:justify-start">
        <div
          className="flex items-center cursor-pointer w-full sm:w-auto"
          onClick={onHome}
        >
          <div className="flex w-full justify-center sm:justify-start">
            <h1 className="text-2xl font-bold mr-4">
              {title.map((item, index) => (
                <span key={index} className={colors[index % colors.length]}>
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
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </form>
        </div>


        <div className="absolute top-[2%] right-[5%] sm:relative sm:top-0 sm:right-0 ml-[70%] sm:ml-0">
          <Profile img="https://imgcdn.stablediffusionweb.com/2024/2/24/31aad3d9-a853-4296-88d7-58b3104a0527.jpg" />
        </div>
      </header>



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
