//get elements from dom and make them in a const 
const formid=document.getElementById('formid')
const nameemp= document.getElementById('name')
const email= document.getElementById('email')
const mobile=document.getElementById('telephone')
const tablebody=document.querySelector("#tableDT tbody")

const submit= document.getElementById('submit')
const countedit=document.getElementById('countedit')

//using oop to create class employee

class Employee{
    constructor(id,name,email,mobile){
        this.id=id;
        this.name=name;
        this.email=email;
        this.mobile=mobile;
    }
//creat function to show data in table
    showData(){
        // create element tableRow to show data in table
       Employee.showhtml(this.id,this.name,this.email,this.mobile)
        return this;
    }
    //save data to localestorage
    storeEmployee(){
        const allData=JSON.parse(localStorage.getItem("employees")) ?? []
        allData.push({id:this.id,name:this.name,email:this.email,mobile:this.mobile})
        localStorage.setItem("employees",JSON.stringify(allData))
    }

    static showhtml(id,name,email,mobile){
         const tRow=document.createElement("tr")
        tRow.innerHTML=`
                    <th scope="row">${id}</th>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    <td>
                        <button class="btn btn-info edit" data-id="${id}" type="button">Edit</button>
                        <button class="btn btn-danger delete" data-id="${id}" type="button">Dellet</button> 
                    </td>
        `
        tablebody.appendChild(tRow)
    }
// set data from local storage and show it in table
static showAllEmployess(){
    if(localStorage.getItem("employees")){
        JSON.parse(localStorage.getItem('employees')).forEach(employe => {
            Employee.showhtml(employe.id,employe.name,employe.email,employe.mobile)
        });
    }
}

//update employee
 updateEmployee(id){
    const newElolyee={id:id,name:this.name,email:this.email,mobile:this.mobile}
    const UpdateData= JSON.parse(localStorage.getItem("employees")).map((employe)=>{
        if(employe.id==id){
            return newElolyee
        }
        return employe 
    })

    localStorage.setItem("employees",JSON.stringify(UpdateData))
 }
}
Employee. showAllEmployess()


formid.addEventListener("submit",(e)=>{
    e.preventDefault();
            //The preventDefault() method cancels the event if it is cancelable,
            // meaning that the default action that belongs to the event will not occur.
            // For example, this can be useful when: Clicking on a "Submit" button,
            // prevent it from submitting a form.
    

    //add new employee
    if (!countedit.value) {
            let id=Math.floor(Math.random()*10)
            const empl=new Employee(id,nameemp.value,email.value,mobile.value)
            empl.showData().storeEmployee()

    } 
    // Edit employee
    else {
        const id = countedit.value
        const empl=new Employee(id,nameemp.value,email.value,mobile.value)
        empl.updateEmployee(id)
        submit.value="Store This Data"
        tablebody.innerHTML=''
        Employee.showAllEmployess()
    }
            nameemp.value=''
            email.value=''
            mobile.value=''
   
})


//delet dtat from table 
tablebody.addEventListener("click",(e)=>{//add an event to table body
    if(e.target.classList.contains("delete")){//e-->contain the event,e.target-->give the element click on it
        //e.target.classList=get all the classes that element
        //if(e.target.classList.contains("delete"))--> chec if there is a class named "delete"
        const id=+e.target.getAttribute("data-id")//grt the id of element click on it - the + is for parse from string to intiger
        const emps=JSON.parse(localStorage.getItem("employees"))
        const newData=emps.filter(employe=>employe.id !==id)//return new data without the employe that have id aquale the id catched in click event
        localStorage.setItem("employees",JSON.stringify(newData))//store the newdata to localestorage
        e.target.parentElement.parentElement.remove()//remove the element targeted  
    }

    //edit data
    if(e.target.classList.contains("edit")){
const id=+e.target.getAttribute("data-id")//grt the id of element click on it - the + is for parse from string to intiger
        const emps=JSON.parse(localStorage.getItem("employees")).find(employe=>employe.id===id)
            countedit.value=id 
            nameemp.value=emps.name
            email.value=emps.email
            mobile.value=emps.mobile
            submit.value="Edit the Item"
        
    }
})