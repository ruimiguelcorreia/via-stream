import React, {Component} from 'react';
import Axios from 'axios';

class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movieToSearch: '',
            movieListIMDB: [],
            movieListJW: [],
            listWasUpdated: false
        }
    }

    handleTitleChange = event => {
        this.setState({
            movieToSearch: event.target.value
        })
    }

    queryCurrentTitle = event => {
        const {movieToSearch} = this.state;
        
        event.preventDefault();
        Axios.get(`http://localhost:3000/movies/${movieToSearch}`).then(results => this.setState({movieListIMDB: results.data.imdb, movieListJW: results.data.justWatch, listWasUpdated: true})).catch(error => console.log(error));
    }

    render() {
        const {movieListIMDB, movieListJW, listWasUpdated} = this.state;
        return(
            <div>  
                <form onSubmit={(e) => this.queryCurrentTitle(e)}>
                    <input onChange={this.handleTitleChange} />
                    <button type='submit'>Search</button>
                </form>
                {listWasUpdated && <div>List will be shown here.</div>}
            </div>
            )
    }
}

export default Movies;