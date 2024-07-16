import { lazy } from "react";
import { Route } from "react-router-dom";
import { ROUTE } from "./routing";
import { Routes } from "react-router-dom";
import Wrapper from "@/layouts/Wrapper";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const GetStarted = lazy(() => import("@/pages/GetStarted"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CreateTask = lazy(() => import("@/pages/CreateTask"));
const ViewTask = lazy(() => import("@/pages/ViewTask"));

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
