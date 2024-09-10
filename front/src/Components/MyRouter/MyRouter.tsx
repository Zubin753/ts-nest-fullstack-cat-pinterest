import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  PrivateRoutes,
  PublicRoutes,
  RouteNames,
} from "../../router/router.ts";
import { useTypedSelector } from "../../hooks/useSelector.ts";
import { authState } from "../../store/reducers/types.ts";

const MyRouter: React.FC = () => {
  const isAuth = useTypedSelector((state: authState) => state.isAuth);

  return isAuth ? (
    <Routes>
      {PrivateRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={<r.component />} />
      ))}
      <Route
        path={"*"}
        element={<Navigate to={RouteNames.AllCats} replace />}
      />
    </Routes>
  ) : (
    <Routes>
      {PublicRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={<r.component />} />
      ))}
      <Route
        path={"*"}
        element={<Navigate to={RouteNames.AllCats} replace />}
      />
    </Routes>
  );
};

export default MyRouter;
