import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { useLocalStorageState } from '@toolpad/core/useLocalStorageState';

import AllResult from "../../components/AllResults/AllResult";
import Paginator from "../../components/Paginator/Paginator";
import PreviewResults from "../../components/PreviewResults/PreviewResults";
import Allprojects from "../../components/AllProjects/Allprojects";
import Projects from "../../components/Projects";
import Experience from "../../components/Experience";

import Logo from "../../components/Logo";
import { Profile } from "../../components/Profile/Profile";
import NotFoundResults from "./NotFoundResults";
import img from '../../assets/Egv3.png'


import { driver } from "driver.js";
import "driver.js/dist/driver.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useLocalStorageState('page', '1');
  const [firstVisitSearch, setFirstVisitSearch] = useLocalStorageState('firstVisitSearch', false);

  const host = import.meta.env.VITE_HOST;
 
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
    setPage(newValue)
  };

  const handleChangetext = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOnTab = () => {
    setPage("2");
  };

  const renderTabContent = () => {
    switch (page) {
      case "1":
        return allResultsData.length === 0 ? (
          <NotFoundResults fetchSearchPortfolio={fetchSearchPortfolio} suggestionSearch={suggestion} />
        ) : (
          <div id="allResults">
            <AllResult data={allResultsData} />
            <Paginator phrase="Portafolio" totalPages={allResultsPages} />
          </div>
        );
      case "2":
        return <Allprojects data={allResultsData} />;
      case "3":
        return <Projects />;
      case "4":
        return <Experience />;
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

  const tabs = [{
    label: "Resultados",
    value: "1",
    id: "results"
  }, {
    label: "Proyectos",
    value: "2",
    id: "projects"

  }, {
    label: "Todos los proyectos",
    value: "3",
    id: "allProjects"
  }, {
    label: "Experiencia",
    value: "4",
    id: "experience"
  }]

  async function fetchSearchPortfolio(query, page = 1, limit = 10) {
    setIsLoading(true);
    try {
      const endpoint = "searchPortfolio";

      const response = await fetch(
        `${host}/api/${endpoint}?query=${encodeURIComponent(
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


  useEffect(() => {
    if (!firstVisitSearch) {
      const steps = [
        {
          element: '#searchInput',
          popover: {
            title: 'Búsqueda',
            description: 'En este campo puedes buscar proyectos utilizando palabras clave, ya sean tecnologías, nombres de proyectos, o cualquier término relacionado.'
          }
        },
        {
          element: '#allResults',
          popover: {
            title: 'Detalle de los Resultados',
            description: 'Aquí verás una lista de los resultados relacionados con tu búsqueda. Al hacer clic en un proyecto, podrás ver más detalles sobre él, incluyendo información específica y relevante.'
          }
        },
        {
          element: '#results',
          popover: {
            title: 'Resultados',
            description: 'Aquí se mostrarán los resultados relevantes basados en tu búsqueda. Navega para encontrar los proyectos que mejor se ajusten a tu consulta.'
          }
        },
        {
          element: '#projects',
          popover: {
            title: 'Proyectos',
            description: 'Esta sección muestra todos los proyectos relacionados con tu búsqueda. Explora para ver detalles sobre cada uno.'
          }
        },
        {
          element: '#allProjects',
          popover: {
            title: 'Todos los Proyectos',
            description: 'Si quieres explorar todos los proyectos disponibles, accede a esta sección donde podrás ver un listado completo.'
          }
        },
        {
          element: '#experience',
          popover: {
            title: 'Mi Experiencia Laboral',
            description: 'Aquí podrás ver un resumen de los lugares donde he trabajado, incluyendo mis roles y los proyectos en los que he participado.'
          }
        }
      ];
      const driverObj = driver({
        showProgress: true,
        steps,
        nextBtnText: 'Siguiente',
        prevBtnText: 'Atrás',
        doneBtnText: 'Finalizar'
      });
      driverObj.drive();
      setFirstVisitSearch(true)
    }
  }, [])

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchQuery?.trim()) return;
              handleSearch();
            }}

            className="w-full sm:w-auto max-w-md lg:max-w-2xl sm:ml-0 mx-auto">
            <div>
              <div className="flex w-[350px] sm:w-[500px] mt-[5%] sm:mt-0">
                <TextField id="searchInput"
                  value={searchQuery}
                  onChange={handleChangetext}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment className="cursor-pointer" position="start">
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
          <Profile imgLogo={img} />
        </div>
      </header>

      <div className="px-4 mx-auto w-full md:w-[90%]">
        <Tabs
          value={page}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto"
        >
          {
            tabs.map((item, index) => (
              <Tab sx={{ textTransform: 'none' }} id={item.id} label={item.label} value={item.value} key={index} className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-0" />
            ))
          }
        </Tabs>
      </div>
      <div className="flex flex-col sm:flex-row items-start mx-4 sm:mx-[10%] mt-4">
        <div
          className={`${page === "1" && allResultsData.length > 0 ? "sm:w-3/4" : "w-full"
            }`}
        >
          {renderTabContent()}
        </div>
        {page === "1" && allResultsData.length > 0 && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: 'black',
                height: '500px',
                display: { xs: 'none', sm: 'block' }
              }}
            />
            <div className="hidden sm:flex flex-col sm:w-1/4 p-4 bg-white shadow">
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
