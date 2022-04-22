import { useNavigate } from "react-router-dom";

const Status500 = () => {
  const navigate = useNavigate();
  return (
    <div className="row align-items-center justify-content-center w-100">
      <div className="col-auto text-center text-primary">
        <p style={{ fontSize: 80 }}>
          <i className="icon-fire"></i>
        </p>
        <h2>Error 404</h2>
        <h4>{`Sorry, but we have one problem and working to solve, please, try again later!`}</h4>
        <div className="row justify-content-center">
          <button className="w-auto" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Status500;
