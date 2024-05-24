const ImgCard = ({ data }) => {
    return (
      <div style={{ border: "1px solid black", width: "220px", margin: "10px" }}>
        <div style={{ border: "1px solid black" }}>
          <img width={200} height={200} src={data.fileName} />
        </div>
        <div>
          <b>Lattitude:</b>
          {data.lat}
        </div>
        <div>
          <b>Longitude:</b>
          {data.long}
        </div>
      </div>
    );
  };
  
  export default ImgCard;