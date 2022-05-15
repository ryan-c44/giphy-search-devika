import * as React from 'react';
import GiphySearch from './Components/GiphySearch';

interface Props {
  name: string;
}

const App = (props: Props): React.ReactElement => {
  return <GiphySearch />
};

export default App;
