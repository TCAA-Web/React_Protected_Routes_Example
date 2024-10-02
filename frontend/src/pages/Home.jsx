import { useQuery } from "@tanstack/react-query";
import React from "react";
import { request } from "graphql-request";
import { getAllBlogs } from "../queries/getAllBlogs";
import { Card } from "../components/card/Card";
import { Grid } from "../components/grid/Grid";
import Markdown from "markdown-to-jsx";
import { NavLink } from "react-router-dom";

export const Home = () => {
  // Hent alle blog posts med query: getAllBlogs
  const { data, isLoading, error } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () =>
      request(
        "https://eu-west-2.cdn.hygraph.com/content/cm1kc5izb021507w6a698pixr/master",
        getAllBlogs
      ),
  });

  // Hvis der er en fejæ så vis en div med Error
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  // Hvis den loader så vis loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Ellers vis et Grid med alle blogs "mappet" ud
  return (
    <Grid width={"90%"} rows={"auto"} gap={8}>
      {data.blogs.map((item) => (
        <Card key={item.title} sx={{ width: "70vw" }}>
          <img
            style={{ height: "35vh" }}
            src={item.images[0].url}
            alt={item.title + "-image"}
          />
          <Markdown>{item.content.substring(0, 200) + "...."}</Markdown>

          {/* BEMÆRK navlink til /single med en slug i enden af URL´en (vores queryParam) */}
          <NavLink to={`/single/${item.slug}`}>Read more...</NavLink>
        </Card>
      ))}
    </Grid>
  );
};
