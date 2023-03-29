import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getAllSuppliers, Supplier } from "../../services/suppliers";
import Layout from "../../layout/Layout";
import { Edit, Delete } from "@mui/icons-material";
import {
  Pagination,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";

export default () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    return () => {
      getAllSuppliers().then((res) => {
        setSuppliers(res!.suppliers);
        setPages(res!.meta.total_pages);
      });
    };
  }, []);

  async function handleChangePage(event: any, page: number) {
    setCurrentPage(page);

    getAllSuppliers(page).then((res) => {
      setSuppliers(res!.suppliers);
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
          <h1>Supplier Page</h1>
          <Box>
            <Button variant="contained" href="/supplier/new">
              ADD SUPPLIER
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
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers?.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell component="th" scope="row" align="center">
                    {supplier.id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {supplier.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {supplier.address}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {supplier.city}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {supplier.state}
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
