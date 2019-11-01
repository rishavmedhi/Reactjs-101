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

/* to render li elements
* not using keys here as not required (As said by react docs )*/
function NumberListElement(props)
{
    return(
        <li>{props.value}</li>
    );
}

/* function that accepts array of numbers and returns list of numbers */
function NumberLister(props)
{
    const num_array = props.num_list;

    /* adding key to remove the warning
    * using index (But not advisable as it leads to errors)
    * correct usage of keys with component elements */
    // const list_elements = num_array.map((number,index) =>
    // <NumberListElement key={number.toString()}
    // value={number}
    // />);

    /* embedding map() in JSX */
    return (
        <ul>{num_array.map((number)=>
            <NumberListElement
                key={number.toString()}
                value={number}
            />
        )}</ul>
    )
}

/* function showing keys should be unqiue among siblings
* created two list elements that use the same array id
*/
function Blog(props)
{
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr/>
            {content}
        </div>
    );
}

/* data for the required function */
const posts = [
    {'id':1,'title':'Captain Marvel','content':'Is Captain Marvel the most powerful??'},
    {'id':2,'title':'Avengers Endgame','content':'Is it really endgame for Avengers??'}
];

/* making forms in React
* CONTROLLED COMPONENT : since the state of the compenent is also the state of the UI elements */
class Nameform extends React.Component{
    constructor(props){
        super(props);
        /* the react state is going to store the values */
        this.state = {value:''};

        /* binding the onchange function */
        this.handleChange = this.handleChange.bind(this);
        /* binding the onsubmit function */
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    /* onchange handling function
    * takes the value from input and sets it in the state */
    handleChange(event){
        this.setState({value:event.target.value});
    }

    /* on submit function
    * displays the function that is present in the state as an alert */
    handleSubmit(event){
        alert("This name was submitted:"+this.state.value);
        event.preventDefault();
    }

    /* rendering the form UI
    * input tag : stores the value that is set in the react state */
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

/* Form that uses textarea */
class EssayForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {value:'Please enter the content of the Essay here'}

        /* binding the onchange function */
        this.handleChange = this.handleChange.bind(this);
        /* binding the onsubmit function */
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value});
    }

    handleSubmit(event){
        alert("This essay submitted:"+this.state.value);
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

/* Form that uses select */
class FavFruit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {value:'Coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({value:event.target.value});
    }

    handleSubmit(event)
    {
        alert("The user selected: "+this.state.value);
        event.preventDefault();
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select your favourite fruit
                    <select onChange={this.handleChange} value={this.state.value}>
                        <option value="Coconut">Coconut</option>
                        <option value="Apple">Apple</option>
                        <option value="Strawberry">Strawberry</option>
                        <option value="Mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }


}

/* Form with multiple elements */
class Reservation extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    /* when referring to multiple elements
    * make sure that the name and the state element is same
    * every input element is then referred to it by it's name parameter */
    render()
    {
        return(
            <form>
                <label>
                    Is Going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>

                <br />

                <label>
                    Number of Guests:
                    <input
                        type="text"
                        name="numberOfGuests"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>

            </form>
        )
    }
}

/* function to determine if water will boil in given input temperature */
function BoilingVerdict(props)
{
    if(props.celcius>=100) {
        return <p>The water would boil</p>
    }
    return <p>The water would not boil</p>
}

/* A module that displays boiling verdict depending upon temperature */
class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        // this.state = {temperature:''};

        // creating separate event handlers for various units
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature:'',scale:'c'};
    }

    // handleChange(event)
    // {
    //     this.setState({temperature:event.target.value});
    // }

    handleCelsiusChange(temperature)
    {
        this.setState({scale:'c',temperature});
    }

    handleFahrenheitChange(temperature)
    {
        this.setState({scale:'f',temperature});
    }

    render()
    {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale=='f'? tryConvert(temperature,toCelcius) : temperature;
        const fahrenheit = scale=='c'? tryConvert(temperature,toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale='c'
                    temperature={celsius}
                    onTemperatureChange = {this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange = {this.handleFahrenheitChange}
                />

                <BoilingVerdict
                    celcius={parseFloat(celsius)}
                />
            </div>
        )
    }
}

const scaleNames = {
    c: 'Celcius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature : ''};
    }

    handleChange(e)
    {
        // this.setState({temperature : e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render()
    {
        // const temperature = this.state.temperature;
        const temperature  = this.props.temperature;
        const scale = this.props.scale;

        return(
            <fieldset>
                <legend>Enter the temperature in {scaleNames[scale]}</legend>
                <input value={temperature}
                        onChange={this.handleChange} />
            </fieldset>
        )
    }
}

function toCelcius(fahrenheit){
    return (fahrenheit-32)*5/9;
}

function toFahrenheit(celcius) {
    return (celcius-9/5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output*1000) / 1000;
    return rounded.toString();
}

/* CONTAINTMENT */
function FancyBorder(props){
    return(
        <div className={'FancyBorder FancyBorder-'+props.color} >
            {props.children}
        </div>
    )
}

function FancyHeading(props){
    return(
        <h1 class="heading">Hello!</h1>
    );
}

function Fancytext(props){
    return(
        <p>Welcome to this page!</p>
    )
}
function WelcomeDialog(){
    return (
        <FancyBorder color="blue" top={<FancyHeading/>} bottom={<Fancytext/>} />
    );
}

/* SPECIALISATION */
// creating a basic function
function Dialog(props)
{
    return(
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.heading}</h1>
            <p className={"Dialog-message"}>{props.message}</p>
            {props.children}
        </FancyBorder>
    );
}

/* creating a special case of the basic function */
function FancyDialog(props){
    return(
        <Dialog
            heading="hello"
            text="this is some text"
        />
    );
}

class SignUpDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.HandleChange = this.HandleChange.bind(this);
        this.HandleSignup = this.HandleSignup.bind(this);
        this.state = {login:''}
    }

    render() {
        return (
            <Dialog title="Mars Exploration Program"
             title="How should we refer you?">
                 <input value={this.state.login}
                    onChange={this.HandleChange}
                 />

                 <button onClick={this.HandleSignup}>
                     Sign Me Up!
                 </button>
            </Dialog>
        )
    }

    HandleChange(e){
        this.setState({login:e.target.value});
    }

    HandleSignup(e) {
        alert(`Welcome abroad, ${this.state.login}!`);
    }
}

/* CREATING A FIRST MODULE USING REACT */
class ProductRow extends React.Component
{
    render(){
        const product = this.props.product;
        const status = product.stocked ?'':'red';
        return(
            <tr>
                <td className={'ProductRow '+status}>{product.name}</td>
                <td> { product.price } </td>
            </tr>
        );
    }
}

class ProductCategoryRow extends React.Component
{
    render(){
        const category = this.props.category;

        return (
          <tr>
            <th colSpan="2" className='ProductCategoryRow'>{category}</th>
          </tr>
        );
    }
}

class ProductTable extends React.Component
{
    render(){
        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product)=> {
            /* adding category row if this row doesn't belong to last row's category */
            if(product.category!==lastCategory){
                rows.push(
                    <ProductCategoryRow
                    category = {product.category}
                    key = {product.category}
                    />
                )
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return(
          <table className='ProductTable'>
              <thead>
                  <th>Name</th>
                  <th>Price</th>
              </thead>
              <tbody>{rows}</tbody>
          </table>
        );
    }
}

class SearchBar extends React.Component
{
    render(){
        return(
            <form className='SearchBar'>
                <input className='SearchField' type='text' placeholder='Search .. '/>
                <p>
                <input className='StockCheckbox' type='checkbox' />
                    Only show products in stock
                </p>
            </form>
        )
    }
}

class FilterableProductTable extends React.Component
{
    render() {
        return(
            <div className='FilterableProductTable'>
            <SearchBar/>
            <ProductTable products = {this.props.products }/>
            </div>
        )
    }
}

/* products data array */
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

/* using conditional operator */
ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('root')
);

