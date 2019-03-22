import React, {Component} from 'react';


class Page extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loaded: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:9292/movies/populate').then(result => result.json())
        .then(content =>{
            this.setState({
                items:content,
                loaded: true
            })
        })
    }

    render(){
        var random = Math.floor((Math.random()*56)+1);
        console.log(random);
        var {loaded, items} = this.state
        if(!loaded){
            return <div>-----Wait----</div>
        }
        else{
            return(
                <div>
                {items[0].title}
            </div>
            )
        }
    }
}

export default Page;