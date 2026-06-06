import "./style.scss";

const Card = ({ dish, counts, add, remove }) => {
  const count = counts[dish._id] ?? 0;

  return (
    <div className="card">
      <img src={dish.img} alt={dish.name} />
      <div className="description">
        <h1>{dish.name}</h1>
        <p>{dish.price}</p>
      </div>
      <div className="counter">
        <div className="btn" onClick={() => remove(dish._id)}>
          <span>-</span>
          <div className="h-line"></div>
        </div>
        <h1>{count}</h1>
        <div className="btn" onClick={() => add(dish._id)}>
          <div className="h-line"></div>
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
