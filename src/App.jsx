import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ProtectedRouteByRole } from "./components/ProtectedRouteByRole";

// Layouts
import { PublicLayout } from "./components/PublicLayout";
import { AuthLayout } from "./components/AuthLayout";

// Páginas
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ListaUsuarios } from "./pages/ListaUsuarios";
import { FormularioRegistroUsuarios } from "./pages/FormularioRegistroUsuario";
import { GestionUsuarios } from "./components/GestionUsuarios";
import { DashboardCoordinador } from "./pages/DashboardCoordinador";
import { DashboardVicerrector } from "./pages/DashboardVicerrector";

const isAuthenticated = () => !!Cookies.get("token");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<AuthLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteByRole allowedRoles={["Administrador"]}>
                <Dashboard />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/dashboard-coordinador"
            element={
              <ProtectedRouteByRole allowedRoles={["Coordinador"]}>
                <DashboardCoordinador />
              </ProtectedRouteByRole>
            }
          />
          <Route
            path="/dashboard-vicerrector"
            element={
              <ProtectedRouteByRole allowedRoles={["Vicerrector"]}>
                <DashboardVicerrector />
              </ProtectedRouteByRole>
            }
          />

          <Route
            path="/registro-usuarios"
            element={<Navigate to="/lista-usuarios" />}
          />
          <Route path="/lista-usuarios" element={<ListaUsuarios />} />
          <Route
            path="/formulario-registro-usuarios"
            element={<FormularioRegistroUsuarios />}
          />
          <Route
            path="/lista-usuarios/:id"
            element={<FormularioRegistroUsuarios />}
          />
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        </Route>

        {/* Redirección fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
