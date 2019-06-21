export const formatUnix = (secs: number): string => {
    var date = new Date(secs * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
  
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }