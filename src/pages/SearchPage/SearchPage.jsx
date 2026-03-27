import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { useLocalStorageState } from "@toolpad/core/useLocalStorageState";
import {
  Drawer,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import AllResult from "../../components/AllResults/AllResult";
import Paginator from "../../components/Paginator/Paginator";
import PreviewResults from "../../components/PreviewResults/PreviewResults";
import Allprojects from "../../components/AllProjects/Allprojects";
import Projects from "../../components/Projects";
import Experience from "../../components/Experience";
 
import Logo from "../../components/Logo";
import { Profile } from "../../components/Profile/Profile";
import NotFoundResults from "./NotFoundResults";
import img from "../../assets/Egv3.png";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { ImageGallery } from "../../components/Gallery/ImageGallery";

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
  const [page, setPage] = useLocalStorageState("page", "1");
  const [firstVisitSearch, setFirstVisitSearch] = useLocalStorageState(
    "firstVisitSearch",
    false,
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allProjectsData, setAllProjectsData] = useState([]);

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
    setPage(newValue);
  };

  const handleImageClickForDrawer = (image) => {
    const project = allResultsData.find((p) => p._id === image.id);
    if (project) {
      setDrawerContent(project);
      const index = allResultsData.findIndex((p) => p._id === image.id);
      setCurrentIndex(index);
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      setCurrentIndex(nextIndex);
      setDrawerContent(allResultsData[nextIndex]);
    }
  };

  const goToNextItem = () => {
    if (currentIndex < allResultsData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setDrawerContent(allResultsData[nextIndex]);
    }
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
          <NotFoundResults
            fetchSearchPortfolio={fetchSearchPortfolio}
            suggestionSearch={suggestion}
          />
        ) : (
          <div id="allResults">
            <AllResult data={allResultsData} />
            <Paginator phrase="Portafolio" totalPages={allResultsPages} />
          </div>
        );
      case "2":
        const projectsImages = allResultsData.map((project) => ({
          id: project._id,
          src: project.images[0],
          alt: project.description || project.name,
          title: project.name,
          categories: project.technology && project.technology.length > 0 ? project.technology : ["General"],
          projectImages: project.images,
        }));
        return (
          <ImageGallery
            images={projectsImages}
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            onImageClick={handleImageClickForDrawer}
          />
        );
      case "3":
        const galleryImages = allProjectsData.map((project) => ({
          id: project._id,
          src: project.images[0],
          alt: project.description || project.name,
          title: project.name,
          categories: project.technology && project.technology.length > 0 ? project.technology : ["General"],
          projectImages: project.images,
        }));
        return (
          <ImageGallery
            images={galleryImages}
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        );
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

  const tabs = [
    {
      label: "Resultados",
      value: "1",
      id: "results",
    },
    {
      label: "Proyectos",
      value: "2",
      id: "projects",
    },
    {
      label: "Todos los proyectos",
      value: "3",
      id: "allProjects",
    },
    {
      label: "Experiencia",
      value: "4",
      id: "experience",
    },
  ];

  async function fetchSearchPortfolio(query, page = 1, limit = 10) {
    setIsLoading(true);
    try {
      const endpoint = "searchPortfolio";

      const response = await fetch(
        `${host}/api/${endpoint}?query=${encodeURIComponent(
          query,
        )}&page=${page}&limit=${limit}`,
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

  async function fetchAllProjects() {
    try {
      const endpoint = "getAllPortfolio";
      const response = await fetch(`${host}/api/${endpoint}`);
      if (!response.ok) throw new Error("Error fetching all projects");
      const data = await response.json();
      setAllProjectsData(data.results || []);
    } catch (error) {
      console.error("Error fetching all projects:", error);
    }
  }

  /*
  const images = [
    {
      id: "1",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Arquitectura moderna con líneas limpias",
      title: "Diseño Contemporáneo",
      category: "arquitectura",
    },
    {
      id: "2",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Interior minimalista elegante",
      title: "Espacio Minimalista",
      category: "interiores",
    },
    {
      id: "3",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Arte geométrico abstracto",
      title: "Geometría Abstracta",
      category: "arte",
    },
    {
      id: "4",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Paisaje natural impresionante",
      title: "Naturaleza Pura",
      category: "naturaleza",
    },
    {
      id: "5",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Fotografía urbana de calle",
      title: "Vida Urbana",
      category: "fotografía",
    },
    {
      id: "6",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Diseño de producto elegante",
      title: "Diseño de Producto",
      category: "diseño",
    },
    {
      id: "7",
      src: "/creative-workspace.png",
      alt: "Espacio de trabajo creativo",
      title: "Espacio Creativo",
      category: "interiores",
    },
    {
      id: "8",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Tecnología moderna",
      title: "Innovación Tech",
      category: "tecnología",
    },
    {
      id: "9",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/500px-Spider-Man.jpg",
      alt: "Composición artística",
      title: "Arte Contemporáneo",
      category: "arte",
    },
  ];
  */

  useEffect(() => {
    fetchAllProjects();
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
          element: "#searchInput",
          popover: {
            title: "Búsqueda",
            description:
              "En este campo puedes buscar proyectos utilizando palabras clave, ya sean tecnologías, nombres de proyectos, o cualquier término relacionado.",
          },
        },
        {
          element: "#allResults",
          popover: {
            title: "Detalle de los Resultados",
            description:
              "Aquí verás una lista de los resultados relacionados con tu búsqueda. Al hacer clic en un proyecto, podrás ver más detalles sobre él, incluyendo información específica y relevante.",
          },
        },
        {
          element: "#results",
          popover: {
            title: "Resultados",
            description:
              "Aquí se mostrarán los resultados relevantes basados en tu búsqueda. Navega para encontrar los proyectos que mejor se ajusten a tu consulta.",
          },
        },
        {
          element: "#projects",
          popover: {
            title: "Proyectos",
            description:
              "Esta sección muestra todos los proyectos relacionados con tu búsqueda. Explora para ver detalles sobre cada uno.",
          },
        },
        {
          element: "#allProjects",
          popover: {
            title: "Todos los Proyectos",
            description:
              "Si quieres explorar todos los proyectos disponibles, accede a esta sección donde podrás ver un listado completo.",
          },
        },
        {
          element: "#experience",
          popover: {
            title: "Mi Experiencia Laboral",
            description:
              "Aquí podrás ver un resumen de los lugares donde he trabajado, incluyendo mis roles y los proyectos en los que he participado.",
          },
        },
      ];
      const driverObj = driver({
        showProgress: true,
        steps,
        nextBtnText: "Siguiente",
        prevBtnText: "Atrás",
        doneBtnText: "Finalizar",
      });
      driverObj.drive();
      setFirstVisitSearch(true);
    }
  }, []);

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
                <span
                  key={index}
                  className={`${colors[index % colors.length]} drop-shadow-lg`}
                >
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
            className="w-full sm:w-auto max-w-md lg:max-w-2xl sm:ml-0 mx-auto"
          >
            <div>
              <div className="flex w-[350px] sm:w-[500px] mt-[5%] sm:mt-0">
                <TextField
                  id="searchInput"
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
                      <InputAdornment
                        className="cursor-pointer"
                        position="start"
                      >
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
          {tabs.map((item, index) => (
            <Tab
              sx={{ textTransform: "none" }}
              id={item.id}
              label={item.label}
              value={item.value}
              key={index}
              className="py-1 px-3 text-base md:text-lg md:py-2 md:px-4 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-0"
            />
          ))}
        </Tabs>
      </div>
      <div className="flex flex-col sm:flex-row items-start mx-4 sm:mx-[10%] mt-4">
        <div
          className={`${
            page === "1" && allResultsData.length > 0 ? "sm:w-3/4" : "w-full"
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
                backgroundColor: "black",
                height: "500px",
                display: { xs: "none", sm: "block" },
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

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          width: isMobile ? "100%" : 420,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "100%" : 420,
            boxSizing: "border-box",
            height: isMobile ? "auto" : "100%",
            overflow: "auto",
          },
        }}
      >
        <div style={{ padding: "20px", width: "100%" }}>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Detalles del proyecto</Typography>
            <div className="flex items-center">
              {!isMobile && (
                <>
                  <IconButton
                    className="focus:outline-none focus:ring-0"
                    disableRipple
                    onClick={goToPreviousItem}
                    disabled={currentIndex === 0}
                  >
                    <ArrowBackIosIcon fontSize="medium" />
                  </IconButton>
                  <IconButton
                    className="focus:outline-none focus:ring-0"
                    disableRipple
                    onClick={goToNextItem}
                    disabled={currentIndex === allResultsData.length - 1}
                  >
                    <ArrowForwardIosIcon fontSize="medium" />
                  </IconButton>
                </>
              )}
              <IconButton onClick={handleCloseDrawer}>
                <Close />
              </IconButton>
            </div>
          </div>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {drawerContent?.name}
          </Typography>
          {drawerContent?.images?.[0] && (
            <img
              src={drawerContent.images[0]}
              alt={drawerContent.name}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
            />
          )}
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {drawerContent?.description}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseDrawer}
            sx={{ marginTop: 4, borderRadius: "20px" }}
          >
            Cerrar
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
