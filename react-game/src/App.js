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
      countStep: 0,
      opponentCount: 0
    }
    this.openModal = this.openModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.keyHandle = this.keyHandle.bind(this)
    this.focus = this.focus.bind(this)
    this.board = this.board.bind(this)
  }

  // Open Board Size Modal
  openModal = () => {
    let modal = document.getElementsByClassName('rg-modal')[0]
    modal.style.display = 'block'
    let btn = document.getElementsByClassName('rg-modal-btn')[0]
    btn.onclick = () => {
      modal.style.display = 'none'
      this.focus()
    }
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
      }
    }
    this.setState({
      boardSize: 0,
      matrix: [],
      dataGrid: [],
      heroPositionRow: 0,
      heroPositionCol: 0,
      countStep: 0,
      opponentCount: 0
    })
  }
  // End

  // Open Game Over Modal
  openEndModal = () => {
    let modal = document.getElementsByClassName('rg-end-modal')[0]
    modal.style.display = 'block'
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
      }
    }
  }
  // End

  // Handle Change
  handleChange = (e) => {
    this.setState({
      boardSize: e.target.value
    })
  }
  // End

  // Render Initial Game Board
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
    // End

    // Place Opponents Randomly
    let row = 0
    let col = 0
    let l = 0
    let opCount = 0
    while (l < (this.state.boardSize * this.state.boardSize)) {
      row = Math.floor((Math.random() * (this.state.boardSize - 1)) + 1)
      col = Math.floor((Math.random() * (this.state.boardSize - 1)) + 1)
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hi'
        opCount = opCount + 1
      }
      l = l + 1
    }
    // End

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
    // End

    // Render Game Board'
    for (let i = 0; i < arrayDemo.length; i++) {
      let cols = []
      for (let j = 0; j < arrayDemo.length; j++) {
        if (arrayDemo[i][j] === 'hi') {
          cols.push(<td className="rg-table-data" id={j} key={j}><i className="fas fa-male rg-table-op"></i></td>)
        } else if (arrayDemo[i][j] === 'hero') {
          cols.push(<td className="rg-table-data" id={j} key={j}><i className="fas fa-male rg-table-hero"></i></td>)
        } else if (arrayDemo[i][j] === '') {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
      }
      table.push(<tr id={i} key={i}>{cols}</tr>)
    }
    // End

    // Update State
    this.setState({
      matrix: table,
      dataGrid: arrayDemo,
      heroPositionRow: heroRow,
      heroPositionCol: heroCol,
      opponentCount: opCount
    })
    // End
  }
  // End

  // Focus Table
  focus = () => {
    this.tableFocus.focus()
  }
  // End

  // Board Rendering
  board = (arrayDemo) => {
    let table = []
    for (let i = 0; i < arrayDemo.length; i++) {
      let cols = []
      for (let j = 0; j < arrayDemo.length; j++) {
        if (arrayDemo[i][j] === 'hi') {
          cols.push(<td className="rg-table-data" id={j} key={j}><i className="fas fa-male rg-table-op"></i></td>)
        } else if (arrayDemo[i][j] === 'hero') {
          cols.push(<td className="rg-table-data" id={j} key={j}><i className="fas fa-male rg-table-hero"></i></td>)
        } else if (arrayDemo[i][j] === '') {
          cols.push(<td className="rg-table-data" id={j} key={j}>{arrayDemo[i][j]}</td>)
        }
      }
      table.push(<tr id={i} key={i}>{cols}</tr>)
    }
    return table
  }
  // End

  // Board Key EventHandler
  keyHandle = (e) => {
    let arrayDemo = this.state.dataGrid
    let row = this.state.heroPositionRow
    let col = this.state.heroPositionCol
    let heroRow = 0
    let heroCol = 0

    if (e.keyCode === 38) {
      row = row - 1
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hero'
        row = row + 1
        arrayDemo[row][col] = ''
        heroRow = row - 1
        heroCol = col
        this.setState({
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        row = row + 1
        arrayDemo[row][col] = ''
        heroRow = row - 1
        heroCol = col
        this.setState({
          opponentCount: this.state.opponentCount - 1,
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] !== 'hi' || arrayDemo[row][col] !== '') {
        row = row + 1
        arrayDemo[row][col] = 'hero'
        heroRow = row
        heroCol = col
        if (this.state.countStep === 0) {
          this.setState({
            countStep: 0
          })
        } else {
          this.setState({
            countStep: this.state.countStep - 1
          })
        }
      }
      this.setState({
        matrix: this.board(arrayDemo),
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol
      })

      if (this.state.opponentCount === 1) {
        this.openEndModal()
      }

    } else if (e.keyCode === 37) {
      col = col - 1
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hero'
        col = col + 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col - 1
        this.setState({
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        col = col + 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col - 1
        this.setState({
          opponentCount: this.state.opponentCount - 1,
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] !== 'hi' || arrayDemo[row][col] !== '') {
        col = col + 1
        arrayDemo[row][col] = 'hero'
        heroRow = row
        heroCol = col
        if (this.state.countStep === 0) {
          this.setState({
            countStep: 0
          })
        } else {
          this.setState({
            countStep: this.state.countStep - 1
          })
        }
      }
      this.setState({
        matrix: this.board(arrayDemo),
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol
      })

      if (this.state.opponentCount === 1) {
        this.openEndModal()
      }

    } else if (e.keyCode === 39) {
      col = col + 1
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hero'
        col = col - 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col + 1
        this.setState({
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        col = col - 1
        arrayDemo[row][col] = ''
        heroRow = row
        heroCol = col + 1
        this.setState({
          opponentCount: this.state.opponentCount - 1,
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] !== 'hi' || arrayDemo[row][col] !== '') {
        col = col - 1
        arrayDemo[row][col] = 'hero'
        heroRow = row
        heroCol = col
        if (this.state.countStep === 0) {
          this.setState({
            countStep: 0
          })
        } else {
          this.setState({
            countStep: this.state.countStep - 1
          })
        }
      }
      this.setState({
        matrix: this.board(arrayDemo),
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol
      })

      if (this.state.opponentCount === 1) {
        this.openEndModal()
      }

    } else if (e.keyCode === 40) {
      row = row + 1
      if (arrayDemo[row][col] === '') {
        arrayDemo[row][col] = 'hero'
        row = row - 1
        arrayDemo[row][col] = ''
        heroRow = row + 1
        heroCol = col
        this.setState({
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] === 'hi') {
        arrayDemo[row][col] = 'hero'
        row = row - 1
        arrayDemo[row][col] = ''
        heroRow = row + 1
        heroCol = col
        this.setState({
          opponentCount: this.state.opponentCount - 1,
          countStep: this.state.countStep + 1
        })
      } else if (arrayDemo[row][col] !== 'hi' || arrayDemo[row][col] !== '') {
        row = row - 1
        arrayDemo[row][col] = 'hero'
        heroRow = row
        heroCol = col
        if (this.state.countStep === 0) {
          this.setState({
            countStep: 0
          })
        } else {
          this.setState({
            countStep: this.state.countStep - 1
          })
        }
      }
      this.setState({
        matrix: this.board(arrayDemo),
        dataGrid: arrayDemo,
        heroPositionRow: heroRow,
        heroPositionCol: heroCol
      })

      if (this.state.opponentCount === 1) {
        this.openEndModal()
      }
    }
    // End
  }
  // End

  // Final View
  render () {
    return (
      <div className="App">
        <Header title="Welcome to React Maze Game"></Header>
        <center>
          <div onClick={this.openModal} className="rg-btn">Play</div>
        </center>
        <div className="rg-modal">
          <div className="rg-modal-content">
            <div className="rg-modal-header">Enter Board Size</div>
            <center>
              <input type="text" value={this.state.boardSize} onChange={e => this.handleChange(e)} className="rg-modal-input" placeholder="Enter Board Size"/>
            </center>
            <center>
              <div onClick={this.createBoard} className="rg-modal-btn">Enter</div>
            </center>
          </div>
        </div>
        <center>
          <table className="rg-table" tabIndex="0" ref={(table) => { this.tableFocus = table }} onKeyUp={e => this.keyHandle(e)}>
            <tbody>
              {this.state.matrix}
            </tbody>
          </table>
        </center>
        <div className="rg-end-modal">
          <div className="rg-end-modal-content">
            <div className="rg-end-modal-header">Game Over</div>
            <center>
              <div className="rg-end-modal-text">You took <b>{this.state.countStep}</b> steps to win the battle :)</div>
            </center>
          </div>
        </div>
      </div>
    )
  }
  // End
}

export default App