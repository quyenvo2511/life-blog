import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import routeActions from "../redux/actions/route.actions";
import blogActions from "../redux/actions/blog.actions";

const AddEditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const userLoading = useSelector((state) => state.auth.Loading);
  const blog = useSelector((state) => state.blog.selectedBlog);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const blogLoading = useSelector((state) => state.blog.loading);

  const params = useParams();
  const blogId = params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  useEffect(() => {
    if (blogId) {
      dispatch(blogActions.blogRequest(blogId));
    }
  }, []);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        images: blog.images,
      });
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    dispatch(
      blogActions.updateBlogRequest(title, content, images, accessToken)
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = () => {
    dispatch(blogActions.deleteBlogRequest(blogId, accessToken));
  };

  const handleCancelEditing = () => {
    dispatch(routeActions.redirect(`/blogs/${blogId}`));
  };
  const handleApplyChange = () => {
    const { title, content, images } = formData;
    dispatch(
      blogActions.updateBlogRequest(title, content, images, accessToken, blogId)
    );
  };
  return userLoading || blogLoading ? (
    <div>
      <ClipLoader color="red" size={150} loading={true} />
    </div>
  ) : (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Control
            placeholder="Title"
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            placeholder="Content"
            value={formData.content}
            name="content"
            onChange={handleChange}
          />
        </FormGroup>
        {blogId ? null : <Button type="submit">Submit</Button>}
      </Form>
      {blogId ? (
        <div style={{ marginTop: 20 }}>
          <Button variant="success" onClick={() => handleApplyChange()}>
            Apply changes
          </Button>
          {"  "}
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete post
          </Button>
          {"  "}
          <Button variant="light" onClick={() => handleCancelEditing()}>
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AddEditBlogPage;
