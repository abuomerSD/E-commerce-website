const navLink = document.querySelector('#dashboard-nav-link');    
const ctx = document.getElementById('sales-chart');


let monthsObj = {
    1:'Jan',
    2:'Feb',
    3:'Mar',
    4:'Apr',
    5:'May',
    6:'Jun',
    7:'Jul',
    8:'Aug',
    9:'Sep',
    10:'Oct',
    11:'Nov',
    12:'Dec',
}

async function getAllSalesInvoices() {
    let salesInvoices;
    try {
    const response = await fetch('/admin/get-all-sales-invoices', {
        method: 'GET',
    });
    salesInvoices = await response.json();
    console.log(salesInvoices);
} catch (error) {
    console.log(error);
}
return salesInvoices;
}

async function getinvoices() {
    const invoices = await getAllSalesInvoices()
    console.log(invoices);

    invoices.forEach(invoice => {
        const date = new Date(invoice.createdAt);
        const month = date.getMonth() + 1;
        


        console.log(monthsObj[`${month}`]);
        console.log(date.getMonth() + 1);
    });
}

getinvoices();

new Chart(ctx, {
type: 'line',
data: {
    labels: ['Jan', 'Feb'],
    datasets: [{
    label: '# of Votes',
    data: monthsObj,
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});

window.onload = () => {
    navLink.classList.add('active');
}