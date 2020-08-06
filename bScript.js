let ListOfLinks = []
let uniqLinks = [];
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
/**
 * To do:
 * Option to edit text file with right menu click 
 */

//++++ Right Click Menu of extension 
// you can also add a onclick on the created() method but more info is needed
browser.menus.create({
  id:"CopyCat",
  title:"reset CC",
  contexts:['all']
}, ()=>{
  console.log("my Menu has been created!");
})
browser.menus.onClicked.addListener(()=>{ 
  //Reseting the Links to 0 when clicked
  browser.browserAction.setBadgeText({text:"0"})
  ListOfLinks = []
  uniqLinks = []
  console.log("menu was clicked!");
})

//++++++ My Extension Configs
browser.browserAction.onClicked.addListener((tab)=>{

  if(uniqLinks.length >= 15){
    browser.browserAction.setBadgeText({text:"RE"})
    let ArrWithoutCommas = uniqLinks.join(' ')

    //Insert links into a text file
    var blob = new Blob([ArrWithoutCommas], {type: "text/plain"})
    var url = window.URL.createObjectURL(blob);
    //Download Links
    browser.downloads.download({url:url, filename:`LINKS/${date}.txt`})
    //reset Array
    ListOfLinks = []
    uniqLinks = []
  }else{      
    //Adding Links to the array
    ListOfLinks.push(tab.url)
    //Removing the duplicate items
    uniqLinks = [...new Set(ListOfLinks)]
    console.log(uniqLinks);
    //Mini Icon on top    
    browser.browserAction.setBadgeText({text:uniqLinks.length.toString()})
  }
})

console.log(ListOfLinks);
console.log(uniqLinks);
