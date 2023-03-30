import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AddOrUpdateSupplier,
  createSupplier,
  editSupplier,
  Supplier,
} from "../../../services/suppliersService";

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

type ModalSupplierProps = {
  openModal: boolean;
  isAddMode: boolean;
  supplier: Supplier | null;
  handleCloseModal: () => void;
  getAllSuppliers: (page?: number) => void;
};

export default ({
  openModal,
  isAddMode,
  supplier,
  handleCloseModal,
  getAllSuppliers,
}: ModalSupplierProps) => {
  const { register, handleSubmit, reset, formState, setValue } =
    useForm<Supplier>();

  const handleSupplier = async (params: AddOrUpdateSupplier) => {
    if (isAddMode) {
      console.log("aqui?");
      await createSupplier(params);
    } else {
      await editSupplier(params, supplier!.id);
    }

    getAllSuppliers();
    handleCloseModal();
  };

  useEffect(() => {
    if (!isAddMode && supplier !== null) {
      setValue("name", supplier.name);
      setValue("address", supplier.address);
      setValue("city", supplier.city);
      setValue("postal_code", supplier.postal_code);
      setValue("state", supplier.state);
    }

    if (formState.isSubmitSuccessful) {
      reset({ address: "", city: "", name: "", postal_code: "", state: "" });
    }
  }, [reset, formState]);

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
          <Box component="form" onSubmit={handleSubmit(handleSupplier)}>
            <TextField
              label="Name"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("name", { required: true })}
            />
            <TextField
              label="Postal Code"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("postal_code", { required: true })}
            />
            <TextField
              label="Address"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("address", { required: true })}
            />
            <TextField
              label="City"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("city", { required: true })}
            />
            <TextField
              label="State"
              margin="normal"
              fullWidth
              id="name"
              autoFocus
              {...register("state", { required: true })}
            />
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
