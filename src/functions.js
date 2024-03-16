function showData() {
    const input_location = document.querySelector('#location').value;
    const apiKey = "671bc02b4e0842a696b101822241503";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input_location}`;

    if (input_location !== '') {
        fetch(apiUrl, { mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was a problem with network response');
                }
                return response.json();
            })
            .then(response => {
                populateInfo(response); // Call the populateInfo function here
            })
            .catch(error => {
                console.error("There was a problem fetching weather data");
            })
    }
}


function populateInfo(data) {
    document.querySelector('.lower-section').classList.remove('hidden');
    const title = document.querySelector('#title');
    const local_time = document.querySelector('#localTime');
    const temp_c = document.querySelector('#temp_c');
    const illustration = document.querySelector('#illustration');
    const condition = document.querySelector('#condition');
    const humidity = document.querySelector('#humidity');
    const wind_kph = document.querySelector('#wind_kph');

    
    let wind_dir = data.current.wind_dir;

    if(wind_dir.startsWith('E'))
        wind_dir = '→';

    if(wind_dir.startsWith("W"))
        wind_dir = '←';

    if(wind_dir.startsWith("N"))
        wind_dir = '↑';

    if(wind_dir.startsWith("S"))
        wind_dir = '↓';


    title.innerHTML = data.location.name + ', ' + data.location.region;
    local_time.innerHTML = 'Local-time: ' + data.location.localtime;
    temp_c.innerHTML = data.current.temp_c + '°C';
    illustration.src = 'http:' + data.current.condition.icon;
    condition.innerHTML = data.current.condition.text;
    humidity.innerHTML = 'Humidity: ' + data.current.humidity + '%';
    wind_kph.innerHTML = 'Wind: ' + data.current.wind_kph + 'km/h ' + wind_dir;
}


document.getElementById('btnShow').addEventListener('click', showData);

export default showData;