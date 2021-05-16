import React from 'react';
import ReactDOM from 'react-dom';

const Hi = props => {
    render() {
        return (<h2>やあ！{props.name}</h2>)
    }
}

ReactDOM.render(
    <Hi name="KOTA" />,
    document.getElementById('root2')
)