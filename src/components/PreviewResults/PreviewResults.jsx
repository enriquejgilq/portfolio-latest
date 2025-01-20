import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import { Typography } from "@mui/material";


const getRandomImages = (data) => {
  if (data.length <= 3) {
    return data;
  }

  // Si hay más de 3 imágenes, seleccionamos 3 aleatorias
  const shuffled = [...data].sort(() => Math.random() - 0.5); // Mezcla el array
  return shuffled.slice(0, 3); // Devuelve los primeros 3 elementos del array mezclado
};

function PreviewResults({ data = [], handleOnTab }) {
  const [images, setImages] = useState([]);

  const onFuntion = () => {
    handleOnTab();
  };

  useEffect(() => {
    setImages(getRandomImages(data));
  }, [data]);
  return (
    <Card sx={{ margin: "2%" }}>
      <div className="flex flex-row h-[100%]">
        <div className="flex w-1/2">
          <img
            src={images[0] ? images[0] : "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
          />
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex-1 ">
            <img  src={images[1] ? images[1] : "https://es.vitejs.dev/logo.svg"}
            />
          </div>
          <div className="flex-1">
            <img
              src={images[2] ? images[2]  : "https://desarrolloweb.com/storage/tag_images/actual/EO1xilq1ys4z1RfTwCb5VRj3h28wSewfJA8mwmWE.png"}
            />
            <div
              onClick={onFuntion}
              className="bg-gray-500 bg-opacity-50 cursor-pointer flex flex-row justify-center items-center gap-1"
            >
              <WorkHistoryTwoToneIcon className="text-white font-bold" />
              <Typography fontSize={11} className="text-white font-bold">
                Ver más proyectos
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PreviewResults;
