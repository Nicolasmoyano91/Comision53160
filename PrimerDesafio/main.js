class ProductManager {
  constructor() {
    this.products = [];
    this.primerId = 1;
  }

  addProduct(product) {
    const esValido =
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock;
    const esDuplicado = this.products.some((p) => p.code === product.code);

    if (esValido) {
      if (esDuplicado) {
        console.log("Ya existe un producto con este código");
      } else {
        product.id = this.primerId++;
        this.products.push(product);
        console.log("Producto agregado correctamente");
      }
    } else {
      console.log("Todos los campos son obligatorios");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById() {
    const product = this.products.find((p) => p.id === id);
    return product ? product : (console.log("Producto no encontrado"), null);
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción Producto 1",
  price: 50.0,
  thumbnail: "ruta/imagen1.jpg",
  code: "P001",
  stock: 50,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción Producto 2",
  price: 15.0,
  thumbnail: "ruta/imagen2.jpg",
  code: "P002",
  stock: 45,
});

const productos = productManager.getProducts();
console.log(productos);

const productoId1 = productManager.getProductById(1);
