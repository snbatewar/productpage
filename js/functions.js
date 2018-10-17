'use strict';

const quantity = document.getElementById('cart-quantity');
const orderDetails = document.getElementById('order-details');
const colors = document.querySelectorAll('input[type=radio]');    
const total = document.getElementById('total--input');
const openModal = document.getElementById('open-modal');
const modal = document.getElementById('modal-demo');
const closeModal = document.getElementsByClassName('close-modal')[0]; 
const articleNumber = document.getElementById('article-number');
const errorText = document.getElementById('color-required');
const successText = document.getElementById('success');
var counter = 0;

let options = {};

let oPlaystation = {
    product: {
        Artikelnummer: 15118903,
        Fabrikantcode: 845784935,
        Merk: "Sony",
        Garantie: "2 jaar",
        Garantietype: "Carry-in-garantie"
    },
    algemeen: {
        platform: "Playstation 4",
        Aanbevolen_voor_virtual_reality: "nee",            
    },
    opslagcapaciteit: {
        Totale_opslagcapaciteit: "1000 GB",
        Werkgeheugen_uitbreidbaar: "ja",
        Maximale_capaciteit_geheugenkaart: "8000 GB"
    },
    Bedrade_aansluitingen : {
        Netwerkaansluiting: "ja",
        HDMI_ansluiting: "ja",
        USB_aansluiting: "ja",
        USB_versie: 3.0,
        Aantal_USB_poorten: 2
    }
}

// Get articlenumber from object
articleNumber.innerHTML = oPlaystation.product.Artikelnummer;  

// Empty list
let output = '';

// Get data from Playstation object and insert into custom HTML tree
Object.keys(oPlaystation).forEach(section => {    
    output += '<h3>' + section + '</h3>';        
    output += '<dl class="product-specs">';
    let features = Object.keys(oPlaystation[section]);
    features.forEach(attr => {    
    output += '<div class="product-specs__list-item">';
    output += '<dt class="product-specs__item-title">' + attr + '</dt>';
    output += '<dd class="product-specs__item-spec">' + oPlaystation[section][attr] + '</dd>';
    output += '</div>';    
    });
    output += '</dl>';
});

// Description list
document.getElementById('item-list').innerHTML = output;

// changing price when radio button is selected
colors.forEach(function (inputRadioColor) {
    inputRadioColor.onchange = function () {
        document.getElementById('product-price').innerHTML = this.dataset.price;
        options.color = this.value;
    }
});

// opens Modal when Winkelwagen button is clicked    
openModal.addEventListener('click', function() {
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
}); 

// closing Modal when clicked on close button inside Modal
closeModal.addEventListener('click', function(){
    modal.classList.remove('visible');
});

// increment number in input when plus button is clicked
document.getElementById('btn-increment-total').addEventListener('click', function(){         
    total.value++;
    if(total.value > 0) {
        document.getElementById('btn-decrement-total').disabled = false;
    }               
});

// decrement number in input when minus button is clicked
document.getElementById('btn-decrement-total').addEventListener('click', function(){            
    total.value--;   
    if(total.value <= 0) {                    
            document.getElementById('btn-decrement-total').disabled = true;
    }    
});

// only numbers allows in input of counter
function validate(ev) {
    if (!ev) {
        ev = window.event;
    }
    if (!ev.ctrlKey && ev.key.length === 1 && (isNaN(+ev.key) || ev.key === " ")) {
        return ev.preventDefault();
    }
}