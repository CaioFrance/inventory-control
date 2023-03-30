import axios from "axios";
import { Supplier } from "./suppliersService";

export type ProductType = {
  id: number;
  amount: number;
  description: string;
  last_entry: string;
  last_outing: string;
  min_amount: number;
  name: string;
  supplier?: Supplier;
};

export type AddOrUpdateProduct = {
  id?: number;
  amount: number;
  description: string;
  last_entry: string;
  last_outing: string;
  min_amount: number;
  name: string;
  unit_price: number;
  supplier_id: number;
};

export async function getAllProducts(page: number = 1): Promise<
  | {
      products: ProductType[];
      meta: { current_page: number; total_pages: number; total_items: number };
    }
  | undefined
> {
  try {
    const token = localStorage.getItem("inventory.control.token");
    const {
      data,
    }: {
      data: {
        products: ProductType[];
        meta: {
          current_page: number;
          total_pages: number;
          total_items: number;
        };
      };
    } = await axios.get(`/api/v1/products?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function createProduct(addProduct: AddOrUpdateProduct) {
  const token = localStorage.getItem("inventory.control.token");

  try {
    await axios.post(
      "/api/v1/products",
      { product: addProduct },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export async function deleteProduct(productId: number) {
  const token = localStorage.getItem("inventory.control.token");

  try {
    await axios.delete(`/api/v1/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function editProduct(
  product: AddOrUpdateProduct,
  productId: number | undefined
) {
  const token = localStorage.getItem("inventory.control.token");

  try {
    await axios.put(
      `/api/v1/products/${productId}`,
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error(err);
  }
}
