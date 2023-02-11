
 function  Header ({title}) {
  return (
    <div className="Header">
      <header style={styles.header}>
        <nav>
            <h2> {title} </h2>
        </nav>
        </header>

    </div>
  );
}

export default Header;

const styles = {
    header: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center'
      }
}
 
