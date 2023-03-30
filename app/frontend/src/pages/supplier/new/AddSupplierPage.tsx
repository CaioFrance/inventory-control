import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddSupplier, createSupplier } from "../../../services/suppliers";

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

export default ({
  openModal,
  handleCloseModal,
  getAllSuppliers,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  getAllSuppliers: (page?: number) => void;
}) => {
  const { register, handleSubmit, reset, formState } = useForm<AddSupplier>();

  const handleCreateSupplier = async (params: AddSupplier) => {
    await createSupplier(params);

    getAllSuppliers();
    handleCloseModal();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ address: "", city: "", name: "", postal_code: "", state: "" });
    }
  }, [reset, formState]);

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ ...style }}>
        <Typography component="h1" variant="h5">
          New Supplier
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
          <Box component="form" onSubmit={handleSubmit(handleCreateSupplier)}>
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
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
