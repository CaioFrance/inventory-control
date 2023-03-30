import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Supplier } from "../../services/suppliersService";
import {
  AddOrUpdateProduct,
  createProduct,
  editProduct,
} from "../../services/productsService";

const style = {
  position: "absolute" as "absolute",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  top: "45%",
  left: "45%",
  width: 350,
  borderRadius: 5,
  m: 5,
};

type ModalProductProps = {
  openModal: boolean;
  isAddMode: boolean;
  product: AddOrUpdateProduct | null;
  suppliers: Supplier[];
  handleCloseModal: () => void;
  getAllProducts: (page?: number) => void;
};

export default ({
  openModal,
  isAddMode,
  product,
  suppliers = [],
  handleCloseModal,
  getAllProducts,
}: ModalProductProps) => {
  const { register, handleSubmit, reset, formState, setValue } =
    useForm<AddOrUpdateProduct>();

  const handleProduct = async (params: AddOrUpdateProduct) => {
    if (isAddMode) {
      await createProduct(params);
    } else {
      if (product !== null) {
        await editProduct(params, product.id);
      }
    }

    getAllProducts();
    handleCloseModal();
  };

  const setValueForm = (product: AddOrUpdateProduct) => {
    setValue("name", product.name);
    setValue("amount", product.amount);
    setValue("description", product.description);
    setValue("last_entry", product.last_entry);
    setValue("last_outing", product.last_outing);
    setValue("min_amount", product.min_amount);
  };

  useEffect(() => {
    if (!isAddMode && product !== null) {
      setValueForm(product);
    }

    if (formState.isSubmitSuccessful) {
      reset({
        description: "",
        amount: 0,
        name: "",
        last_entry: "",
        last_outing: "",
        min_amount: 0,
      });
    }
  }, [reset, formState]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValue("supplier_id", Number(event.target.value));
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ ...style }}>
        <Typography component="h1" variant="h5">
          {isAddMode ? "New Supplier" : "Edit Supplier"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box component="form" onSubmit={handleSubmit(handleProduct)}>
            <TextField
              label="Name"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("name", { required: true })}
            />
            <TextField
              label="Description"
              margin="normal"
              fullWidth
              id="description"
              autoFocus
              {...register("description", { required: true })}
            />
            <TextField
              label="Unit price"
              margin="normal"
              fullWidth
              id="unitPrice"
              autoFocus
              {...register("unit_price", { required: true })}
            />
            <TextField
              label="Amount"
              margin="normal"
              fullWidth
              id="amount"
              autoFocus
              type="number"
              {...register("amount", { required: true })}
            />
            <TextField
              label="Min Amount"
              margin="normal"
              fullWidth
              id="minAmount"
              autoFocus
              type="number"
              {...register("min_amount", { required: true })}
            />
            <TextField
              label="Entry"
              margin="normal"
              fullWidth
              id="entry"
              autoFocus
              type="date"
              focused
              {...register("last_entry", { required: true })}
            />
            <FormControl fullWidth>
              <InputLabel id="supplier_id">Supplier</InputLabel>
              <Select
                fullWidth
                label="Supplier"
                labelId="supplier_id"
                onChange={handleChangeSelect}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem>Select One</MenuItem>
                {suppliers.map((sup) => (
                  <MenuItem key={sup.id} value={sup.id}>
                    {sup.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {isAddMode ? "Create" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
