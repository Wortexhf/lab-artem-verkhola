const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.forms.productForm;
const cardsContainer = document.getElementById('cardsContainer');

let products = [];
let editingId = null;

function loadFromStorage() {
    const data = localStorage.getItem('products');
    if (data) {
        products = JSON.parse(data);
        products.forEach(renderCard);
    }
}

function saveToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function generateId() {
    return 'id' + Date.now() + Math.floor(Math.random() * 1000);
}

function openModal() {
    editingId = null;
    modalTitle.textContent = 'Create product';
    productForm.reset();
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    editingId = null;
}

function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    editingId = id;
    modalTitle.textContent = 'Edit product';
    document.getElementById('title').value = product.title;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('discountPercentage').value = product.discountPercentage;
    document.getElementById('stock').value = product.stock;
    document.getElementById('brand').value = product.brand;
    document.getElementById('category').value = product.category;
    document.getElementById('thumbnail').value = product.thumbnail;
    modal.style.display = 'flex';
}

function renderCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = product.id;
    card.innerHTML = `
        <div class="card-img-wrap">
            <img src="${product.thumbnail}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/200x140'">
            <span class="badge">${product.discountPercentage}%</span>
            <span class="category-tag">${product.category}</span>
        </div>
        <div class="card-body">
            <div class="card-title">${product.title}</div>
            <div class="card-desc">${product.description}</div>
        </div>
        <div class="card-footer">
            <span class="price">${product.price} $</span>
            <div class="card-actions">
                <button class="btn-edit" title="Edit" onclick="openEditModal('${product.id}')">✏️</button>
                <button class="btn-delete" title="Delete" onclick="deleteProduct('${product.id}')">🗑️</button>
            </div>
        </div>
    `;
    cardsContainer.appendChild(card);
}

function updateCard(product) {
    const card = cardsContainer.querySelector(`[data-id="${product.id}"]`);
    if (!card) return;
    card.querySelector('img').src = product.thumbnail;
    card.querySelector('.badge').textContent = product.discountPercentage + '%';
    card.querySelector('.category-tag').textContent = product.category;
    card.querySelector('.card-title').textContent = product.title;
    card.querySelector('.card-desc').textContent = product.description;
    card.querySelector('.price').textContent = product.price + ' $';
    card.querySelector('.btn-edit').setAttribute('onclick', `openEditModal('${product.id}')`);
    card.querySelector('.btn-delete').setAttribute('onclick', `deleteProduct('${product.id}')`);
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    if (confirm(`Do you really want to remove ${product.title} element?`)) {
        products = products.filter(p => p.id !== id);
        saveToStorage();
        const card = cardsContainer.querySelector(`[data-id="${id}"]`);
        if (card) card.remove();
    }
}

productForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
        discountPercentage: Number(document.getElementById('discountPercentage').value),
        stock: Number(document.getElementById('stock').value),
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        thumbnail: document.getElementById('thumbnail').value,
    };

    if (editingId) {
        const idx = products.findIndex(p => p.id === editingId);
        if (idx !== -1) {
            products[idx] = { ...products[idx], ...data };
            updateCard(products[idx]);
        }
    } else {
        const product = { id: generateId(), ...data };
        products.push(product);
        renderCard(product);
    }

    saveToStorage();
    productForm.reset();
    closeModal();
});

modal.addEventListener('click', function(e) {
    if (e.target.dataset.close) closeModal();
});

loadFromStorage();
