// require('normalize.css/normalize.css');
// require()
import React from 'react';
import ReactDOM from 'react-dom';

class Common extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {children} = this.props
        return(
            <div>
                hello!
                {children}
            </div>
        )
    }
}
export default Common
