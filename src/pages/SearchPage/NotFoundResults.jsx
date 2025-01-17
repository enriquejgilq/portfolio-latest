import React from 'react'
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import img from '../../assets/notFoundImg.png'


function NotFoundResults({ suggestionSearch = [], fetchSearchPortfolio }) {

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query");
    
    const navigate = useNavigate();
    const suggestions = [
        "Asegúrate de que todas las palabras estén escritas correctamente.",
        "Prueba diferentes palabras clave.",
        "Prueba palabras clave más generales.",
        "Prueba menos palabras clave.",
    ];

    const handleSuggestionClick = (suggestionData) => {
        fetchSearchPortfolio(suggestionData, 1, 10);
        navigate(`/search?query=${encodeURIComponent(suggestionData)}`);
    };

    return (
        <div className="flex flex-col justify-start items-start">
            {suggestionSearch.length > 0 && (
                <div className="flex flex-row">
                    <Typography className="text-red-500">Quizás quisiste decir:</Typography>
                    <Typography
                        sx={{ fontWeight: 'bold' }}
                        className="text-blue-700 font-bold italic ml-2 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestionSearch[0]?.description)}
                    >
                        {suggestionSearch[0]?.description}
                    </Typography>
                </div>
            )}

            <div style={{ textAlign: 'start' }} className="text-black">
                <Typography className="text-black">
                    No se encontró ningún resultado que contenga todos los términos de búsqueda que ingresaste.
                </Typography>
            </div>
            <Typography style={{ fontWeight: 'bold' }} className="text-black">
                ({searchTerm})
            </Typography>
            <Typography className="text-black">Sugerencias:</Typography>
            <ul className="list-none text-left pl-0 mt-4 ">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center text-black text-sm m-0 p-0 ">
                        <Typography sx={{ fontSize: '14px' }} className="text-black"> ● {suggestion}</Typography>
                    </li>
                ))}
            </ul>
            <img
                className="rounded-lg shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)] mt-4"
                src={img}
                width={328}
                height={540}
                alt="not found"
            />
        </div>




    )
}

export default NotFoundResults