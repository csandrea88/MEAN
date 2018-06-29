import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes_arr: [], 
      currLower: 0, 
      currUpper: 15,
      quotesperpage: 15,
      totquotes: 0,
      searchValue: ""
    }; 
      this.prevHandleClick = this.prevHandleClick.bind(this);
      this.nextHandleClick = this.nextHandleClick.bind(this); 
      this.fetchFilterClick = this.fetchFilterClick.bind(this);  
      this.searchClick = this.searchClick.bind(this); 
      this.commonChange = this.commonChange.bind(this);
      this.getFilterAndSearch = this.getFilterAndSearch.bind(this);  
      
      

    }
  
  prevHandleClick() {
  // Previous button: Allows for pagination of up to 15 quotes per page
    if (this.state.currLower >= 15) {
      let cLower = this.state.currLower - this.state.quotesperpage;
      let cUpper = cLower + (this.state.quotesperpage);
      this.setState({
        currLower: cLower,
        currUpper: cUpper
      });
    }
  }
  nextHandleClick() {
  // Next button: Allows for pagination of up to 15 quotes per page
    if (this.state.currUpper < this.state.quotes_arr.length) {

      let cLower = this.state.currLower + this.state.quotesperpage;
      let cUpper = this.state.currUpper + this.state.quotesperpage;
      
      if (cUpper > this.state.totquotes) {
        cUpper = this.state.totquotes;
      }
      
      this.setState({
        currLower: cLower,
        currUpper: cUpper
      });
    }
  }

  commonChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    }); 
  }
  getFilterAndSearch(event) {
    console.log("in getFilterAndSearch")
    if (this.state.searchValue) {
      this.fetchFilterClick("games")
    } else {
      this.fetchFilterClick("games")
    }

  }

  searchClick(event) {
  //Allows for client-side search that filters quotes by text entered 
    event.preventDefault();// prevents normal refreshing and performs search
    this.fetchFilterClick(this.state.searchValue);
  }

  componentWillMount() {
    this.fetchFilterClick();
  }
  //Fetching quotes from quote.json and display available info in a list, made to look 
  //nicer by bootstrap. This routine was written to be scalable
  fetchFilterClick(cfilter) {
    //fetched all the quotes from quotes.json
    fetch('quotes.json')
    .then(results => {
      return results.json();
    })
    //Allows filtering by theme
    .then( fdata => {
      //from all in quotes.json, use filter, if it exists, to further select by a theme
      //With a little tweaking this is scalable to add more filters that may exist on the 
      //jquery file.
      if (cfilter) {
        if (cfilter === "games" || cfilter === "movies") {
          console.log("in games or movies if condition")
          console.log("this.state.searchValue: ", this.state.searchValue)
          if (this.state.searchValue) {
            console.log("this.state.searchValue exists", this.state.searchValue)
            return fdata.filter((group) => group.theme === cfilter && group.quote.indexOf(this.state.searchValue)!==-1);
          } else {
            return fdata.filter((group) => group.theme === cfilter)
          }
        } else { 
          console.log("in search submit button logic")
          return fdata.filter((group) => group.quote.indexOf(cfilter)!==-1); 
        }
      } else {
        console.log("cfilter does not exist", fdata);
        return fdata;
      }
    })
    //Then the list of quotes we end up with, will be setup to be rendered as a list item
    .then( mdata => {
      console.log("mdata: ", mdata)
      let quotes = mdata.map((quote) => {        
        return(
          <li class="list-group-item" key={quote.results}> {quote.quote}</li>
        )
      })
      //resets state to new data that can be read when rendering
      this.setState({
        currLower: 0,
        currUpper: 15,
        quotes_arr:quotes,
        totquotes: quotes.length,
        searchValue: ""
      });
    })

    .catch( err => {
      console.log(err);
    })

  }

  render() {
    //Rendering webpage, using binding to pass information through the on clicks, for 
    //scalability and allowing additional filters, with minimal coding changes
    return (
      <div className="App">
        <h2>Quotes</h2>
        
        <p class="filter">  Filter by theme: 
          <a onClick={this.getFilterAndSearch.bind(this, "games")}> games </a> or 
          <a onClick={this.fetchFilterClick.bind(this, "movies")}> movies</a>
        </p>  
        
        <form id="search" role="search">
          <button type="submit" class="btn btn-default" onClick={this.searchClick}>Submit</button>
          <input type="text" class="form-control" placeholder="Search Quote" name="searchValue" value={this.state.searchValue} onChange={this.commonChange}/>
        </form>
        
        <ul class="list-group">
            {this.state.quotes_arr.slice(this.state.currLower,this.state.currUpper)}
        </ul>

        <ul class="pager">
          <li class="previous"><a onClick={this.prevHandleClick}>Previous</a></li>
          <li class="next"><a onClick={this.nextHandleClick}>Next</a></li>
        </ul>

      </div>
    )
  }
}

export default App;


