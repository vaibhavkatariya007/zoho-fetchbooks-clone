import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[],
      filterList:[],
      user_error:false
  }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  
  componentDidMount(){
    let that = this;
    fetch('https://reqres.in/api/users?page=1&per_page=100').then(function(response) {
    return response.json();
  }).then(function(returnedValue) {
    let userData = returnedValue.data;
    let Arr = [];
    userData && userData.map((item)=>{
      Arr.push(item.first_name + ' ' + item.last_name);
    });
    that.setState({
      list:Arr,
      filterList:Arr
    });
  }).catch(function(err) {
    // Error :(
      if(err){
        that.setState({
          user_error:true
        });
      }
  });
  }

  searchStringInArray (str, strArray) {
    if(str){
      let filterArray = [];
      for (var j=0; j<strArray.length; j++) {
        if (strArray[j].toLowerCase().includes(str)) {
          filterArray =  filterArray.concat(strArray[j]);
        }
    }
    return filterArray;
    }
  }
  onChangeHandler(){
    let filteredList  = '';
    let {list} = this.state;
    let usersearch = this.userSearch.value.toLowerCase();
    if(usersearch !== ''){
      filteredList = this.searchStringInArray(usersearch, list);
      this.setState({
        filterList:filteredList
      });
    }else{
      this.setState({
        filterList:list
      });
    }
  }
  
  render() {
    let {filterList} = this.state;
    return (
      <div className="App">
      <div>
        <input type="text" ref={(ref)=> {this.userSearch = ref} } onChange={this.onChangeHandler}/>
      </div>

      <ol>
        {
        filterList &&  filterList.map((user, idx) => {
            return ( <li key={idx}>{user}</li> );
          })
        }
        </ol>
      </div>
    );
  }
}

export default App;
