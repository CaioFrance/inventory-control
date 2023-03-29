import { LockOutlined } from "@mui/icons-material";
import { Avatar, Typography, TextField, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

interface IFormData {
  username: string;
  password: string;
}

export default () => {
  const { signUp } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();

  async function handleSignUp(data: IFormData) {
    await signUp(data.username, data.password);
  }

  return (
    <Box
      sx={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#00796b" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registration
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)}>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoFocus
          {...register("username", { required: true })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
