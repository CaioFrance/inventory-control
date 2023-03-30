import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  deleteSupplier,
  getAllSuppliers,
  Supplier,
} from "../../services/suppliers";
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
  Typography,
} from "@mui/material";
import AddSupplierPage from "./new/AddSupplierPage";

export default () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    setAllSuppliers();
  }, []);

  const setAllSuppliers = (page: number | undefined = 1) => {
    setCurrentPage(page);

    getAllSuppliers(page).then((res) => {
      setPages(res!.meta.total_pages);
      setSuppliers(res!.suppliers);
    });
  };

  async function handleChangePage(event: any, page: number) {
    setCurrentPage(page);

    setAllSuppliers(page);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (supplier: Supplier | null = null) => {
    if (supplier === null) {
      setIsAddMode(true);
    } else {
      setIsAddMode(false);
      setSupplier(supplier);
    }

    setOpenModal(true);
  };

  const handleDeleteSupplier = async (supplierId: number) => {
    await deleteSupplier(supplierId);

    setAllSuppliers();
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
        <Typography component="h5" variant="h4">
          Supplier Page
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => handleOpenModal}>
            ADD SUPPLIER
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
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
                  <IconButton
                    color="info"
                    onClick={() => handleOpenModal(supplier)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddSupplierPage
        openModal={openModal}
        isAddMode={isAddMode}
        supplier={supplier}
        handleCloseModal={handleCloseModal}
        getAllSuppliers={setAllSuppliers}
      />
    </Box>
  );
};
