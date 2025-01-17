import React from 'react'

const LogoWithoutAnimation = () => {
    return (
        <div style={{ width: '150px', height: '150px' }}>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"  // Usar el 100% del contenedor
          height="100%" // Usar el 100% del contenedor
          viewBox="0 0 500 500" // Asegúrate de que el viewBox sea adecuado para el SVG
          preserveAspectRatio="xMidYMid meet" // Mantener la relación de aspecto
        >
          <path
            d="M164 228v28h38v-11h-25v-12h22v-11h-22v-11h24v-11h-37v28zM260 209.5v6.5h123v-13H260v6.5zM316 238.7c-6.6 2.4-14.4 10.7-16.4 17.3-2 6.8-2 13.2 0 20 2.2 7.4 10 15.2 17.4 17.4 14.6 4.3 28.7-.5 35.2-12.2 2.8-4.9 5.1-15.2 4.1-18-.4-.9-4.5-1.2-15.9-1.2H325v9.9l9 .3 9 .3-1.8 3.4c-3.5 6.6-14 9.2-21.8 5.5-10.8-5.2-11.1-24.8-.4-30.5 6.5-3.5 15.8-2.1 20.4 3 1.6 1.7 3.1 2.1 8.7 2.1h6.8l-1-2.8c-1.7-4.8-6.7-10-12.5-12.8-7.1-3.5-18.5-4.2-25.4-1.7zM120 287.5v6.5h123v-13H120v6.5z"
          />
        </svg>
      </div>
    )
}

export default LogoWithoutAnimation