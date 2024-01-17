import React, { useEffect,Fragment, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UserDatalist from '../db.json'
import './home.css';
const Home = () => {
    const [data,setData]=useState([])
    const [alert,setAlert]=useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [update,setUpdate]=useState()
    const [formData, setFormData]=useState({
        firstName:"",
        lastName:"",
        description:""

    })

    const columns= [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'description', headerName: 'Description', width: 250 },
      
        {
            title: "Action",
            field: "Action",
            width: 100,
            renderCell: () => (
              <Fragment>
                <Button onClick={() => setShowDialog(true)}>
                  <EditIcon />
                </Button>
              </Fragment>
            ),
          },
          {
            title: "Delete",
            field: "Delete",
            width: 100,
            renderCell: () => (
              <Fragment>
                <Button color="error" onClick={() => setAlert(true)}>
                  <DeleteIcon />
                </Button>
              </Fragment>
            ),
          },
     
      ];

      const apiUrl = "http://localhost:333/UserList";
// ==================================================Post api Here================================================================
      const handleChange= (e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
      };

console.log(formData)


      const addUser = async(e)=>{
        e.preventDefault();
        try{
           const response= await axios.post(apiUrl,formData);
            console.log(response.data)
            userList()
            setFormData({ firstName: '', lastName: '' ,description:'',});
            toast.success('data added successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                 className: 'green-toast', 
                // transition: Bounce,
                });
        }
        catch(error){
          console.log(error)  
        }
      }
// ==================================================update api here=====================================================================================
const updateData= (e)=>{
    setUpdate({...update,[e.target.name]:e.target.value});
    console.log(update)
}
const updateRow  = async()=>{
    try{
    //    await axios.put(`http://localhost:333/UserList,${update.id}`,update).then((response)=>{
        //     })
        await axios.put(`http://localhost:333/UserList/${update.id}`, update).then((response)=>{
                console.log(response)

                setShowDialog(false)
    });
    }catch(error){
        console.log(error)
    }
    userList()
}

// ====================================================Delte api Here =================================================================================
const deleteRow = async (update)=>{
    try {
        await axios.delete(`http://localhost:333/UserList/${update.id}`,update)
        setAlert(false)
    } catch (error) {
        console.log(error)
        
    }
    userList()
}
// ==================================================Get api Here=======================================================================================

      const userList=async()=>{
        try{
            await axios.get(apiUrl)
            .then((response=>{
                const reverseData = response.data.reverse();
                setData(reverseData)
            }))
         
        } catch(error){
            console.log(error)
        }
      }
      useEffect(()=>{
        userList()
      },[])
  console.log(update)
    return (
        <>
{/* ====================================================Update Model Code Herer================================== */}
{update && (
              <Dialog open={showDialog} style={{ height: 600 }}>
                <DialogTitle>Update Data</DialogTitle>
                <DialogContent>
                  <form>
                    
                    <div className="row my-3 ">
                      <div className="col ">
                        <TextField
                          id="outlined-basic"
                          sx={{ width: 500 }}
                          label="First Name"
                          variant="outlined"
                          type="text"
                          required
                          name="firstName"
                          value={update.firstName}
                          onChange={updateData}
                         
                        />
                      </div>
                    </div>
                    
                    <div className="row my-3 ">
                      <div className="col ">
                        <TextField
                          id="outlined-basic"
                          sx={{ width: 500 }}
                          label="Last Name"
                          variant="outlined"
                          type="text"
                          required
                          name="lastName"
                          onChange={updateData}
                          value={update.lastName}
                         
                        />
                      </div>
                    </div>
                    
                    <div className="row my-3 ">
                      <div className="col ">
                        <TextField
                          id="outlined-basic"
                          sx={{ width: 500 }}
                          label="Description"
                          variant="outlined"
                          type="text"
                          required
                          name="description"
                          onChange={updateData}
                          value={update.description}
                         
                        />
                      </div>
                    </div>
                    
             
                 
                  
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" variant="contained" onClick={updateRow}>
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setShowDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            )}
                      
        
{/* ====================================================Delete Model code Herer================================== */}
{alert && (
              <Dialog open={alert} style={{ height: 600 }}>
                <DialogTitle>Delete Row</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are You sure You want to delete this.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={() => deleteRow(update)}>
                    Yes
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setAlert(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            )}
{/* ====================================================Form Code Herer================================== */}
<ToastContainer />
            <div className="container">
                <form onSubmit={addUser}>
                    <h1 className="text-center title font-family" mt-3 >Add User</h1>
                    <div className='mx-auto text-center'>
                        <div class="row">
                            <div class="col sm-6">
                                <TextField
                                    id="outlined-basic"
                                    sx={{ 
                                        width:'100%',
                                    maxWidth: '500Px' 
                                    }}
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    label="Enter your name"
                                    variant="outlined"
                                    required
                                />
                            </div>


                        </div>
                        <div class="row my-3">
                            <div class="col">
                                <TextField
                                    id="outlined-basic"
                                    sx={{ 
                                        width:'100%',
                                    maxWidth: '500Px' 
                                    }}
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    label="Enter your Last name"
                                    variant="outlined"
                                    required
                                />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col">
                            <TextareaAutosize
                            minRows={3} 
                            style={{
                            width: '100%', 
                            maxWidth: '500px'
                            }}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter your description"
                            required
                        />
                            </div>
                        </div>
                      
 {/* ===========================================Button=========================================================================================== */}
 <Stack
 spacing={2}
 direction="row"
 marginBottom={2}
 justifyContent="center">

    <Button variant="contained" type='submit'><SaveIcon className="mx-1" /> Save User</Button>
</Stack>
                    </div>

                </form>

            </div>
            
            {/* <div style={{ height: 400, width: '100%' }}> */}
            <div className='container' style={{ height: 400, width: '100%', margin: '0 auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(item)=>setUpdate(item.row)}
      />
    </div>
        </>
    )
}

export default Home