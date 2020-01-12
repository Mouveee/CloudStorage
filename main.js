let i = 5;

window.onload = function () {
  let mainMenu = document.getElementsByClassName('sf-mainMenu');
  this.console.log(mainMenu[0].className)
  mainMenu[0].className += ' visible'
  this.console.log(++i)
}