import * as React from "react";

const Error = (): React.ReactElement => {
    return (
        <div className="alert alert-danger alert-dismissible fade show error" role="alert">
            <strong>Unable to get Gifs, please try again in a few minutes</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Error;