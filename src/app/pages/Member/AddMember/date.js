export const formatDate = (dateString) => {
    console.log(dateString,'dateString');
    const date = new Date(dateString);
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    // console.log(`${month}-${day}-${year}`);
    return `${day}-${month}-${year}`;
};