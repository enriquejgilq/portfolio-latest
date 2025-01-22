import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllResult = ({ data = [] }) => {
  const navigate = useNavigate();

  const onPage = (id) => {
    navigate(`/details?id=${id}`);
  };
  return (
    <div className="p-4 mx-auto text-left">
      <div className="mb-4 text-sm text-gray-600">
        About {data.length} results
      </div>

      {data.map((item, index) => (
        <div key={index} className="mb-8">
          <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 'bold' }}
            className="text-xl text-blue-700 hover:underline cursor-pointer"
            onClick={() => onPage(item._id)}
          >
            {item.name}
          </Typography>
          
          <Typography sx={{fontSize:'12px'}} className="text-sm mt-1 text-black sm:text-xs text-justify">{item.description}</Typography>
        </div>
      ))}
    </div>
  );
};

export default AllResult;
