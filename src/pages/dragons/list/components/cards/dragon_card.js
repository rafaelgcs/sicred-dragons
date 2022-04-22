const DragonCard = ({
  className,
  color,
  dark = true,
  title,
  description,
  actions: Actions,
}) => {
  const textColor = dark ? "#fff" : "#343a40";
  const backgroundColor = color ? color : dark ? "#343a40" : "#fff";
  return (
    <div
      className={`card ${className ? className : ""}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: 30,
      }}
    >
      <Actions />
      <div
        className="card-container p-1 row"
        style={{ color: textColor, backgroundColor: backgroundColor }}
      >
        <div className="col-3">
          <i className="icon-dragon" style={{ fontSize: "3rem" }}></i>
        </div>
        <div className="col-9">
          <p className="m-0">
            <strong>{title}</strong>
          </p>
          <p className="m-0">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DragonCard;
