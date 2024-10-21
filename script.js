function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
}

async function fetchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
      const data = await response.json();
      populateTable(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function populateTable(data) {
  const tableBody = document.getElementById('dataTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Clear any existing rows

  data.forEach(item => {
      const row = document.createElement('tr');

      const cellId = document.createElement('td');
      cellId.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
      row.appendChild(cellId);

      const cellSpeed = document.createElement('td');
      cellSpeed.textContent = item.speed || '--';
      row.appendChild(cellSpeed);

      const cellResult = document.createElement('td');
      cellResult.textContent = item.result || '--';
      row.appendChild(cellResult);

      const cellDatetime = document.createElement('td');
      cellDatetime.textContent = item.datetime || '--';
      row.appendChild(cellDatetime);

      tableBody.appendChild(row);
  });
}

// Fetch data on page load
fetchData();