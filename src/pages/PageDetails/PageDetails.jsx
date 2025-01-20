import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Logo from "../../components/Logo";

export const PageDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const host = import.meta.env.VITE_HOST;
  const location = useLocation();
  const idParams = new URLSearchParams(location.search);
  const id = idParams.get("id");
  const goBack = () => {
    navigate(-1);
  };
  async function getPortfolioItem(id) {
    setLoading(true);
    const endpoint = "searchById";
    try {
      const response = await fetch(`${host}/api/${endpoint}?id=${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      setData(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPortfolioItem(id);
  }, []);
  if (loading) return <Logo open={loading} />;

  return (
    <div>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <nav className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center w-[100%] gap-2">
              <ArrowBackSharpIcon className="cursor-pointer text-black" onClick={goBack} />
              <LaptopChromebookIcon className="text-black" />
              <span className="text-lg font-medium text-black">Detalles del proyecto</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a
                onClick={() => navigate(`/`)}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Página principal
              </a>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto text-black">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {data?.name}
            </h1>

            <div className="flex items-start gap-9">
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground text-left "
              >
                {data?.description}
              </label>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "2%" }}>
              {data?.technology?.map((item, index) => (
                <Chip key={index} label={item} variant="outlined" />
              ))}
            </div>
          </div>
          {data?.images?.length > 0 ? (
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={1500}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={true}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              rewind
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {data?.images?.map((item, index) => (
                <div style={{ gap: "50px", margin: "1%" }} key={index}>
                  <Card elevation={3}>
                    <img
                      src={item ? item : ""}
                      alt={item ? item : ""}
                      width={400}
                      height={200}
                      className="w-full object-cover"
                    />
                  </Card>
                </div>
              ))}
            </Carousel>
          ) : null}
        </main>
      </div>
    </div>
  );
};
