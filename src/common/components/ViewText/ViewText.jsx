import "./ViewText.scss";

const ViewText = ({ heading, value }) => {
  return (
    <div className="view-text">
      <p>{heading}</p>
      <p>{value}</p>
    </div>
  );
};

export default ViewText;
