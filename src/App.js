import './ResetStyle.css'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import KanbanBoard from './pages/KanbanBoard/KanbanBoard'

function App() {
  return (
    <div>
      {/* <Dashboard /> */}
      <KanbanBoard />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App
