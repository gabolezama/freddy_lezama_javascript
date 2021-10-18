function DrawTheChart(dataArray1, dataArray2) {

    //Creo los contenedores para los Charts
    const chartDiv = document.createElement('div')
    chartDiv.id = 'chartDiv'
    chartDiv.classList.add("chart");
    document.body.appendChild(chartDiv)

    const chartDiv2 = document.createElement('div')
    chartDiv2.id = 'chartDiv2'
    chartDiv2.classList.add("chart2");
    document.body.appendChild(chartDiv2)

    //Creo el canvas necesario para renderizar
    $('#chartDiv').html(` <canvas id="myChart"></canvas> `)
    $('#chartDiv2').html(` <canvas id="myChart2" class="segundoChart"></canvas>`)
    $('#chartDiv2').append(` <p id="cambio"> Clicando en Chart cambia de Gráfico </p>`)
    
    //Creo evento para poder cabiar de Gráfico
    $('#myChart').click( () =>{
        $('#chartDiv').fadeOut(500)
        $('#chartDiv2').fadeIn(500)
    })
    $('#myChart2').click( () =>{
        $('#chartDiv2').fadeOut(500)
        $('#chartDiv').fadeIn(500)
    })

    //Configuración para el primer Chart
    const data = {
        labels: [
            'DNI',
            'Pasaporte',
            'Cedula',
        ],
        datasets: [{
            label: 'Tipo de Documento(%) ',
            data: dataArray1,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
            ]
        }]
    };

    const config = {
        type: 'polarArea',
        data: data,
        options: {}
    };

    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    //Configuración para el segundo Chart
    const labels = ['Edad', 'Normal', 'Urgente'];
    const data2 = {
        labels: labels,
        datasets: [{
            label: 'Comparativa',
            data: dataArray2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 1
        }]
    };

    const config2 = {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    let myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );
    
    //Animacion de los Charts
    $('#chartDiv').fadeIn(1000).delay(3000).fadeOut(1000)
    $('#chartDiv2').delay(5000).fadeIn(1000)
}
