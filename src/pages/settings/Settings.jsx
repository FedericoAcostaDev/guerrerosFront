import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

/*{line = 70 => here we need to ad something like if nothing typed dont change data. }*/

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  //if user doesn't have a profilePic we show a replacement
  const profilePic = user.profilePic
    ? user.profilePic
    : "https://react.semantic-ui.com/images/avatar/large/matthew.png";
  console.log("user is", user);

  //const PF = "cloudinary://831536928848822:Rpg3EXsGlbKoIwegxx3A0r5-Pas@bloghiv";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (file) {
      const data = new FormData();
      data.append("id", user._id);
      data.append("type", "file");
      data.append("avatar", file);
      try {
        const res = await axiosInstance.post("users/upload", data);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Perfil</span>
          <span className="settingsDeleteTitle">Eliminar cuenta</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Modificar imagen de perfil</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : profilePic}
              alt="profile-pic"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>

            <input
              action="/:id"
              method="POST"
              enctype="form-data"
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onClick={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Modificar nombre de usuario</label>

          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Modificar Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Modificar contraseña</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Guardar cambios
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Cambios Guardados!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
