function FormatDate(dateString) {
    const dd = new Date(+dateString);
    // return <div>{dd.toDateString()}</div>
    return dd.toDateString();
}
export default FormatDate;