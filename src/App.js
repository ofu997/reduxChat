/*
// 485
*/

function createStore(reducer, initialState) {
  let state = initialState;
   // define an array called listeners
  // add subscribe() method to add listener to listeners
  // call each listener function when state is changed
  const listeners = [];

  // listener is a function
  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(
          action.index + 1, state.messages.length
        ),
      ],
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };

const store = createStore(reducer, initialState);

class App extends React.Component{
  componentDidMount(){
    store.subscribe(() => this.forceUpdate());
  }

  render(){
    const messages = store.getState().messages;

    return(
      <div className='ui segment'>
        <MessageView messages={messages}/>
        <MessageInput />
      </div>
    )
  }
}

class MessageInput extends React.Component{
  state ={
    value:"",
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: "ADD_Message",
      message: this.state.value,
    });
    // resets value in onChange(e);
    this.setState({
      value: "",
    });
  };
}

const App = { createStore, reducer, initialState }; // for tests
export default App;
