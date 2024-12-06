import { lazy } from "react";

export const TestPage = lazy(() => import("./test"));
export const LandingPage = lazy(() => import("./landing"));
export const LoginPage = lazy(() => import("./(auth)/login"));
export const SignUpPage = lazy(() => import("./(auth)/sign-up"));
export const MarketPage = lazy(() => import("./(market)/market"));
export const ProductPage = lazy(() => import("./(market)/product"));
export const AddItemPage = lazy(() => import("./(market)/(editor)/add-item"));
export const EditItemPage = lazy(() => import("./(market)/(editor)/edit-item"));
