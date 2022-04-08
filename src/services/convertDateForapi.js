export const convertDateForapi = (date) => {
  var date = JSON.stringify(date);
  // console.log(date , "date come from out");
  //            if(date===null){
  //                      return "NAN"
  //                  }
  //             const year = date.slice(11,15)
  // const day = date.slice(8,10)
  // let month  = date.slice(4,7)

  // if(month ==="Jan"){
  //     month = "01"
  // }else if(month ==="Feb"){
  //       month = "02"
  // }else if(month ==="Mar"){
  //       month = "03"
  // }else if(month ==="Apr"){
  //       month = "04"
  // }else if(month ==="May"){
  //       month = "05"
  // }else if(month ==="Jun"){
  //       month = "06"
  // }else if(month ==="Jul"){
  //       month = "07"
  // }else if(month ==="Aug"){
  //       month = "08"
  // }else if(month ==="Sep"){
  //       month = "09"
  // }else if(month ==="Oct"){
  //       month = "10"
  // }else if(month ==="Nov"){
  //       month = "11"
  // }else if(month ==="Dec"){
  //       month = "12"
  // }
  // // const Date = `${year}-${day}-${month}T${date.slice(16, 24 )}`

  return date.slice(1, 20);
};
