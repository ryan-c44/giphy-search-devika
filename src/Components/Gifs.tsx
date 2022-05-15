import * as React from 'react';

import { Gif } from "../Models/Model";
import Loader from "../Components/Loader";

interface Prop {
    isLoading: boolean,
    currentGifs: Gif[],
}

const Gifs = (props: Prop): JSX.Element => {
    if(props.isLoading) {
        return <Loader/>
    }

    return <div className='container gifs'>
    <>{props.currentGifs.map((gif: Gif) => {
        return (
            <div key={gif.id} className="gif">
                <img src={gif.images.fixed_height.url} />
            </div>
        );
    })}</>
    </div>
}

export default Gifs;