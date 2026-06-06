import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dishSchema } from "../../validations/dishValidation";
import toast from "react-hot-toast";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./style.scss";

const Admin = () => {
  const API = "http://localhost:3000/api";

  const [dishes, setDishes] = useState([]);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dishSchema),
  });

  useEffect(() => {
    const getAllMenu = async () => {
      try {
        const res = await fetch(`${API}/menu`);

        const json = await res.json();

        if (res.ok) {
          setDishes(json.data);
          toast.success("Menu yükləndi");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getAllMenu();
  }, []);

  const createDish = async (data) => {
    console.log(data);
    // try {
    //   const res = await fetch(`${API}/menu`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const json = await res.json();

    //   if (res.ok) {
    //     setDishes((prev) => [...prev, json.data]);
    //     reset();
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const updateDish = async (data) => {
    try {
      const res = await fetch(`${API}/menu/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setDishes((prev) =>
          prev.map((dish) => (dish._id === id ? json.data : dish)),
        );
        reset();
        toast.success("Yemək yeniləndi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteDish = async (data) => {
    try {
      const res = await fetch(`${API}/menu/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDishes((prev) => prev.filter((dish) => dish._id !== id));
        toast.success("Yemək silindi");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <div className="admin">
      <Nav />
      <div className="admin-event">
        <form className="add-dish" onSubmit={handleSubmit(createDish)}>
          <h1>Yemək əlavə et</h1>
          <div className="name">
            <p>Yeməyin adı</p>
            <input {...register("name")} />
            {errors.name && <p className="err">{errors.name.message}</p>}
          </div>
          <div className="price">
            <p>Qiyməti</p>
            <input {...register("price")} />
            {errors.price && <p className="err">{errors.price.message}</p>}
          </div>
          <div className="img">
            <p>Şəklin linki</p>
            <input {...register("img")} />
            {errors.img && <p className="err">{errors.img.message}</p>}
          </div>
          <button type="submit">Əlavə et</button>
        </form>
        <form className="edit-dish" onSubmit={handleSubmit(updateDish)}>
          <h1>Yemək redaktə et</h1>
          <select name="menu" id="menu" onChange={(e) => setId(e.target.value)}>
            {dishes.map((dish) => {
              return (
                <option value={dish._id} key={dish._id}>
                  {dish.name}
                </option>
              );
            })}
          </select>
          <div className="name">
            <p>Yeməyin adı</p>
            <input {...register("name")} />
            {errors.name && <p className="err">{errors.name.message}</p>}
          </div>
          <div className="price">
            <p>Qiyməti</p>
            <input {...register("price")} />
            {errors.price && <p className="err">{errors.price.message}</p>}
          </div>
          <div className="img">
            <p>Şəklin linki</p>
            <input {...register("img")} />
            {errors.img && <p className="err">{errors.img.message}</p>}
          </div>
          <button type="submit">Dəyişdir</button>
        </form>
        <form className="delete-dish" onSubmit={handleSubmit(deleteDish)}>
          <h1>Yemək sil</h1>
          <select name="dish" id="dish" onChange={(e) => setId(e.target.value)}>
            {dishes.map((dish) => {
              return (
                <option value={dish._id} key={dish._id}>
                  {dish.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Sil</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
