function Error({ statusCode }:{statusCode:any}) {
    // error di sini dapat terjadi juga karena user login di satu device
    // kemudian logout di device lain. Session pada device sebelumnya "expired"
    // Sehingga aktivitas interaktif seperti mengirim komentar mengalami error. 
    // Nanti perlu dipikirkan cara mengupdate session secara otomatis ketika session di device lain expired. 
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