import axios from "axios";

export type ProductType = {
  id: number;
  amount: number;
  description: string;
  last_entry: string;
  last_outing: string;
  min_amount: number;
  name: string;
};

export async function getAllProducts(
  page: number = 1
): Promise<
  | {
      products: ProductType[];
      meta: { current_page: number; total_pages: number; total_items: number };
    }
  | undefined
> {
  try {
    const token = localStorage.getItem("iventory.control.token");
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
