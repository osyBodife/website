import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        count:0
     }
     handleClick=()=>{
        let counter=this.state.count;
         counter +=2;
            this.setState({count:counter});
     }
    render() { 
        return (
            <div>
                <p>Counter:{this.state.count}</p>
                <button
                onClick={this.handleClick}
                >

                    Increment
                    


                </button>
            </div>
          );
    }
}
 
export default Counter;