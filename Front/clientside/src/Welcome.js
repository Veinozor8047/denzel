import React, { Component} from  'react';

class Welcome extends Component{
    constructor(){
        super();
        this.state={
          count: 3
        }
    }    

    addOne(){
        this.setState({
            count: this.state.count+1
        })
    }
    RemoveOne(){
        this.setState({
            count :  this.state.count-1
        })
    }
    
    render(){
        return(
            <div>
            <h1>Welcome {this.props.name} aiuzehfd</h1>
            <p>{this.state.count}</p>
            <button onClick={()=> this.addOne()}> Add </button>
            <button onClick={this.RemoveOne.bind(this)}>Remove</button>
            </div>
        );
    }
}

export default Welcome;
