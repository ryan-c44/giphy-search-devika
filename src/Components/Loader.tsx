import * as React from "react";

const Loader = (): React.ReactElement => {
  return (
    <div className="container gifs">
      <div className="loader">
        <i className="fas fa-spinner fa-5x fa-spin" />
      </div>
    </div>
  );
};

export default Loader;