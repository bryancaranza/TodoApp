import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTE } from "./routing";
import { Routes } from "react-router-dom";
import Wrapper from "@/layouts/Wrapper";

const Dashboard = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/Dashboard")), 1500);
  });
});
const GetStarted = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/GetStarted")), 1500);
  });
});
const NotFound = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/NotFound")), 1500);
  });
});
const CreateTask = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/CreateTask")), 1500);
  });
});
const ViewTask = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/ViewTask")), 1500);
  });
});

const RouteElements = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path={ROUTE.HOME} element={<Dashboard />} />
        <Route path={ROUTE.BASE} element={<GetStarted />} />
        <Route path={ROUTE.CREATE} element={<CreateTask />} />
        <Route path={`${ROUTE.VIEW}/:id`} element={<ViewTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
};

export default RouteElements;
