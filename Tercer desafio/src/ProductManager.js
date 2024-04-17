import fs from "fs";

const STORAGE = "C:Users\nico_OneDriveDesktopBackEndTercer desafiosrc";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.primerId = 1;
  }

  async addProduct(product) {
    const esValido =
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock;
    const esDuplicado = this.products.some((p) => p.code === product.code);

    if (esValido && !esDuplicado) {
      product.id = this.primerId++;
      this.products.push(product);

      const data = JSON.stringify(this.products, null, 2);

      try {
        await fs.promises.writeFile(STORAGE, data);
        console.log("Producto agregado ");
      } catch (error) {
        console.error("Los cambios no se guardaron", error);
      }
    } else {
      console.log("el código de producto ya existe");
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(STORAGE, "utf-8");
      const products = JSON.parse(data);
      this.products = products;
      return this.products;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      console.log("Producto encontrado:");
      console.log(product);
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.products[productIndex] = updatedProduct;

      const data = JSON.stringify(this.products, null, 2);

      try {
        await fs.promises.writeFile(STORAGE, data);
        console.log("Producto actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const updatedProducts = this.products.filter(
      (product) => product.id !== id
    );

    if (updatedProducts.length < this.products.length) {
      const updatedData = JSON.stringify(updatedProducts, null, 2);

      try {
        await fs.promises.writeFile(STORAGE, updatedData);
        console.log("Producto eliminado ");
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(STORAGE);
      console.log("Archivo eliminado ");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }
}

async function testAddProducts() {
  const productManager = new ProductManager();

  await productManager.addProduct({
    title: "producto 1",
    description: "descripción producto 1",
    price: 50,
    thumbnail: "Sin imagen",
    code: "C001",
    stock: 50,
  });

  await productManager.addProduct({
    title: "producto 2",
    description: "descripción producto 2",
    price: 400,
    thumbnail: "Sin imagen",
    code: "C002",
    stock: 45,
  });

  await productManager.addProduct({
    title: "producto 3",
    description: "descripción producto 3",
    price: 300,
    thumbnail: "Sin imagen",
    code: "C003",
    stock: 25,
  });
}

async function testGetProducts() {
  const productManager = new ProductManager();
  const products = await productManager.getProducts();
  console.log(products);
}

async function testGetProductById() {
  const productManager = new ProductManager();
  try {
    await productManager.getProducts();
    await productManager.getProductById(3);
  } catch (error) {
    console.error(error.message);
  }
}

async function testUpdateProduct() {
  const productManager = new ProductManager();
  try {
    await productManager.getProducts();

    await productManager.updateProduct(1, {
      title: "producto 1",
      price: 650,
    });
    console.log("Producto actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
  }
}

async function testDeleteProduct() {
  const productManager = new ProductManager();
  try {
    await productManager.getProducts();
    await productManager.deleteProduct(2);
  } catch (error) {
    console.error(error.message);
  }
}

async function testDeleteFile() {
  const productManager = new ProductManager();
  await productManager.deleteFile();
}
