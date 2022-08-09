import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div className="loading--container">
      <ReactLoading type="bubbles" color="#293264" />
      <h3 className="loading--text">Loading</h3>
    </div>
  );
};

export default Loading;
