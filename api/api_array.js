const Product = function Product (product, id){
    this.title = product.title;
    this.price = parseFloat(product.price);
    this.thumbnail = product.thumbnail;
    this.id = id;
}




module.exports.ApiMethods = class ApiMethods {
    constructor (){
        this.products = [];
        //Productos a modo de ejemplo
        this.products.push(new Product({title: "Titulo1", price: 100.58, thumbnail: "http://www.google.com"}, 1));
        this.products.push(new Product({title: "Titulo2", price: 200.58, thumbnail: "http://www.google.com"}, 2));
        this.products.push(new Product({title: "Titulo3", price: 300.58, thumbnail: "http://www.google.com"}, 3));
        this.products.push(new Product({title: "Titulo4", price: 400.58, thumbnail: "http://www.google.com"}, 4));
        this.products.push(new Product({title: "Titulo5", price: 500.58, thumbnail: "http://www.google.com"}, 5));
        this.products.push(new Product({title: "Titulo6", price: 600.58, thumbnail: "http://www.google.com"}, 6));
        this.maxId = this.products.length;
    }

    getProducts(){
        if(this.products.length !== 0){
            return ({status: 200, content: this.products});
        } else {
            return ({status: 200, content: {error: `No hay productos a mostrar`}});
        }
    }

    getProductById(id){
        if (!isNaN(parseInt(id))){
            const selectedProduct = this.products.find(product => product.id === parseInt(id));
            return selectedProduct != undefined?{status: 200, content: selectedProduct}:{status: 200, content: {error:`Producto no encontrado`}};
        } else {
            return ({status: 400, content: {error: `Error en la petición`}})
        }
    }

    delProductById(id){
        if (!isNaN(parseInt(id))){
            if(this.products.findIndex(prod => prod.id===parseInt(id)) != -1){
                this.products = this.products.filter(prod => prod.id !== parseInt(id));
                return {status: 200, content: {success: `Producto con ID: ${id} borrado`}};
            } else {
                return {status: 200, content: {error:`Producto no encontrado`}};
            }
        } else {
            return ({status: 400, content: {error: `Error en la petición`}});
        }
    }

    addNewProduct(product){
        if(product.title && !isNaN(parseFloat(product.price)) && product.thumbnail){
            const newProduct = new Product(product,++this.maxId);
            this.products.push(newProduct);
            return {status: 200, content: newProduct};
        } else {
            return {status: 400, content: {error: `Error en la petición`}};
        }
    }

    updateProduct(id, product){
        if (!isNaN(parseInt(id)) && product.title && !isNaN(parseFloat(product.price)) && product.thumbnail){
            let index = this.products.findIndex(prod => prod.id === parseInt(id));
            if (index !== -1){
                this.products[index].title = product.title;
                this.products[index].price = parseFloat(product.price);
                this.products[index].thumbnail = product.thumbnail;
                return ({status: 200, content: {success: `Producto actualizado`}});
            } else {
                return ({status: 200, content: {error: `Producto no encontrado`}});
            }
        } else {
            return ({status: 400, content: {error: `Error en la petición.`}});
        }
    }
}