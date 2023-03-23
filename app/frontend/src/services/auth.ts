import axios from "axios";

export async function signInRequest(username: string, password: string) {
  try {
    const { data } = await axios.post("/api/v1/login", {
      username,
      password,
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function signUpRequest(username: string, password: string) {
  try {
    const { data } = await axios.post("/api/v1/users", {
      user: { username, password },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}
