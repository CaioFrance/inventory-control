import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getAllProducts, ProductType } from "../../services/products";
import Layout from "../../layout/Layout";
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

export default () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    return () => {
      getAllProducts().then((res) => {
        setPages(res!.meta.total_pages === 0 ? 1 : res!.meta.total_pages);
        setCurrentPage(res!.meta.current_page);
        setProducts(res!.products);
      });
    };
  }, []);

  function handleChangePage(event: any, page: number) {
    setCurrentPage(page);

    getAllProducts(page).then((res) => {
      setProducts(res!.products);
    });
  }

  return (
    <Layout>
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
            <Button variant="contained">Add Product</Button>
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
                    <IconButton color="info">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};
