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
          <h2
            className="text-xl text-blue-700 hover:underline cursor-pointer"
            onClick={() => onPage(item._id)}
          >
            {item.name}
          </h2>
          <div className="text-sm text-green-700">
            https://yourname.com/portfolio
          </div>
          <p className="text-sm mt-1 text-black ">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllResult;
