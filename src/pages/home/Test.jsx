
import React from 'react'
class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'王生'
        }
    }


    render(){
        
        return <div>姓名：{this.state.name} <button onClick={()=>{this.state.name = 'hahah';
        console.log(this.state.name);}}>点击</button></div>
    }

}

export default Test