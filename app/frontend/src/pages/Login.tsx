import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";

interface IFormData {
  username: string;
  password: string;
}

export default () => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IFormData>();

  async function handleLogin({ username, password }: IFormData) {
    await signIn(username, password);
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
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoFocus
          {...register("username", { required: true })}
        />
        <TextField
          margin="normal"
          required
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
          Sign In
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Link href="/registration" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
