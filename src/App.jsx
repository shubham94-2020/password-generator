import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numallow, setnum] = useState(false);
  const [charallow, setchar] = useState(false);
  const [password,setpassword]=useState("");
  const passwordgenerator = useCallback(
    function () {
      let pass="";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      console.log("done");
      if (numallow) {
        str += "1234567890";
      }
      if (charallow) {
        str += "!@#$%^&*()?|><";
      }
      for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(index);
      }
      setpassword(pass);
    },
    [length, numallow, charallow,setpassword] //set passward is for optimisation
  );
    function copy_pass ()
    {
      console.log(password);
      inputref.current.focus();
      window.navigator.clipboard.writeText(password);
      inputref.current?.setSelectionRange(0,20);
      inputref.current?.select();
    }
useEffect(()=>{passwordgenerator()},[length, numallow, charallow,passwordgenerator]);
const inputref=useRef(null);
  return (
    <>
      <div className="bg-gray-700 w-max h-max rounded-xl">
        <p className="text-xl p-2">password generator</p>
        <div className="flex  space-x-10 p-5">
          <input
            type="text"
            className="rounded-xl h-10 cursor-auto"
            placeholder="password"
            value={password}
            readOnly
            ref={inputref}
          />
          <button onClick={copy_pass}>copy</button>
        </div>
        <div className="p-3 flex space-x-3 pr">
          {/* ////////////input////////////////// */}
          <input type="range" min={8} max={100} className="bg-white" placeholder="password" onChange={(event)=>
          {
            setlength(event.target.value);
          }}/>
          <label>Length:{length}</label>
          {/* /////////////checkbox//////////////////// */}
          <input type="checkbox" defaultChecked={numallow} onChange={()=>
          { 
            setnum((prev)=>!prev);
            console.log("numallow-",numallow);
          }}/>
          <label> Number</label>
          <input type="checkbox" defaultChecked={charallow} onChange={()=>
          {
            setchar((prev)=>!prev);
            console.log("charallow-",charallow)
          }}/>
          <label> char</label>
          {/* /////////////////////////////////////////////// */}
        </div>
      </div>
    </>
  );
}

export default App;
