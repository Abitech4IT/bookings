import { login } from "./login.controller";
import { logout } from "./logout.controller";
import { signUp } from "./signup.controller";

const authController = {
  signUp,
  login,
  logout,
};

export default authController;
