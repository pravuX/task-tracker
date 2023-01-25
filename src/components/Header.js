import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  const lmao = () => {
    console.log('from header')
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Add' onClick={lmao} />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

// for inline styles
// const headingStyle = {
//   color: 'white',
//   backgroundColor: 'red',
// }

export default Header