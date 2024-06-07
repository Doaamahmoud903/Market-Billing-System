var inputName = document.getElementById("inputName");
var inputPrice = document.getElementById("inputPrice");
var inputQuantity = document.getElementById("inputQuantity");
var saleCheck = document.getElementById("saleCheck");
var inputAddPro = document.getElementById("inputAddPro");
var tableBody = document.getElementById("tableBody");
var inputUpdatePro = document.getElementById("inputUpdatePro");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var productContainer;
var currentIndex = -1;

///////////////////////////////////////////////////////////////////
 if(localStorage.getItem('products')){
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProduct();

 }else{
    productContainer = [];
 }

///// Add Product --------------------------------------
function addProduct(){
    var product ={
        name : inputName.value,
        price : Number(inputPrice.value),
        quantity : Number(inputQuantity.value),
        sale : saleCheck.checked
    } 
    productContainer.push(product);
    console.log(productContainer);
    localStorage.setItem('products' , JSON.stringify(productContainer));
    clearProduct();
    displayProduct();
}
inputAddPro.addEventListener('click',(e) => {
    e.preventDefault();
    addProduct();
})

////// Display Product ------------------------------------

function displayProduct(){
    var table=``;
    for(var i=0 ; i<productContainer.length ; i++){
        table += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].quantity}</td>
        <td>${productContainer[i].sale}</td>
        <td><button class="btn btn-warning fw-bold " onclick='updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-danger fw-bold " onclick='deleteProduct(${i})'>Delete</button></td>
        </tr>`;
    }
    tableBody.innerHTML=table;
}

////// Clear Products ------------------------------------
function clearProduct(){
    inputName.value="";
    inputPrice.value="";
    inputQuantity.value="";
    saleCheck.checked=false;

}

////// Delete Product -------------------------------------
function deleteProduct(index){
    productContainer.splice(index , 1);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProduct();

}

////// Update Product -------------------------------------
function updateProduct(index){
    currentIndex = index;
    inputName.value = productContainer[index].name;
    inputPrice.value = productContainer[index].price;
    inputQuantity.value = productContainer[index].quantity;
    saleCheck.checked = productContainer[index].sale;
    inputAddPro.classList.add('d-none');
    inputUpdatePro.classList.remove('d-none');

}

inputUpdatePro.addEventListener('click' ,(e) => {
    e.preventDefault();
    addUpdate();
});

function addUpdate(){
    productContainer[currentIndex].name = inputName.value;
    productContainer[currentIndex].price = Number(inputPrice.value);
    productContainer[currentIndex].quantity = Number(inputQuantity.value);
    productContainer[currentIndex].sale = saleCheck.checked;
    inputUpdatePro.classList.add('d-none');
    inputAddPro.classList.remove('d-none');
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProduct();
    clearProduct();

}

//////search Product -------------------------------------
function searchProduct(term){
   var table =``;
   for(var i=0 ; i<productContainer.length ; i++){
    if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
        table += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].quantity}</td>
        <td>${productContainer[i].sale}</td>
        <td><button class="btn btn-warning" onclick='updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-danger" onclick='deleteProduct(${i})'>Delete</button></td>
        </tr>`;
    }
   }
   tableBody.innerHTML=table;
}

// Validate Product.-------------------------------
function validateName(){
    var regexName =/^[a-z A-Z]{3,}/;
    if (regexName.test(inputName.value) == true){
        alertName.classList.remove("d-block");
        alertName.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertName.classList.remove("d-none");
        alertName.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }

}
//////////////////////////////////////////////////////////////
function validatePrice(){
    var regexPrice =/^[0-9]{2,}/;
    
    if(regexPrice.test(inputPrice.value) == true){
        alertPrice.classList.remove("d-block");
        alertPrice.classList.add("d-none");
        inputAddPro.removeAttribute("disabled");
        inputUpdatePro.removeAttribute("disabled");
        return true;
    }else{
        alertPrice.classList.remove("d-none");
        alertPrice.classList.add("d-block");
        inputAddPro.setAttribute("disabled", "true");
        inputUpdatePro.setAttribute("disabled", "true");
        return false;
    }

}
inputName.addEventListener("blur", validateName);
inputPrice.addEventListener("blur", validatePrice);