import React ,{useEffect, useState} from 'react'
import './App.css';
import MaterialTable from 'material-table'



function App() {
  const url="http://localhost:4000/users"
  const [data, setData] = useState([])
  const columns=[
    { title: "Username", field: "username",validate:rowData=>rowData.username===undefined || rowData.username===""? "Required":true },
    { title: "Name", field: "name",validate:rowData=>rowData.name===undefined || rowData.name===""? "Required":true },
    { title: "Email", field: "email",validate:rowData=>rowData.email===undefined || rowData.email===""? "Required":true },
    { title: "Phone", field: "phone",validate:rowData=>rowData.phone===undefined || rowData.phone===""? "Required":true },
    { title: "Website", field: 'website',validate:rowData=>rowData.website===undefined || rowData.website===""? "Required":true }
  ]
  const fetchUser=()=>{
    fetch(url).then(resp => resp.json())
    .then(resp => setData(resp))
  }
  useEffect(()=>{
     fetchUser()
  },[])
  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
   <div>
   <MaterialTable
    columns={columns}
    data={data}
    options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
  
    title="User Data"
    editable={{
        onRowAdd:(newData)=>new Promise((resolve,reject)=>{
          fetch(url, {
            method: "POST",
            headers: {
              'Content-type': "application/json"
            },
            body: JSON.stringify(newData)
          }).then(resp => resp.json())
            .then(resp =>{fetchUser()
              resolve()
            })
        }),

        onRowDelete: (oldData) => new Promise((resolve, reject) => {
          //Backend call
          fetch(url + "/" + oldData.id, {
            method: "DELETE",
            headers: {
              'Content-type': "application/json"
            },

          }).then(resp => resp.json())
            .then(resp => {
              fetchUser()
              resolve()
            })
        }),

        onRowUpdate:(newData,oldData)=>new Promise((resolve,reject)=>{
          fetch(url + "/" + oldData.id,{
            method:"PUT",
            headers: {
              'Content-type': "application/json"
            },
            body: JSON.stringify(newData)
          }).then(resp=>resp.json())
          .then(resp=>{
            fetchUser()
            resolve()
          })
        })

        

    }}
    />
    
   </div>
   </>
  );
}

export default App;
