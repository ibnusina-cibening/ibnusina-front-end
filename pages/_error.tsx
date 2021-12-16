function Error({ statusCode }:{statusCode:any}) {
    return (
      <p>
        {statusCode
          ? `Error ${statusCode} terjadi pada server`
          : 'Error terjadi di client'}
      </p>
    )
  }
  
  Error.getInitialProps = ({ res, err }:{res:any, err:any}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error