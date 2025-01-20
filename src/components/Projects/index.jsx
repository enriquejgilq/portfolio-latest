import React, { useState, useEffect } from 'react'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Logo from '../../components/Logo'

import { useNavigate } from "react-router-dom";

function Projects() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState([]);


    const host = import.meta.env.VITE_HOST;
    
     const onNavigate = (id) => {
        navigate(`/details?id=${id}`);
      }
      
    async function fetchSearchAllPortfolio() {
        setLoading(true);
        try {
            const endpoint = "getAllPortfolio";

            const response = await fetch(
                `${host}/api/${endpoint}`
            );

            if (!response.ok) {
                throw new Error("Error al realizar la búsqueda");
            }
            const data = await response.json();
            const processedData = data.results.map((item, index) => ({
                img: item.images?.[0] || "https://via.placeholder.com/150",
                title: item.name,
                cols: Math.random() > 0.7 ? 2 : 1,
                rows: Math.random() > 0.7 ? 2 : 1,
                id: item._id
            }));
            setItemData(processedData);
            setLoading(false);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setLoading(false);
            return null;
        }
    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    useEffect(() => {
        fetchSearchAllPortfolio()
    }, [])

    return (
        <div>
            <Logo open={loading} />
            <ImageList
                sx={{ width: '100%', height: '100%' }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
                        <img onClick={() => { onNavigate(item.id) }}
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}

export default Projects