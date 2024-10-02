import React from "react";
import { Card } from "../components/card/Card";
import { Form } from "../components/form/Form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { getSingleBlog } from "../queries/getSingleBlog";
import { updateBlog } from "../queries/updateBlog";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { publishBlog } from "../queries/publishBlog";

export const UpdateBlog = ({ user }) => {
  // Hent vores query param (slug)
  const { slug } = useParams();

  // Hent vores queryClient
  const queryClient = useQueryClient();

  // Hent det pågældende blogindlæg ud fra slug
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleBlog", slug],
    queryFn: async () =>
      request(import.meta.env.VITE_PUBLIC_ENDPOINT, getSingleBlog, {
        blogslug: slug,
      }),
  });

  // Mutation til at opdatere blogindlægget.
  // Tager imod data (et objekt), som indeholder alle de nye værdier der skal opdateres.
  // Når dette promise er "settled", skal den lave endnu et request hvor den sender en request om at
  // "publishe" vores blog indlæg. Når vi opdaterer et blog indlæg bliver det sat til "draft" og skal publishes igen.
  const updateMutation = useMutation({
    mutationFn: async (data) =>
      request({
        url: import.meta.env.VITE_PUBLIC_ENDPOINT,
        document: updateBlog,
        variables: {
          ...data,
          slug: slug,
        },

        requestHeaders: { Authorization: "Bearer " + user.token },
      }),
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      console.log("mutation succesful");
      toast("Blog updated succesfully!");
      queryClient.invalidateQueries();
    },
    onSettled: async () => {
      request({
        url: import.meta.env.VITE_PUBLIC_ENDPOINT,
        document: publishBlog,
        variables: {
          slug: slug,
        },

        requestHeaders: { Authorization: "Bearer " + user.token },
      });
    },
  });

  // En funktion vi kan sende ind i vores form som "submit" action.
  // Funktionen tager title og content fra vores form og gemmer dem i et objekt (data)
  // Herefter køres vores updateMutation med dette data.
  const updateBlogSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    if (title && content) {
      const data = { title: title, content: content };
      updateMutation.mutate(data);
    }
  };

  // Hvis der opstår en fejl, vises en div med "fejl"
  if (error) {
    return <div>Error....</div>;
  }

  // Hvis der er er loading vises en div med "loading"
  if (isLoading) {
    return <div>Loading....</div>;
  }

  // Returner vores Form komponent med props; (callback - funktionen der kører på submit) og data (blog indlæg)
  return (
    <div>
      <Card sx={{ width: "70%", margin: "auto" }}>
        <Form callback={updateBlogSubmit} data={data?.blog} />
      </Card>
      <ToastContainer />
    </div>
  );
};
