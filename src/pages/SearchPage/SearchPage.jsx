import React, { useState, useEffect } from "react";
import { Search, Mic, Camera } from "lucide-react";
import { Profile } from "../../components/Profile/Profile";
import { useNavigate, useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
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
    <div className="min-h-screen flex flex-col">
      <Logo open={false} />
      <header className="border-b flex-row">
        <div className="flex mx-[2%]">
          <div
            className="flex items-center max-w-full cursor-pointer"
            onClick={onHome}
          >
            <h1 className="text-2xl font-bold mr-8">
              {title.map((item, index) => (
                <span key={index} className={colors[index % colors.length]}>
                  {item}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex items-center p-4 w-4/5">
            <form className="flex-grow max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 shadow-sm"
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-3 space-x-3">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center w-1/ ml-auto  mr-8 ">
            <Profile img="https://imgcdn.stablediffusionweb.com/2024/2/24/31aad3d9-a853-4296-88d7-58b3104a0527.jpg" />
          </div>
        </div>

        <div className="flex px-4 pb- mx-[10%]">
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              <Tab label="Todo" value="1" />
              <Tab label="Projectos" value="2" />
              <Tab label="Skills" value="3" />
              <Tab label="Experiencia" value="4" />
              <Tab label="Más" value="5" />
            </TabList>
          </TabContext>
        </div>
      </header>

      <div className="flex flex-row max-w-full mx-[10%] h-full ">
        <div
          className={
            value === "1" && allResultsData.length > 0 ? "w-3/4" : "w-full"
          }
        >
          {renderTabContent()}
        </div>
        {value === "1" && allResultsData.length > 0 && (
          <>
            <Divider orientation="vertical" flexItem sx={{ marginTop: "2%" }} />
            <div className=" p-4 w-3/12 bg-white mx-auto">
              <PreviewResults
                data={allResultsDataImages}
                handleOnTab={handleOnTab}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
