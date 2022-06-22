import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
