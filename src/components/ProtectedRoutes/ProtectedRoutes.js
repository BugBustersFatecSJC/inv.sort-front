import React from "react";
import { Navigate } from "react-router-dom";

/* ProtectedRoute redireciona o usuario para a pagina de login, caso o mesmo não esteja logado
IMPORTANTE: Use essa função em toda página que não deve ser acessada antes do login */
export function ProtectedRoute({ element: Element }) {
    const user = localStorage.getItem("user");
    return user ? <Element /> : <Navigate to="/login" />;
  }
  
  /* ProtectedLogin redireciona o usuario da página de login para a página de produtos, caso o mesmo já esteja logado */
  export function ProtectedLogin({ element: Element }) {
    const user = localStorage.getItem("user");
    return !user ? <Element /> : <Navigate to="/products" />;
  }