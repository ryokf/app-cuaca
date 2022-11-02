function today(date){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date(date);
    return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`
}

$.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather",
    data: {
        'q': 'semarang',
        'APPID': '8dd8a74df072f100f5a98c071d528825',
        'lang': 'id',
        'units': 'metric',
    },
    dataType: "json",
    success: function (response) {
        console.log(response);
        $('#nama-kota').append(response.name);
        $('#tanggal').append(today(response.dt * 1000));
    },
    error: function () {
        $('h1').append('none');
    }
});