import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import "./home.css";
import { useLocation } from "react-router";
import { axiosInstance } from "../../config";
import IconMsj from "./whatsapp-icon.png";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <a href="/link/to/site">
          <img className="iconMsj" src={IconMsj} alt="whatsapp-icon" />
        </a>
      </div>
    </>
  );
}
