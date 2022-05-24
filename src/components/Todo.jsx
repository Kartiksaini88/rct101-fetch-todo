import React, { useEffect, useState } from 'react'
var count = 1
export const Todo = () => {
   let [todo , setodo] = useState([])
   let [inputtodo , setinput] = useState("")
   let [page ,setpage] = useState(0)
   let [pagedata ,setpagedata] = useState([])
   console.log(pagedata)
   let [search , setsearch ] = useState("")

   let gettodo = async ()=>{
       try {
           let res = await fetch("http://localhost:8080/todo")
           let data = await res.json()
           setodo(data)
          
       } catch (error) {
           console.log(error)
           
       }
   }

   useEffect(()=>{
    gettodo ()
   },[])
    
 let posttodo = async ()=>{
     try {
        let payload = {
            title:inputtodo,
            status:false
        }

         let res = await fetch("http://localhost:8080/todo",{
             method:"POST",
             headers:{
                 "content-type":"application/json"
             },
             body:JSON.stringify(payload)
         })
         gettodo ()
         setinput("")
     } catch (error) {
         console.log(error)
     }
 }

 let deletetodo = async (id)=>{
     try {
         let res = await fetch(`http://localhost:8080/todo/${id}`,{
             method:"DELETE",
             headers:{
                 "content-type":"application/json"
             },
             body:null
         })
     } catch (error) {
         console.log(error)
     }gettodo ()
 }

 let pagination = async ()=>{
    try {
       
        let res = await fetch(`http://localhost:8080/todo/${count}`)
        let data = await res.json()
        data = [data]
        setpagedata(data)
        count++
        
    } catch (error) {
        console.log(error)
        
    }
}

  return (
    <div>
        <input onChange={(e)=>{
            setsearch(e.target.value)
        }}  placeholder='search your todo'></input> <br/>
        <input onChange={(e)=>{setinput(e.target.value)}}  type="text" value={inputtodo} />
        <button disabled={!inputtodo} onClick={()=>{posttodo()}}>Submit</button>

        {todo.filter((e)=>e.title.includes(search)).map(e=><div><p>{e.title}</p><button onClick={()=>{deletetodo(e.id)}}>Delete</button></div>)}
        <br/>
        <button onClick={()=>{
            pagination()
        }}>Pagination</button>
        {pagedata.map(e=><p>{e.title}</p>)}
    </div>
  )
}
