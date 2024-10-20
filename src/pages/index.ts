import { lazy } from "react";

export const TestPage = lazy(() => import("./test"));
export const LandingPage = lazy(() => import("./landing"));
export const MarketPage = lazy(() => import("./market"));
export const LoginPage = lazy(() => import("./(auth)/Login"));
export const SignUpPage = lazy(() => import("./(auth)/SignUp"));
export const ProductPage = lazy(() => import("./product"));
export const AddItemPage = lazy(() => import("./add-item"));
