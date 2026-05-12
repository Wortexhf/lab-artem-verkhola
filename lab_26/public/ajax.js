const sendGetRequest = async () => {
    await fetch("http://localhost:3000/product/list")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("GET /product/list response:", data);
            document.getElementById("response").innerHTML = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
            console.error("Error making GET request:", error);
        });
}

const createProductForm = document.forms["createProductForm"];
createProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendPostRequest();
    createProductForm.reset();
});

const collectProductFormData = (formName) => {
    const product = Object.fromEntries(new FormData(formName));
    return JSON.stringify(product);
}

const sendPostRequest = async () => {
    await fetch("http://localhost:3000/product/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: collectProductFormData(createProductForm),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("POST /product/create response:", data);
            document.getElementById("response").innerHTML = JSON.stringify(
                data,
                null,
                2
            );
        })
        .catch((error) => {
            console.error("Error making POST request:", error);
        });
}


const updateProductForm = document.forms["updateProductForm"];
updateProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendPutRequest();
    updateProductForm.reset();
});


const sendPutRequest = async () => {
    const productIdToUpdate = document.getElementById("productId").value;
    const updatedPrice = document.getElementById("newPrice").value;
    
    await fetch(`http://localhost:3000/product/${productIdToUpdate}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: updatedPrice }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(`PUT /product/${productIdToUpdate} response:`, data);
              document.getElementById("response").innerHTML = JSON.stringify(
                  data,
                  null,
                  2
              );
        })
        .catch((error) => {
            console.error("Error making PUT request:", error);
        });

}


const deleteProductForm = document.forms["deleteProductForm"];
deleteProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendDeleteRequest();
    deleteProductForm.reset();
    sendGetRequest(); 
});

const sendDeleteRequest = async () => {
    const productIdToDelete = document.getElementById("productIdToDelete").value;

    await fetch(`http://localhost:3000/product/${productIdToDelete}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(`DELETE /product/${productIdToDelete} response:`, data);
        })
        .catch((error) => {
            console.error("Error making DELETE request:", error);
        });
}


