import { useContext, useState } from "react";
import "./write.css";

import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
import { FcAddImage } from "react-icons/fc";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const photo = user.photo;

  console.log("post info", title, desc, file, user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      data.append("id", user._id);
      data.append("type", "file");
      data.append("avatar", file);
      try {
        const res = await axiosInstance.post("/posts/upload", data);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
  };
  /*try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}*/

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={file ? URL.createObjectURL(file) : photo}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            Image
            <FcAddImage className="icon" />
          </label>
          <input
            action="/:id"
            method="POST"
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        {success && (
          <span
            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
          >
            Post has been uploaded...
          </span>
        )}
      </form>
    </div>
  );
}
