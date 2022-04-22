const HeaderWithOverlay = ({ title, image }) => {
  return (
    <header
      className="with-overlay"
      style={{
        backgroundImage: `url(${image}`,
      }}
    >
      <div className="overlay-bg" />
      <div className="overlay-content">
        <h2>{title}</h2>
      </div>
    </header>
  );
};

export default HeaderWithOverlay;
