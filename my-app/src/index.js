import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function formatname(name){
    return name.first_name+' '+name.last_name;
}

function conditionFunction(name)
{
    if(name)
        return <h1>True conditon by {formatname(name)}</h1>;
    return <h1>Didn't get any name</h1>;
}

const name =
    {
        'first_name': 'Rishav',
        'last_name' : 'Medhi'
    };
const element = conditionFunction(name);

ReactDOM.render(
    element,
    document.getElementById('root')
);