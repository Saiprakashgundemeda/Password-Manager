import {Component} from 'react'
import './App.css'
import {v4} from 'uuid'

const totalColorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    totalLatestList: [],
    website: '',
    userName: '',
    password: '',
    isTrue: false,
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  addContact = event => {
    event.preventDefault()
    const {userName, website, password} = this.state
    const totalInitial = website.slice(0, 1).toUpperCase()
    const totalClassValue = totalColorList[Math.floor(Math.random() * 5)]
    const totalNewValues = {
      id: v4(),
      initial: totalInitial,
      username: userName,
      webSite: website,
      Password: password,
      classAdd: totalClassValue,
    }
    this.setState(prevState => ({
      totalLatestList: [...prevState.totalLatestList, totalNewValues],
      website: '',
      userName: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {totalLatestList} = this.state
    const mainNewList = totalLatestList.filter(eachValue => eachValue.id !== id)
    const totalCaseOf = mainNewList.length !== 0
    this.setState({totalLatestList: mainNewList, isTrue: totalCaseOf})
  }

  render() {
    const {
      totalLatestList,
      website,
      userName,
      password,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const mainNewList = totalLatestList.filter(eachValue =>
      eachValue.webSite.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (mainNewList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="main-div-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="main-div-container-img1"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.addContact}>
            <h1 className="main-heading">Add New Password</h1>
            <div className="main-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-icon"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="main-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-icon"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                value={userName}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="main-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-icon"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="main-div-container-img2"
            alt="password manager"
          />
        </div>
        <div className="main-div-container2">
          <div className="first-container">
            <div className="password-head">
              <h1 className="password-title">Your Passwords</h1>
              <p className="count-passwords">{mainNewList.length}</p>
            </div>
            <div className="main-input-container2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-icon"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-total-password-section">
            <input
              type="checkbox"
              className="checkbox-icon"
              id="check"
              onChange={this.onChangeShowPassword}
            />
            <label htmlFor="check" className="show-password-para">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-password-image"
                alt="no passwords"
              />
              <p className="no-password-para">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="total-list-section">
              {mainNewList.map(eachValue => (
                <li className="total-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`totalInitial ${eachValue.classAdd}`}>
                    {eachValue.initial}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.webSite}</p>
                    <p className="username">{eachValue.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-images"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    className="main-button-icon"
                    type="button"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
