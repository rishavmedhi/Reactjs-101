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
// setInterval(update_timer,10);

// creating a custom component
function Welcome(props)
{
    return <h1>Hello, {props.name}</h1>
}

function UserDescription(props)
{
    return(<div class="user-description">
        <h3>{props.description}</h3>
    </div>)
}

// component that is using other components
function App()
{
    return (
        <div>
        <Welcome name="Rishav"/>
        <Welcome name="John"/>
        <Welcome name="Mark"/>
        </div>
    )
}

// component rendering function which uses other smaller components
function intro_element(props){
    return (
        <div>
            <Welcome name={props.user}/>
            <div>This is a element rendered using react </div>
            <UserDescription description={props.description}/>
        </div>
    )
}

// implementing the custom component
const element = <Welcome name="Rishav"/>;

const user_props = {
    "user":"Rishav",
    "description":"Coding in react"
}

/*
    Working with states
    Starting with converting a component function to class
*/
class Clock extends React.Component{
    /* for defining the initial state */
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    /* operations to be done after the component has rendered
    * here timer is setup that triggers time change after a fixed interval */
    componentDidMount() {
        /* timer ID */
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    /* operations called when the component is removed */
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    /*  fetches the current time and indicates that state has changed */
    tick()
    {
        this.setState({
            date : new Date()
        });
    }

    /* for using state, converted this.props to this.state
     * this is called everytime when react detect state change */
    render(){
        return(
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

/* handling events in React */
/* simple onclick representation
*   using functions
* */
function ActionLink() {
    function handleClick(e){
        e.preventDefault();
        console.log("click triggered");
    }

    return(<a href="#" onClick={handleClick}>
        Click Me</a>);
}

/* event handling by using classes */
class Toggle extends React.Component
{
    /* constructor */
    constructor(props)
    {
        super(props);
        // initialising the state with initial values
        this.state  = {isToggleOn : true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    /* click handler function
     * changes value of isToggleOn inside the state */
    handleClick(){
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    /* render function */
    render(){
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

/* conditional rendering
 * creating two types div that are implemented on the basis of params */
function UserGreeting()
{
    return(<div>Welcome back!</div>);
}

function GuestGreeting()
{
    return(<div>Welcome, You have to signup</div>);
}

/* function that displays greeting on the basis of login flag props */
function Greeting(props)
{
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn)
        return <UserGreeting/>;
    else
        return <GuestGreeting/>;
}

/* simulating logout login using conditional rendering
*  Login button */
function LoginButton(props)
{
    return(<button onClick={props.onClick}>
        Login
        </button>
    );
}

/* Logout Button */
function LogoutButton(props)
{
    return(<button onClick={props.onClick}>
        Logout
        </button>
    );
}

/* stateful LoginControl component */
class LoginControl extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {LoggedIn : false};
    }

    handleLoginClick()
    {
        this.setState({LoggedIn : true});
    }

    handleLogoutClick()
    {
        this.setState({LoggedIn : false});
    }

    render(){
        const LoggedIn = this.state.LoggedIn;
        let button;

        // if(LoggedIn)
        // {
        //     button = <LogoutButton onClick={this.handleLogoutClick}/>
        // }
        // else
        // {
        //     button = <LoginButton onClick={this.handleLoginClick}/>
        // }

        /* using conditional operator for rendering */
        return (
            <div>
                <Greeting isLoggedIn = {LoggedIn} />
                {
                    LoggedIn ?
                        <LogoutButton onClick={this.handleLogoutClick}/> :
                        <LoginButton onClick={this.handleLoginClick}/>
                }
            </div>
        );
    }
}

/* using conditional operators for conditional rendering */
function MailCounter(props)
{
    const unreadMessages = props.unread_messages;
    return(
        <div>
            <h1>Hello!</h1>
            { unreadMessages.length>0 &&
                <h2>You have {unreadMessages.length} messages</h2>
            }
        </div>
    )
}

/* variable storing unread messages*/
const unread_messages = ["Hi","Come back!","It's time, let's go","Baazinga"];

/* to remove elements from rendering when not needed */
/* removing banner by returing null on the basis of props */
function WarningBanner(props){
    if(props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning
        </div>
    );
}

class Page extends React.Component
{
    constructor(props)
    {
        super(props);
        /* initial state of warning flag */
        this.state = {'showWarning':true};
        /* defining toggle click function */
        this.handleToggleClick  = this.handleToggleClick.bind(this);
    }

    /* toggle click function to toggle warning message */
    handleToggleClick()
    {
        this.setState(state => ({
            showWarning : !state.showWarning
        }));
    }

    /* rendering button and changing the button text as per showWarning flag */
    render(){
        return(
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleToggleClick} >
                    {this.state.showWarning ?'Show':'Hide' }
                </button>
            </div>
        );
    }
}

/* using lists to display list elements */
const num_list = [1,2,3,4,5];
const num_list_ui = num_list.map(number =>
                    <li>{number}</li>);

/* function that accepts array of numbers and returns list of numbers */
function NumberLister(props)
{
    const num_array = props.num_list;

    /* adding key to remove the warning */
    const list_elements = num_array.map(number =>
    <li key={number.toString()}>
        {number}
    </li>);

    return (
        <ul>{list_elements}</ul>
    )
}

/* using conditional operator */
ReactDOM.render(
    <NumberLister num_list = {num_list}/>,
    document.getElementById('root')
);

