import React from "react";
import Card from "@mui/material/Card";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import { Typography } from "@mui/material";
function PreviewResults({ data = [], handleOnTab }) {

  const onFuntion = () => {
    handleOnTab();
  };
   return (
    <Card sx={{ margin: "2%" }}>
      <div className="flex flex-row h-[100%]">
        <div className="flex items-center justify-center  w-1/2">
          <img
            src={
              data[0]
                ? data[0]
                : "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            }
          />
        </div>

        <div className="flex flex-col  w-1/2">
          <div className="flex-1 ">
            <img src="https://es.vitejs.dev/logo.svg" />
          </div>
          <div className="flex-1 ">
            <img src="https://desarrolloweb.com/storage/tag_images/actual/EO1xilq1ys4z1RfTwCb5VRj3h28wSewfJA8mwmWE.png" />
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
