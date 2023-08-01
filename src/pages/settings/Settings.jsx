import "./settings.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
import ImageUploader from "../../components/settings/ImageUploader";
/*{line = 70 => here we need to ad something like if nothing typed dont change data. }*/

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [imgfile, setImgFile] = useState(user.profilePic || 'https://react.semantic-ui.com/images/avatar/large/matthew.png');
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  //const PF = "cloudinary://831536928848822:Rpg3EXsGlbKoIwegxx3A0r5-Pas@bloghiv";
  useEffect(()=> {
    console.log(user)
   }
   ,[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (imgfile) {
      const data = new FormData();
      data.append("id", user._id);
      data.append("type", "file");
      data.append("avatar", imgfile);
      try {
        const res = await axiosInstance.post("users/upload", data, {headers: {"Content-Type": "multipart/form-data"}});
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
        <form className="settingsForm" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <label>Modificar imagen de perfil</label>
          <div className="settingsPP">
          <ImageUploader defaultImage={imgfile} setDefaultImage={setImgFile}/>
          </div>

          <label>Modificar nombre de usuario</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Modificar Email</label>
          <input
            type="email"
            value={email}
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
