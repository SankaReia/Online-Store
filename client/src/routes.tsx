import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import React from "react";
import { PublicConsts, AdminConsts, CategoryConsts } from "./utils/routsConsts";
import AddPicturePage from "./pages/admin/AddPicturePage";
import PictureArrayPage from "./pages/admin/PictureArrayPage";
import EditPicturePage from "./pages/admin/EditPicturePage";
import Shop from "./pages/Shop";

interface IRoute {
  path: string;
  Component: React.FunctionComponent;
}

export const AdminRoutes: IRoute[] = [
  {
    path: AdminConsts.PICTURE_ARRAY_ROUTE,
    Component: PictureArrayPage,
  },
  {
    path: AdminConsts.ADD_PICTURE_ROUTE,
    Component: AddPicturePage,
  },
  {
    path: AdminConsts.EDIT_PICTURE_ROUTE + "/:id",
    Component: EditPicturePage,
  },
];

//---------------------------------------------------------------------------

export const publicRoutes: IRoute[] = [
  {
    path: PublicConsts.HOME_ROUTE,
    Component: Home,
  },
  {
    path: PublicConsts.LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: PublicConsts.REGISTER_ROUTE,
    Component: Auth,
  },
  {
    path: PublicConsts.BASKET_ROUTE,
    Component: Basket,
  },
];

//---------------------------------------------------------------------------

export const categoryRoutes: IRoute[] = [
  {
    path: CategoryConsts.MODULAR_ROUTE,
    Component: Shop,
  },
  {
    path: CategoryConsts.FRAMED_ROUTE,
    Component: Shop,
  },
  {
    path: CategoryConsts.POSTERS_ROUTE,
    Component: Shop,
  },
  {
    path: CategoryConsts.CLOCK_ROUTE,
    Component: Shop,
  },
  {
    path: CategoryConsts.LIGHTBOXES_ROUTE,
    Component: Shop,
  },
];
