import * as React from 'react';

interface Prop {
    search: string,
    handleSearchChange: (event : React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event : React.MouseEvent) => void;
}

const Search = (props: Prop): React.ReactElement => {
    return (
        <form className="form-inline justify-content-center m-4">
            <input
                value={props.search}
                onChange={props.handleSearchChange}
                type="text"
                placeholder="Search GIF.."
                className="form-control"
            />
            <button
                onClick={props.handleSubmit}
                type="submit"
                className="btn btn-primary mx-2"
            >
            Search
            </button>
      </form>
    );
}

export default Search;