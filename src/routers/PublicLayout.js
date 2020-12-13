import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import AddEditBlogPage from "../pages/AddEditBlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import authActions from "../redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../redux/constants/auth.constants";

const PublicLayout = () => {
  const isAuthenciated = useSelector((state) => state.auth.isAuthenciated);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = sessionStorage.getItem(types.ACCESS_TOKEN);
    console.log("hi", accessToken, accessToken && !isAuthenciated);
    if (accessToken && !isAuthenciated) {
      dispatch(authActions.reLoginRequest(accessToken));
    }
  }, []);
  return (
    <>
      <PublicNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};
export default PublicLayout;
