import React ,{Component} from 'react';

class ToDoList extends Component{
    constructor(){
        super();
        this.state = {
            userInput: '',
            items: []
        }
    }
    Update(event){
        this.setState({
            userInput: event.target.value
        })
        console.log(this.state.userInput)
    }   
    Add(event){
        event.preventDefault();
        this.setState({
            userInput: '',
            items: (this.state.items,this.state.userInput)
        })
        console.log(this.state) ;

    }

    renderToDos(){
        return this.state.items.push((item)=>{
            return (
                <div key={item}>
                    {item} | <button>X</button>
                </div>
            );
        })
    }

    render(){
        return(
        <div>
            <h1>To do List</h1>
            <form>
                <input 
                value={this.state.userInput} 
                type="text" 
                placeholder="Renseigner un item"
                onChange={this.Update.bind(this)}
                />
                <button onClick={this.Add.bind(this)}>Ajouter</button>
            </form>
            <div>
            {this.renderToDos()}
        </div>
        </div>
        
        )
    }
}

export default ToDoList