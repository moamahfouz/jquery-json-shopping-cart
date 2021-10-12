let products;

function loadData() {

    $.ajax({
        url: 'productsData.json',
        success: function (data) {
            products = data;
            for (let i = 0; i < data.length; i++) {
                $("#allData").append(`
                    <div class="col-md-4 mt-3">
                        <div class="card">
                            <div class="card-header">${data[i].name}</div>
                            <div class="card-body">
                                <img src="${data[i].imgUrl}" class="img-fluid" style="max-height: 100px">
                            </div>
                            <div class="card-footer">
                                <span class="badge badge-secondary">${data[i].price}$</span>

                                <button onclick="addToCart(${data[i].id}, this)" class="btn btn-sm float-right btn-info">Add to cart+</button>

                            </div>
                        </div>
                    </div>
                `);
            }
        },
    })
}

loadData();


let arr = [];

function addToCart(id, ele) {
    arr.push(id);
    localStorage.setItem('userCart', JSON.stringify(arr));

    let items = JSON.parse(localStorage.getItem('userCart'));
    $('#cart').html(items.length);

    $(ele).attr('disabled', 'disabled');

}

function getCartItems(){
    let choosen_products =[];
    let items = JSON.parse(localStorage.getItem('userCart'));
    for(let i=0; i<items.length; i++){        
       choosen_products.push(products.find((product)=> product.id == items[i]));       
    }    
    addCartItemsToDom(choosen_products);
    $('#cart').html(choosen_products.length);
}


function addCartItemsToDom(items){
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        $("#cart_data").append(`
            <div class="col-md-4 mt-3">
                <div class="card">
                    <div class="card-header">${items[i].name}</div>
                    <div class="card-body">
                        <img src="${items[i].imgUrl}" class="img-fluid" style="max-height: 100px">
                    </div>
                    <div class="card-footer">
                        <span class="badge badge-secondary">${items[i].price}$</span>                        
                    </div>
                </div>
            </div>
        `);
        total += items[i].price;
    }
    $('#total').html(total + ' $');
}
















