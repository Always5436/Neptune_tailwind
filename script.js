//html editing 

//selectors
// const root = document.querySelector('#app');
const add = document.querySelector('.table-body')
const app = document.querySelector('table');

const addbtn = document.querySelector('.add');

const fileInput = document.getElementById('file-input');
let arr = JSON.parse(localStorage.getItem('docs')) || [];
// let arr =[];
let list = arr.length;
let profile = JSON.parse(localStorage.getItem('profile')) || [{logo:"assets/icons/Group 79.svg",name:"Jessica Thompson"}];

let delbtn;
let entry = {};

//functions

//function to hide the side bar 
const side = document.querySelector('.side');
const sign = document.querySelector('.close-menu')
const close = document.querySelector('.left-icon');
close.addEventListener('click',(e)=>{
    let img = side.classList.toggle('hidd');
    if(img){
        sign.src = 'assets/icons/bars-solid.svg';
    }
    else{
        sign.src = 'assets/icons/angle-left-solid.svg';
    }
    

})

//storage function
function storeProfile(profile){
    localStorage.setItem('profile',JSON.stringify(profile));
}
function saveToStorage(arr){
    localStorage.setItem('docs',JSON.stringify(arr));
}

function addZero(value){
    return value >9 ? `${value}`:`0${value}`;
}

function renderList (arr){
    let listEntry = '';
    arr.forEach((ele,i)=> {
        listEntry += `
        <tr class="tb h-fit" data-id="${i}">
            <td class="check text-center w-[83px]" id="c1"><input type="checkbox" value="false"></td>
            <td class="docName" id="c2">${ele.docName}</td>
            <td class="status" id="c3"><button class="${ele.status}">${ele.status}</button></td>
            <td class="mod" id="c4"><p>${ele.modDate}<br>${ele.modTime}</p></td>
            <td class="final-ele flex justify-center h-full" id="c5">
                <button class="down text-base text-center border-1 h-fit self-center border-slate-600 rounded-xl w-30"><p><span class="text-slate-600" id=down>${ele.down}</span></p></button>
                <img class="h-fit self-center" src="./assets/icons/delete-button.svg" class="del">
            </td>
        </tr>
        `
    });
    // root.nextElementSibling.innerHTML = listEntry;
    delbtn = document.querySelector('.del');
    add.innerHTML = listEntry;

}

function stat(){
    let s = prompt(`Enter the status: 
    1 for Pending, 
    2 for Completed, 
    3 for Need Signing`,"1");
    
    switch (s){
        case "1" :
            return 'Pending';
        
        case "2" :
            return 'Completed';

        case "3":
            return 'Need Signing';
        default:
            return null;

    };
}

function down(s){
    return s == "Pending"? "Preview":
        s == "Completed"? "Download PDF" : "Sign now";
}


function addList(){
    fileInput.click();
}


fileInput.addEventListener('change', (event) => {
    if (event.target.files.length === 0) {
        return;
    }

    entry = {};
    let fileName = event.target.files[0]?.name;
    fileName = fileName.split(".") || undefined;
    fileName = fileName[0];
    
    entry.docName = fileName;
    let d = new Date();
    entry.modDate = `${addZero(d.getFullYear())}/${addZero(d.getMonth() + 1)}/${addZero(d.getDate())}`;
    let am = d.getHours() > 12 ? 'pm' : 'am';
    let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    entry.modTime = `${addZero(hour)}:${addZero(d.getMinutes())}${am}`;

    entry.status = stat();
    
    entry.down = down(entry.status);
    
    if(entry.status == null){ return;}

    arr.push(entry);

    saveToStorage(arr);
    renderList(arr);
});


function delRow(event){
    // console.log(event.target.nodeName);  
    if(event.target.nodeName.toLowerCase() !== 'img'){
        return;
    }
    const id = parseInt(event.target.parentNode.parentNode.getAttribute('data-id'),10);
    if(window.confirm(`Delete row${id}?`)){
        arr = arr.filter((ele,i) => i !== id);
        renderList(arr);
        saveToStorage(arr);
    }
}





// init
function init(){

    renderList(arr);

    addbtn.addEventListener('click',addList);

    add.addEventListener('click',delRow);


}

init();