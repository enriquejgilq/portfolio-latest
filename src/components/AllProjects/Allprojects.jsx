import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

const Allprojects = () => {
  const testData = [
    "React",
    "Vite",
    "MongoDb",
    "React",
    "Vite",
    "MongoDb",
    "React",
    "Vite",
    "MongoDb",
  ];
  const testDataCards = [
    {
      name: "react1",
      description: "description",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react2",
      description: "description2",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react3",
      description: "description3",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react4",
      description: "description4",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react5",
      description: "description5",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react6",
      description: "description6",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react7",
      description: "description7",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react8",
      description: "description8",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react9",
      description: "description9",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
    {
      name: "react10",
      description: "description10",
      img: "https://codigoencasa.com/content/images/size/w2000/2022/04/Captura-de-Pantalla-2022-04-26-a-las-9.42.16.png",
    },
  ];
  return (
    <div className="flex mt-1   flex-col">
      <div className="flex flex-row gap-2">
        {testData.map((item, index) => (
          <div
            className="h-11 flex flex-row w-36 border border-gray-400 rounded-lg"
            key={index}
          >
            <div className="  flex justify-center items-center">
              <img
                alt="Descripción de la imagen"
                height={40}
                width={40}
                className="rounded-l-lg"
                src="https://imgcdn.stablediffusionweb.com/2024/2/24/31aad3d9-a853-4296-88d7-58b3104a0527.jpg"
              />
            </div>
            <div className="flex items-center justify-center w-3/5">
              <Typography fontSize={12}>{item}</Typography>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-1 ">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {testDataCards.map((item, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card style={{ padding: "20px", height: "200px" }}>
                <img width="200px" src={item.img} />
              </Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography fontSize={11}> {item.description}</Typography>
                <Typography> {item.name}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Allprojects;
