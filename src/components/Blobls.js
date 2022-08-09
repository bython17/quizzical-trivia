import TopRightBlob from "../assets/top-right-blob.svg";
import BottomLeftBlob from "../assets/bottom-left-blob.svg";

const Blobs = () => {
  return (
    <>
      <img className="top-right blob" alt="blob" src={TopRightBlob} />
      <img className="bottom-left blob" alt="blob" src={BottomLeftBlob} />
    </>
  );
};

export default Blobs;
