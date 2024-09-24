import { lazy } from "react";

export const Test = lazy(() => import("./test"));
export const Landing = lazy(() => import("./landing"));
export const Market = lazy(() => import("./market"));
export const Login = lazy(() => import("./(auth)/Login"));
export const SignUp = lazy(() => import("./(auth)/SignUp"));
