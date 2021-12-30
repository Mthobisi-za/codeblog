function makeGraph(days, numD) {
    const labels = days
    const data = {
        labels: labels,
        datasets: [{
            label: 'Website Views',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            data: numD,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    config
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

function makechenges(arg) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var emptyMonths = [];
    var dD = [];
    arg.forEach(element => {
        var month = months[(element.actual_date.split('/'))[1] - 1];
        var checker = emptyMonths.indexOf(month);
        if (checker !== -1) {
            dD[checker] += element.page_view;
        } else if (month !== undefined) {
            emptyMonths.push(month);
            dD.push(element.page_view);
        }
    });
    makeGraph(emptyMonths, dD);
}
(async() => {
    var data = await axios.get('/stats');
    makechenges(data.data);
})();