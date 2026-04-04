const products = [];

const modal = document.getElementById('myModal');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function generateUniqueId() {
    return 'id' + new Date().getTime() + Math.floor(Math.random() * 1000);
}

function saveProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = Number(document.getElementById('price').value);
    const discountPercentage = Number(document.getElementById('discountPercentage').value);
    const stock = Number(document.getElementById('stock').value);
    const brand = document.getElementById('brand').value;
    const category = document.getElementById('category').value;
    const thumbnail = document.getElementById('thumbnail').value;

    const product = {
        id: generateUniqueId(),
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        category,
        thumbnail
    };

    products.push(product);
    console.log('products:', products);

    document.forms.productForm.reset();
    closeModal();
}

const productForm = document.forms.productForm;

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    saveProduct();
});

modal.addEventListener('click', function(event) {
    if (event.target.dataset.close) {
        closeModal();
    }
});
