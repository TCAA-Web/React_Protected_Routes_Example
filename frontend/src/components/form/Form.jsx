import React from "react";
import style from "./Form.module.scss";

export const Form = ({ callback, data }) => {
  if (!data) {
    return <div>No data... Try again later</div>;
  }

  return (
    <>
      <h1>Upload/Edit blog</h1>
      <form onSubmit={(e) => callback(e)} className={style.formStyle}>
        <div>
          <label htmlFor="title">Title</label>
          <input defaultValue={data.title} name="title" type="text"></input>
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <input defaultValue={data.content} name="content" type="text"></input>
        </div>

        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};
