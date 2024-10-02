import React from "react";
import request from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleBlog } from "../queries/getSingleBlog";
import { deleteBlog } from "../queries/deleteBlog";
import { NavLink, useParams } from "react-router-dom";
import { Card } from "../components/card/Card";
import { Grid } from "../components/grid/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SingleBlog = ({ user }) => {
  // Hent vores slug param
  const { slug } = useParams();

  // Hent vores queryClient
  const queryClient = useQueryClient();

  // Hent alt data for den pågældende blog, ved at sende "blogslug" med ind i vores query
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleBlog", slug],
    queryFn: async () =>
      request(import.meta.env.VITE_PUBLIC_ENDPOINT, getSingleBlog, {
        blogslug: slug,
      }),
  });

  // Mutatation til at slette et blog indlæg
  // Husk at tilføje requestHeaders med din authorization token
  // Hvis det lykkedes at mutate (slette blogindlægget) køres toast og vores "cache" bliver indvalideret (den tømmes).
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      request({
        url: import.meta.env.VITE_PUBLIC_ENDPOINT,
        document: deleteBlog,
        variables: { blogID: id },
        requestHeaders: { Authorization: "Bearer " + user.token },
      }),
    onSuccess: () => {
      console.log("Mutation delete succesful");
      toast("Blog deleted!");
      queryClient.invalidateQueries({ queryKeys: ["allBlogs", "singleBlog"] });
    },
  });

  // Hvis data loader så vis en loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hvis der er en errors så vis fejl beskeden
  if (error) {
    return <b>Error: {error.message}</b>;
  }

  // Returner et blogindlæg med et link til "/update/${data.blog.slug}" - Slug bliver her sat på som query param
  return (
    <>
      <Grid>
        <Card sx={{ width: "90vw" }}>
          <h1>{data.blog?.title}</h1>
          <img src={data.blog?.images[0].url} alt={data.blog.title} />
          <p>{data.blog.content}</p>
          {user && (
            <>
              <button onClick={() => deleteMutation.mutate(data.blog?.id)}>
                Delete blog
              </button>
              <NavLink to={`/update/${data.blog?.slug}`}>Update</NavLink>
            </>
          )}
        </Card>
      </Grid>
      <ToastContainer />
    </>
  );
};
