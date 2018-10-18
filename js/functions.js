'use strict';

const quantity = document.getElementById('cart-quantity');
const orderDetails = document.getElementById('order-details');
const colors = document.querySelectorAll('input[type=radio]');    
const total = document.getElementById('total--input');
const modal = document.getElementById('modal-demo');
const articleNumber = document.getElementById('article-number');
const errorText = document.getElementById('color-required');
const successText = document.getElementById('success');
let counter = 0;
let options = {};

// changing price when radio button is selected
function checkPrice(){
    colors.forEach(function (inputRadioColor) {
        inputRadioColor.onchange = function () {
            document.getElementById('product-price').innerHTML = this.dataset.price;
            options.color = this.value;
        }
    });
}

// increment number in input when plus button is clicked
function increaseBasket(){
    total.value++;
    if(total.value > 0) {
        document.getElementById('btn-decrement-total').disabled = false;
    }
}

// decrement number in input when minus button is clicked
function decreaseBasket(){
    total.value--;   
    if(total.value <= 0) {                    
        document.getElementById('btn-decrement-total').disabled = true;
    }
}

// only numbers allows in input of counter
function validate(ev) {
    if(!ev) {
        ev = window.event;
    }
    if(!ev.ctrlKey && ev.key.length === 1 && (isNaN(+ev.key) || ev.key === " ")) {
        return ev.preventDefault();
    }
}

// opens Modal when Winkelwagen button is clicked    
function openModal(){
    modal.classList.toggle('visible');  
    if(options.color == null) {
        successText.style.display = "none";
        errorText.style.display = "block";
    }
    else {       
        successText.style.display = "block";
        errorText.style.display = "none";
        document.getElementById('chosen-color').innerText = !options.color ? '' : '(' + options.color + ')';            
        options.quantity = options.quantity ? options.quantity + parseInt(total.value) : parseInt(total.value);    
        quantity.innerText = options.quantity;  
    }
}

function closeModal(){
    modal.classList.remove('visible');
}

function renderProductProperties (data) {    
    let html = '';    
    for (let section in data) {
        let props = data[section];
        html += "<h3>" + section + "</h3>";
        html += '<dl class="product-specs">';
        for (let prop in props ) {            
            html += '<div class="product-specs__list-item">';
            html += '<dt class="product-specs__item-title">' + prop + '</dt>';
            html += '<dd class="product-specs__item-spec">' + data[section][prop] + '</dd>';
            html += '</div>';    
        }
        html += '</dl>';
    }
    document.getElementById("item-list").innerHTML = html;   
}

function xhr(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                throw err;
            }
            callback(data);
        }
    }; 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
 
xhr('/js/properties.json', function (data) {
    articleNumber.innerHTML = data.product.Artikelnummer;     
    renderProductProperties(data);
});


 