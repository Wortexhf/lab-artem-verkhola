const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.forms.productForm;
const cardsContainer = document.getElementById('cardsContainer');
const filterCategory = document.getElementById('filterCategory');
const filterSearch = document.getElementById('filterSearch');
const filterSort = document.getElementById('filterSort');

let products = [];
let editingId = null;

function loadFromStorage() {
    const data = localStorage.getItem('products');
    if (data) {
        products = JSON.parse(data);
    }
    applyFilters();
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

function renderCards(list) {
    cardsContainer.innerHTML = '';
    if (list.length === 0) {
        cardsContainer.innerHTML = '<p class="no-results">Нічого не знайдено</p>';
        return;
    }
    list.forEach(product => {
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
                    <button class="btn-edit" onclick="openEditModal('${product.id}')">✏️</button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">🗑️</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Promises для фільтрації, пошуку та сортування
function filterByCategory(list, category) {
    return new Promise(resolve => {
        if (!category) return resolve(list);
        resolve(list.filter(p => p.category === category));
    });
}

function filterBySearch(list, query) {
    return new Promise(resolve => {
        if (!query) return resolve(list);
        const q = query.toLowerCase();
        resolve(list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        ));
    });
}

function sortProducts(list, sortBy) {
    return new Promise(resolve => {
        const sorted = [...list];
        if (sortBy === 'price_asc') sorted.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price_desc') sorted.sort((a, b) => b.price - a.price);
        else if (sortBy === 'newest') sorted.sort((a, b) => b.id.localeCompare(a.id));
        else if (sortBy === 'oldest') sorted.sort((a, b) => a.id.localeCompare(b.id));
        resolve(sorted);
    });
}

function applyFilters() {
    const category = filterCategory.value;
    const query = filterSearch.value.trim();
    const sortBy = filterSort.value;

    filterByCategory(products, category)
        .then(filtered => filterBySearch(filtered, query))
        .then(searched => sortProducts(searched, sortBy))
        .then(result => renderCards(result));
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    if (confirm(`Do you really want to remove "${product.title}"?`)) {
        products = products.filter(p => p.id !== id);
        saveToStorage();
        applyFilters();
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
        if (idx !== -1) products[idx] = { ...products[idx], ...data };
    } else {
        products.push({ id: generateId(), ...data });
    }

    saveToStorage();
    productForm.reset();
    closeModal();
    applyFilters();
});

modal.addEventListener('click', function(e) {
    if (e.target.dataset.close) closeModal();
});

filterCategory.addEventListener('change', applyFilters);
filterSearch.addEventListener('input', applyFilters);
filterSort.addEventListener('change', applyFilters);

loadFromStorage();
