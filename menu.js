import { menuArray } from '/data.js'

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        addItem(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
})

function getFeedHtml() {
    let feedHtml = ``
    let itemId = 0
    menuArray.forEach(function(item) {
        feedHtml += `
        <div class="menu-items">
            <div class="row">
                <div class="column">
                    <div class="left">
                        <img src="${item.emoji}" alt="" class="menu-pic">
                    </div>
                </div>
                <div class="column">
                    <h3 class='food-name food-name${itemId}'>${item.name}</h3>
                </div>
                <div class="column">
                    <h6 class="ingredients">${item.ingredients}</h6>
                </div>
                <div class="column">
                    <h4 class="price price${itemId}">$${item.price}</h4>
                </div>
                <div class="column add add${itemId}">
                    <i class='bx bx-plus-circle add-btn' data-add="${item.id}"></i>
                </div>
            </div>

        </div> 
    `
        itemId += 1;
    })
    return feedHtml
}

function render() {
    document.getElementById("menu").innerHTML = getFeedHtml()
}

render()

let orderItems = [];


let updateOrder = () => {
    let orderData = ``;
    let count = 0 
    orderItems.forEach(item => {
        orderData +=  `     <div class="item-row" id="item-count${count}" >
                                <div class="item">
                                    <span class="item-name">${item.name}</span>
                                    <span class="remove-btn" data-remove="${count}">Remove</span>
                                </div>
                                <div class="item">
                                    <div class="item-price" id="item-price">${item.price}</div>
                                </div>
                            </div>`
        count++
        
    })

    let orderDiv = document.querySelector('.order-items');
    orderDiv.innerHTML = orderData;
}


let addItem = (mytarget) => {
    let name = document.querySelector('.food-name' + mytarget).innerHTML
    let price = document.querySelector('.price' + mytarget).innerHTML
    
    console.log(name, price)
    orderItems.push({
        name,
        price
    })

    updateOrder();
    cartTotal(orderItems.price)
}


let removeItem = (mytarget) => {
    orderItems.splice(mytarget, 1)

    updateOrder()
    cartTotal(orderItems.price)
}

function cartTotal() {
    let total = 0
    let totalPrice = document.getElementById('total-price')

    for (let i = 0; i < orderItems.length; i++) {
        total += Number(orderItems[i].price.substring(1))
    }
    totalPrice.innerHTML = "Total: $" + total

    if (removeItem) {
        total -= Number(orderItems.price)
    }
    
}

const completeOrder = document.getElementById("complete-order")

completeOrder.addEventListener("click", function() {
        modal.style.display = 'inline'
})


const modalBtn = document.getElementById("modal-btn")
const modalInner = document.getElementById("modal-inner")
const payment = document.getElementById("payment")
const modalClose = document.getElementById("modal-close-btn")

payment.addEventListener("submit", function(e) {
    e.preventDefault()
    const consentFormData = new FormData(payment)
    const name = consentFormData.get("fullName")

    setTimeout(() => {
        modalInner.innerHTML = `
        <h2 class="modal-display-name">Thanks, ${name}! Your order will be arriving soon.</h2>
    `
    modalClose.disabled = false
    }, 500);

})

modalClose.addEventListener('click', function(){
    modal.style.display = 'none'
})

