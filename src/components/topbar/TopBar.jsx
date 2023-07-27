import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  //if user doesn't have a profilePic we show a replacement
  const profilePic =
    user && user.profilePic
      ? user && user.profilePic
      : "https://react.semantic-ui.com/images/avatar/large/matthew.png";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              INICIO
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              ESCRIBIR
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "SALIR"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                ENTRAR
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTRARSE
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
