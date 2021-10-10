


// Draw the chart and set the chart values
function drawChart(results) {
  console.log("I am here", results);

  var arr = [];
  arr[0] = ['Per Categorie', 'Expense'];
  for (var i = 1; i <= results.length; i++) {
    arr[i] = [results[i - 1]['category_name'], parseInt(results[i - 1]['total_expenses'])];
    console.log(results[i - 1]['category_name'], results[i - 1]['total_expenses']);

  }
  var data = google.visualization.arrayToDataTable(arr);


  // Optional; add a title and set the width and height of the chart
  var options = { 'title': 'My Average Day', 'width': 650, 'height': 600 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

// googlePieChart();


var $amount = $('#amount');
var $category_id = $('#category_id');
var $category_name = $('#category_name');
var $user_token = localStorage.getItem('id');
var $firstname_content = localStorage.getItem('firstname');
var $lastname_content = localStorage.getItem('lastname');
var $firstlastname = $('#firstlastname');
$firstlastname.text($firstname_content + '' + $lastname_content);

let array = [];


getAllExpenses();
getAllCategories();
getChartData();

function clear() {
  document.getElementById("expensesform").reset();
}
function clear1() {
  document.getElementById("categoriesform").reset();
}
function rowView(id, category_name, amount, date_of_creation) {
  let tablebody = document.getElementById("tablebody");
  let tablerow = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = category_name;
  // td1.id = "first_td";
  let td2 = document.createElement("td");
  td2.textContent = amount + "$";
  let td3 = document.createElement("td");
  td3.textContent = date_of_creation;
  let td4 = document.createElement("td");
  let bt1 = document.createElement("button");
  bt1.className = "btn btn-danger";
  bt1.textContent = "DELETE";
  bt1.id = "deletebtn";
  bt1.dataset.id = id
  td4.appendChild(bt1);

  tablerow.appendChild(td1);
  tablerow.appendChild(td2);
  tablerow.appendChild(td3);
  tablerow.appendChild(td4);

  tablebody.appendChild(tablerow);




}
function optionView(id, category_name) {
  let selectcat = document.getElementById("category_id");
  let option = document.createElement("option");
  option.value = id;
  option.textContent = category_name;
  selectcat.appendChild(option);
}
$('#addexpense').on('click', createExpense);
$('#addcategory').on('click', createCategory);
$('#logout').on('click', logOut);

$(document.body).on('click', '#deletebtn', function () {
  var $expense_id = $(this).data("id");
  var rem = $(this).closest('tr').remove();
  removeExpense($expense_id);
  alert("Expense Has Been Deleted");
  console.log("CLICKED");

});


async function postData(forminfo) {
  try {
    result = await $.ajax({
      type: "POST",
      url: "http://localhost:8080/expensestrackerapi/createexpense.php",
      data: forminfo,
      dataType: "json",
      contentType: "application/json",

    })
  }
  catch (error) {
    console.log(error);
  }
}
async function postCategory(catinfo) {
  try {
    result = await $.ajax({
      type: "POST",
      url: "http://localhost:8080/expensestrackerapi/createcategory.php",
      data: catinfo,
      dataType: "json",
      contentType: "application/json",

    })
  }
  catch (error) {
    console.log(error);
  }
}
async function fetchExpenses() {
  const response = await fetch('http://localhost:8080/expensestrackerapi/selectexpensesforuser.php?user_token=' + $user_token);
  if (!response.ok) {
    const message = "An error Occured";
    throw new Error(message);
  }
  const results = await response.json();
  return results;
}
async function fetchCategories() {
  const response = await fetch('http://localhost:8080/expensestrackerapi/selectcategoriesforuser.php?user_token=' + $user_token);
  if (!response.ok) {
    const message = "An error Occured";
    throw new Error(message);
  }
  const results = await response.json();
  return results;
}
async function fetchTotalExpensesPerCategorie() {
  const response = await fetch('http://localhost:8080/expensestrackerapi/selectgroupedcategoriesforuser.php?user_token=' + $user_token);
  if (!response.ok) {
    const message = "An error Occured";
    throw new Error(message);
  }
  const results = await response.json();
  return results;

}
async function deleteExpense($expense_id) {
  const response = await fetch('http://localhost:8080/expensestrackerapi/deleteexpense.php?expense_id=' + $expense_id);
  if (!response.ok) {
    const message = "An error Occured";
    throw new Error(message);
  }
  const results = await response.json();
  return results;
}
function createExpense() {
  var info = {
    amount: $amount.val(),
    category_id: $category_id.val(),
    user_id: $user_token,
  };
  data = JSON.stringify(info);
  postData(data).then(results => {
    alert("Expense has been added");
    clear();
  })

}
function createCategory() {
  var info = {
    name: $category_name.val(),
    user_id: $user_token
  };
  data = JSON.stringify(info);
  postCategory(data).then(results => {
    alert("Category has been added");
    clear1();
  }).catch(error => {
    console.log(error.message);
  })

}
function getAllExpenses() {
  fetchExpenses().then(results => {
    console.log(results);
    for (i = 0; i < results.length; i++) {
      rowView(results[i]['id'], results[i]['category_name'], results[i]['amount'], results[i]['date_of_creation']);
    }
  }).catch(error => {
    console.log(error.message);
  })
}
function getAllCategories() {
  fetchCategories().then(results => {
    console.log(results);
    for (i = 0; i < results.length; i++) {
      optionView(results[i]['id'], results[i]['name']);
    }
  })
}
function getChartData() {

  fetchTotalExpensesPerCategorie().then(results => {
    // console.log("First function",results);
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function () {

      drawChart(results);

    });

  });

}

function removeExpense($expense_id) {
  deleteExpense($expense_id).then(results => {
    console.log(results);
  })
}
function logOut() {
  localStorage.clear();
  window.location.href = './login.html';
}








