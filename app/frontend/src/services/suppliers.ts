import axios from "axios";

export type Supplier = {
  id: number;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  state: string;
};

export type AddSupplier = {
  name: string;
  address: string;
  postal_code: string;
  city: string;
  state: string;
};

export async function getAllSuppliers(page = 1): Promise<
  | {
      suppliers: Supplier[];
      meta: {
        current_page: number;
        total_items: number;
        total_pages: number;
      };
    }
  | undefined
> {
  const token = localStorage.getItem("iventory.control.token");

  try {
    const {
      data,
    }: {
      data: {
        suppliers: Supplier[];
        meta: {
          current_page: number;
          total_items: number;
          total_pages: number;
        };
      };
    } = await axios.get(`/api/v1/suppliers?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function createSupplier(addSupplier: AddSupplier) {
  const token = localStorage.getItem("iventory.control.token");

  try {
    await axios.post(
      "/api/v1/suppliers",
      { supplier: addSupplier },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export async function deleteSupplier(supplierId: number) {
  const token = localStorage.getItem("iventory.control.token");

  try {
    await axios.delete(`/api/v1/suppliers/${supplierId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(err);
  }
}
