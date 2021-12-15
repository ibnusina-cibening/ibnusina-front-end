function Error({ statusCode }) {
    return (
      <p>
        {statusCode
          ? `Error ${statusCode} terjadi pada server`
          : 'Error terjadi di client'}
      </p>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error