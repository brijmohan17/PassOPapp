import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setPasswordArray] = useState([]);


  const showPassword = () => {

    if (ref.current.src.includes("src/assets/eye1.png")) {
      passwordRef.current.type = 'text';
      ref.current.src = "src/assets/eyecross.png"
    } else {
      passwordRef.current.type = 'password';
      ref.current.src = "src/assets/eye1.png"
    }
  }
  const editPassword = (id) => {
    console.log("Editing password with id ", id);

    setForm({ ...passwordsArray.filter(item => item.id === id)[0], id: id });
    setPasswordArray(passwordsArray.filter(item => item.id != id));


  }
  const deletePassword = async (id) => {
    console.log("Delete the id ", id);
    let c = confirm("Do you want to delete this password");
    if (c) {
      setPasswordArray(passwordsArray.filter(item => item.id != id));

      // localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item=>item.id!=id)));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      console.log(passwordsArray.filter(item => item.id != id))

      toast('Delete successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });

    }
  }
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords);
  }
  useEffect(() => {
    getPasswords()


  }, [])

  const savePassword = async () => {


    // console.log(form)
    // add new password in passwordArray
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // if any such id exists in the database delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id })
      })
      setPasswordArray([...passwordsArray, { ...form, id: uuidv4() }])

      await fetch("http://localhost:3000/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })

      // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form,id:uuidv4()}]));
      console.log(([...passwordsArray, { ...form, id: uuidv4() }]))
      setForm({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    } else {
      toast('Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }

  }

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  const copyText = (text) => {
    toast('Copy to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    navigator.clipboard.writeText(text)
  }


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.2)] opacity-50 blur-[80px]"></div></div>

      <div className='p-2 md:p-0 md:mycontainer min-h-[83.4vh]'>
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-600'>
            &lt;
          </span>
          <span>
            Pass
          </span>
          <span className='text-green-600'>
            OP/&gt;
          </span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className=' text-black flex flex-col  p-4 gap-8 items-center'>
          <input className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text"
            placeholder='Enter website URL '
            value={form.site}
            onChange={handleChange}
            name='site'
            id='site'
          />
          <div className=' flex flex-col md:flex-row w-full justify-between gap-8 '>
            <input className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text"
              placeholder='Enter Username'
              value={form.username}
              onChange={handleChange}
              name='username'
              id='username' />
            <div className='relative '>

              <input ref={passwordRef} className='rounded-full border border-green-500 w-full p-4 py-1 ' type="password"
                placeholder='Enter Password'
                value={form.password}
                onChange={handleChange}
                name='password'
                id='password'
              />

              <span className='absolute right-0 top-0' onClick={showPassword}>

                <img ref={ref} className='p pt-1 m mr-2' width={"26px"} src="src/assets/eye1.png" alt="eye" />
              </span>
            </div>

          </div>
          <button onClick={savePassword} className='flex justify-center item-center bg-green-500 hover:bg-green-400  rounded-full px-8 py-2 w-fit gap-2 border hover:border-green-900'>

            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>
            <span className='m my-1 
            '>
              Save Password
            </span>
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

          {passwordsArray.length === 0 && <div> No Password to show</div>}
          {passwordsArray.length != 0 &&
            <table className="table-auto w-full">

              <thead className='bg-green-800 text-white rounded-md overflow-hidden'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>

                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {
                  passwordsArray.map((item, index) => {
                    return <tr key={index}>
                      <td className='py-2 border border-white text-center w-32'>

                        <div className='flex item-center justify-center'>

                          <a href={item.site} target='_blank'>{item.site}</a>
                          <div className='lordiconcopy size-7 cursor-pointer'
                            onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px", height: "25px", paddingTop: "3px",
                                paddingLeft: "3px"
                              }}
                            >
                            </lord-icon>
                          </div>
                        </div>



                      </td>
                      <td className='py-2 border border-white text-center w-32'>

                        <div className='flex item-center justify-center '>
                          <span className='truncate'>{item.username}</span>
                          <div className='lordiconcopy size-7 cursor-pointer'
                            onClick={() => { copyText(item.username) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px", height: "25px", paddingTop: "3px",
                                paddingLeft: "3px"
                              }}
                            >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center w-32'>
                        <div className='flex item-center justify-center'>
                          <span> {item.password}</span>
                          <div className='lordiconcopy size-7 cursor-pointer'
                            onClick={() => { copyText(item.password) }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px", height: "25px", paddingTop: "3px",
                                paddingLeft: "3px"
                              }}
                            >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center w-32'>
                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#121131,tertiary:#121131,quaternary:#121131,quinary:#3a3347"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </span>
                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>

                        </span>
                      </td>
                    </tr>
                  })
                }


              </tbody>
            </table>
          }
        </div>
      </div>



    </div>


  )
}

export default Manager
