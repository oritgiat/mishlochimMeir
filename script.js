let total = 0;

function addProduct() {
  const nameInput = document.getElementById("product");
  const priceInput = document.getElementById("price");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(price)) {
    alert("Please enter valid product and price");
    return;
  }

  const table = document.querySelector("#table tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td>${price.toFixed(2)}</td>
    <td>
      <button onclick="editRow(this)">edit</button>
      <button onclick="removeProduct(this)">remove</button>
    </td>
  `;

  table.appendChild(row);
  total += price;
  updateTotal();

  nameInput.value = "";
  priceInput.value = "";
}

function removeProduct(button) {
  const row = button.parentNode.parentNode;
  const price = parseFloat(row.cells[1].innerText);
  row.remove();
  total -= price;
  updateTotal();
}

function editRow(button) {
  const row = button.parentNode.parentNode;
  const nameCell = row.cells[0];
  const priceCell = row.cells[1];

  const currentName = nameCell.innerText;
  const currentPrice = priceCell.innerText;

  nameCell.innerHTML = `<input type="text" value="${currentName}">`;
  priceCell.innerHTML = `<input type="number" value="${currentPrice}" min="0">`;

  button.innerText = "save";
  button.onclick = () => saveRow(row);
}

function saveRow(row) {
  const nameInput = row.cells[0].querySelector("input").value.trim();
  const priceInput = parseFloat(row.cells[1].querySelector("input").value);

  if (!nameInput || isNaN(priceInput)) {
    alert("Please enter valid values");
    return;
  }

  total -= parseFloat(row.cells[1].innerText);
  total += priceInput;

  row.cells[0].innerText = nameInput;
  row.cells[1].innerText = priceInput.toFixed(2);

  const editButton = row.cells[2].querySelector("button");
  editButton.innerText = "עריכה";
  editButton.onclick = () => editRow(editButton);

  updateTotal();
}

function updateTotal() {
  document.getElementById("total").innerText = `Total: ${total.toFixed(2)}`;
}
