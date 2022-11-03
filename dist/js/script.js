function convert_suhu(suhu){
    return (9/5 * suhu) + 32;
}

function cuaca(cuaca){
    if(cuaca === 'awan pecah' || cuaca === 'awan tersebar' || cuaca === 'langit cerah'){
        return 'cerah';
    } else if(cuaca === 'sedikit berawan'){
        return 'cerah berawan';
    } else if(cuaca === 'awan mendung'){
        return 'berawan';
    } else if(cuaca === 'hujan sedang' || cuaca === 'hujan ringan' || cuaca === 'hujan rintik-rintik'){
        return 'hujan ringan';
    }else if(cuaca === 'salju ringan'){
        return cuaca;
    }
}

function today(date){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date(date);
    return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`
}

$('#tombol-cari').on('click', function(){
    $('#nama-kota').html('');
    $('#tanggal').html('');
    $('#suhu-celcius').html('');
    $('#suhu-fahrenheit').html('');
    $('#cuaca').html('');

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
            'q': `${$('#input-cari').val()}`,
            // 'q': 'semarang',
            'APPID': '8dd8a74df072f100f5a98c071d528825',
            'lang': 'id',
            'units': 'metric',
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            $('#nama-kota').append(response.name);
            $('#tanggal').append(today(response.dt * 1000));
            $('#suhu-celcius').append(Math.round(response.main.temp) + '<span><sup>o</sup>C</span>/');
            $('#suhu-fahrenheit').append(Math.round(convert_suhu(response.main.temp)) + '<span><sup>o</sup>F</span>');
            $('#cuaca').append(cuaca(response.weather[0].description));
            $('img').attr('src', `dist/img/${cuaca(response.weather[0].description)}.png`);
            $('#kelembapan').append(response.main.humidity + '%');
            $('#tekanan').append(response.main.pressure + 'pHa');
            $('#angin').append(response.wind.speed + 'm/s');

            $('#input-cari').val('');
        },
        error: function () {
            $('h1').append('none');
        }
    });
})

