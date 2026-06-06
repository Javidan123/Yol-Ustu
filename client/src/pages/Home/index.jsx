import { useEffect, useState } from "react";
import Nav from "../../components/Nav/index";
import Footer from "../../components/Footer/index";
import Card from "../../components/Card/index";

import "./style.scss";

const Home = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getAllMenu = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menu");

        const json = await res.json();

        if (res.ok) {
          setDishes(json.data);
        }
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch menu");
      }
    };

    getAllMenu();
  }, []);

  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem("counts");
    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("counts", JSON.stringify(counts));
  }, [counts]);

  const add = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const remove = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="home">
      <Nav />
      <div className="main">
        <div className="hero">
          <div className="img"></div>
          <h1>Xoş Gəldiniz !</h1>
        </div>
        <div className="menu">
          {dishes.map((dish) => {
            return (
              <Card
                key={dish._id}
                dish={dish}
                counts={counts}
                add={add}
                remove={remove}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
