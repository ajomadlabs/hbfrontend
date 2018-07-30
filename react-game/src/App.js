import React, { Component } from 'react'
import Header from './components/HeaderComponent'
import './assets/css/Modal.css'
import './assets/css/Button.css'
import './assets/css/Table.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      boardSize: 0,
      matrix: [],
      dataGrid: [],
      heroPositionRow: 0,
      heroPositionCol: 0,
      countStep: 0
    }
    this.openModal = this.openModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.keyHandle = this.keyHandle.bind(this)
  }

  openModal = () => {
    let modal = document.getElementsByClassName('rg-modal')[0]
    modal.style.display = 'block'
    let btn = document.getElementsByClassName('rg-modal-btn')[0]
    btn.onclick = () => {
      modal.style.display = 'none'
    }
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      boardSize: e.target.value
    })
  }

  createBoard = () => {
    let table = []
    let arrayDemo = []

    // Define 2D Array
    for (let i = 0; i < this.state.boardSize; i++) {
      arrayDemo.push([])
    }
    for (let i = 0; i < this.state.boardSize; i++) {
      for (let j = 0; j < this.state.boardSize; j++) {
        arrayDemo[i].push('')
      }
    }

    // Place Opponents Randomly
    let row = 0
    let col = 0
    let l = 0
    while (l < (this.state.boardSize * this.state.boardSize)) {
      row = Math.floor((Math.random() * (this.state.boardSize - 1)) + 1)
      col = Math.floor((Math.random() * (this.state.boardSize - 1)) + 1)
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hi'
      }
      l = l + 1
    }

    // Place Hero Center
    let mid = 0
    if (Math.ceil(this.state.boardSize % 2) === 0) {
      mid = Math.ceil(this.state.boardSize / 2)
    } else {
      mid = Math.ceil(this.state.boardSize / 2) - 1
    }
    let heroRow = 0
    let heroCol = 0
    for (let i = 0; i < arrayDemo.length; i++) {
      if (arrayDemo[mid][i] !== 'hi') {
        arrayDemo[mid][i] = 'hero'
        heroRow = mid
        heroCol = i
        break
      }
    }

    // Render Game Board'
    for (let i = 0; i < arrayDemo.length; i++) {
      let cols = []
      for (let j = 0; j < arrayDemo.length; j++) {
        cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
      }
      table.push(<tr id={i} key={i}>{cols}</tr>)
    }

    this.setState({
      matrix: table,
      dataGrid: arrayDemo,
      heroPositionRow: heroRow,
      heroPositionCol: heroCol
    })
  }

  keyHandle = (e) => {
    if (e.keyCode === 38) {
      let arrayDemo = this.state.dataGrid
      let row = this.state.heroPositionRow
      let col = this.state.heroPositionCol
      row = row - 1
      let heroRow = 0
      let heroCol = 0
      let table = []
      if (arrayDemo[row][col] === '' || arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        row = row + 1
        arrayDemo[row][col] = ''
        heroRow = row - 1
        heroCol = col
      }
      // Render Game Board'
      for (let i = 0; i < arrayDemo.length; i++) {
        let cols = []
        for (let j = 0; j < arrayDemo.length; j++) {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
        table.push(<tr id={i} key={i}>{cols}</tr>)
      }
      this.setState({
        matrix: table,
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol,
        countStep: this.state.countStep + 1
      })
    } else if (e.keyCode === 37) {
      let arrayDemo = this.state.dataGrid
      let row = this.state.heroPositionRow
      let col = this.state.heroPositionCol
      col = col - 1
      let heroRow = 0
      let heroCol = 0
      let table = []
      if (arrayDemo[row][col] === '' || arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        col = col + 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col - 1
      }
      // Render Game Board'
      for (let i = 0; i < arrayDemo.length; i++) {
        let cols = []
        for (let j = 0; j < arrayDemo.length; j++) {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
        table.push(<tr id={i} key={i}>{cols}</tr>)
      }

      this.setState({
        matrix: table,
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol,
        countStep: this.state.countStep + 1
      })
    } else if (e.keyCode === 39) {
      let arrayDemo = this.state.dataGrid
      let row = this.state.heroPositionRow
      let col = this.state.heroPositionCol
      col = col + 1
      let heroRow = 0
      let heroCol = 0
      let table = []
      if (arrayDemo[row][col] === '' || arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        col = col - 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col + 1
      }
      // Render Game Board'
      for (let i = 0; i < arrayDemo.length; i++) {
        let cols = []
        for (let j = 0; j < arrayDemo.length; j++) {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
        table.push(<tr id={i} key={i}>{cols}</tr>)
      }

      this.setState({
        matrix: table,
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol,
        countStep: this.state.countStep + 1
      })
    } else if (e.keyCode === 40) {
      let arrayDemo = this.state.dataGrid
      let row = this.state.heroPositionRow
      let col = this.state.heroPositionCol
      row = row + 1
      let heroRow = 0
      let heroCol = 0
      let table = []
      if (arrayDemo[row][col] === '' || arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        row = row - 1
        arrayDemo[row][col] = ''
        heroRow = row + 1
        heroCol = col
      }
      // Render Game Board'
      for (let i = 0; i < arrayDemo.length; i++) {
        let cols = []
        for (let j = 0; j < arrayDemo.length; j++) {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
        table.push(<tr id={i} key={i}>{cols}</tr>)
      }

      this.setState({
        matrix: table,
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol,
        countStep: this.state.countStep + 1
      })
    }
  }

  render () {
    return (
      <div className="App">
        <Header title="React Maze Game"></Header>
        <center>
          <div onClick={this.openModal} className="rg-btn">Play</div>
        </center>
        <div className="rg-modal">
          <div className="rg-modal-content">
            <div className="rg-modal-header">Board Size Input</div>
            <center>
              <input type="text" value={this.state.boardSize} onChange={e => this.handleChange(e)} className="rg-modal-input" placeholder="Enter Board Size"/>
            </center>
            <center>
              <div onClick={this.createBoard} className="rg-modal-btn">Enter</div>
            </center>
          </div>
        </div>
        <center>
          <table className="rg-table" tabIndex="0" onKeyUp={e => this.keyHandle(e)}>
            <tbody>
              {this.state.matrix}
            </tbody>
          </table>
        </center>
      </div>
    )
  }
}

export default App