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

function childrenJSX(name)
{
    return (<div>
        <h1>Introduction of a person</h1>
        <b>First name : </b>{name.first_name}<br/>
        <b>Last name : </b>{name.last_name}</div>);
}

const name =
    {
        'first_name': 'Rishav',
        'last_name' : 'Medhi'
    };
const element = childrenJSX(name);

// function that renders a time element
function update_timer()
{
    const timer_elem = (<div>
        <h1>Sample Timer</h1>
        <div class="timer">The time is : {new Date().toLocaleTimeString()}</div>
        </div>);
    ReactDOM.render(
        timer_elem,
        document.getElementById('root')
    );
}
// timeout function that calls the function after a particular time
setInterval(update_timer,10);

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );