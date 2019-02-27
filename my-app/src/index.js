import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function formatname(name){
    return name.first_name+' '+name.last_name;
}

const name =
    {
        'first_name': 'Rishav',
        'last_name' : 'Medhi'
    };
const element = <h1>Hello, {formatname(name)}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);