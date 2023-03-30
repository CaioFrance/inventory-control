import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  AddOrUpdateProduct,
  deleteProduct,
  getAllProducts,
  ProductType,
} from "../../services/productsService";
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ModalProduct from "./ModalProduct";
import {
  getAllSuppliersWithoutPagination,
  Supplier,
} from "../../services/suppliersService";

export default () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<AddOrUpdateProduct | null>(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    setAllProducts();
    fetchAllSuppliers();
  }, []);

  const fetchAllSuppliers = () => {
    getAllSuppliersWithoutPagination().then((res) => {
      if (res !== undefined) {
        setSuppliers(res);
      }
    });
  };

  const setAllProducts = (page: number | undefined = 1) => {
    setCurrentPage(page);

    getAllProducts(page).then((res) => {
      setPages(res!.meta.total_pages);
      setProducts(res!.products);
    });
  };

  async function handleChangePage(event: any, page: number) {
    setCurrentPage(page);

    setAllProducts(page);
  }

  const handleCloseModal = () => {
    setProduct(null);
    setOpenModal(false);
  };

  const handleOpenModal = (product: AddOrUpdateProduct | null = null) => {
    if (product === null) {
      setIsAddMode(true);
    } else {
      setIsAddMode(false);
      setProduct(product);
    }

    setOpenModal(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);

    setAllProducts();
  };

  return (
    <Box sx={{ m: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Inventory Page</h1>
        <Box>
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Add Product
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Last Entry</TableCell>
              <TableCell align="center">Last Outing</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Min Amount</TableCell>
              <TableCell align="center">Supplier</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell component="th" scope="row" align="center">
                  {prod.id}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.description}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.last_entry}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.last_outing}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.amount}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.min_amount}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {prod.supplier!.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <IconButton color="info">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(prod.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalProduct
        openModal={openModal}
        isAddMode={isAddMode}
        product={product}
        suppliers={suppliers}
        handleCloseModal={handleCloseModal}
        getAllProducts={setAllProducts}
      />
    </Box>
  );
};
