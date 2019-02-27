import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function formatname(name){
    return name.first_name+' '+name.last_name;
}

// using JSX as expressions
function conditionFunction(name)
{
    // using attributes in JSX
    if(name)
        return <h1 data-val={name.first_name} data-type="name">True conditon by {formatname(name)}</h1>;
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