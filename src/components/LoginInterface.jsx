import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ForgotUsernamePage from './ForgotUsernamePage';

//const city = ("New York");
const API_Key = ('6170fae6025247da95f213929251106');

function LoginInterface() {

    const [weather, setWeather] = useState(null);
    const [pageType, setPageType] = useState('login');
    
    useEffect(() => { 
        async function weatherFetch (lat, lon) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${lat},q=${lon}`;

            try {
                const res = await fetch (url);
                const data = await res.json();

                setWeather({
                    temp_f: data.current.temp_f,
                    city: data.location.name,
                    localtime: data.location.localtime
                })
            
            } catch (e) {
                console.error('Error fetching weather:', e);
            }
        }
        
        function fallbackToNewYork() {
            console.log("Falling back to NY weather.");
            weatherFetch(40.71, -74.01); 
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                weatherFetch(lat, lon);
              },
              (e) => {
                console.warn("Geolocation error:", e.message, "! Here is weather from New York!");
                fallbackToNewYork();
              }
            );
        }

    }, []);

    return (
        <div className="login-interface">
            
            {weather && (
                <div className="weather-data">
                    <h2>Weather  in {city}</h2>
                    {new Date(weather.localtime).toLocaleDateString('en-US', { weekday: 'long' })}: {weather.temp_f}°F
                </div>
            )}
                
            {pageType === 'login' && 
                (<LoginPage onForgotPassword={() => setPageType('forgotPassword')} onForgotUsername={() => setPageType('forgotUsername')}/>)
            }
           
            {pageType === 'forgotPassword' && 
                (<ForgotPasswordPage onBack={() => setPageType('login')} />)
           }
           
            {pageType === 'forgotUsername' && 
                (<ForgotUsernamePage onBack={() => setPageType('login')} />)
           }
        
        </div>
    )

}

export default LoginInterface;
