
//`https://www.prevision-meteo.ch/services/json/lat=${latitude}lng=${longitude}` 


const form = document.getElementById("meteo-form")
const input = document.getElementById("ville")
const result = document.getElementById("result-meteo")



form.addEventListener("submit", (event) => {
    event.preventDefault();

    const ville = input.value
    getMeteo(ville)
    result.innerHTML = `
  <p class="text-gray-400 text-center mt-4 animate-pulse">Chargement en cours...</p>
`;

})

// pour recuperer la meteo

function getMeteo(ville) {
    fetch(`https://www.prevision-meteo.ch/services/json/${ville}`)

        .then((response) => {

            if (!response.ok) {
                throw new Error("error")
            }
            return response.json()
        })



        .then((data) => {

            afficheMeteo(data)


        })

        .catch(() => {
            console.error("pas bon")

        })

}



function afficheMeteo(data) {

    const temp = data.current_condition.tmp;
    const city = data.city_info.name;
    const country = data.city_info.country;
    const img = data.current_condition.icon_big;
    const condition = data.current_condition.condition;
    const humidity = data.current_condition.humidity;
    const wind = data.current_condition.wnd_spd;
    const latitude = data.city_info.latitude;
    const longitude = data.city_info.longitude;

    result.innerHTML = `
    <div class="flex justify-center items-center gap-4 mb-4">
      <img src="${img}" alt="${condition}" class="w-20 h-20">
      <div class="text-left">
        <h2 class="text-xl font-bold text-blue-300">${city}, ${country}</h2>
        <p class="text-4xl font-semibold text-white">${temp}°C</p>
        <p class="text-gray-400">${condition}</p>
      </div>
    </div>

    <div class="text-sm text-gray-400 text-center">
      Humidité : ${humidity}% &nbsp; • &nbsp; Vent : ${wind} km/h <br />
      Latitude : ${latitude} &nbsp; • &nbsp; Longitude : ${longitude}
    </div>
  `;
}






if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
} else {
    alert("pas pris en charge")
}

function success(position) {
    const latitude =
        position.coords.latitude

    const longitude =
        position.coords.longitude

    console.log(latitude)
    console.log(longitude)


    fetch(`https://www.prevision-meteo.ch/services/json/lat=${latitude}&lng=${longitude}`)

        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json()
        })

        .then((data) => {
            console.log(data)
            afficheMeteo(data)


        })

        .catch(() => {
            result.innerHTML = `
            <p class="text-red-500 text-center mt-4">
             Ville introuvable. Vérifie l'orthographe ou essaye une autre.
             </p>
            `;
        });







}

function error() {
    alert("impossible de recup la loc")
}