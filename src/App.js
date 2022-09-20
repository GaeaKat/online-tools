import './App.css';
import {useEffect, useState} from "react";
function hexToData(hex) {
    var bytes = [];
    if (!hex.match(/^[0-9a-fA-F]+$/)) {
       throw new Error('is not a hex string.');
       // return bytes;
    }
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    for (var n = 0; n < hex.length; n += 2) {
        var code = parseInt(hex.substr(n, 2), 16)
        bytes.push(code);
    }
    return bytes;
}
function hash(data) {
    return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}

function App() {
  const [input,setInput]=useState("");
  const [sha,setSha] = useState("");


    useEffect(() => {
        async function tmp() {
            if(input!=="") {
                try {
                    setSha(await hash(new Uint8Array(hexToData(await hash(new Uint8Array(hexToData(input)))))));
                } catch (e) {
                    setSha(e);
                }
            }
            else {
                setSha("");
            }
        }
        tmp();
        return ()=>{};
    }, [input]);
  return (
    <div className="App">
        <p>
      Input Hex data to be sha256d'd here
        </p>
        <p>
      <textarea onChange={(event)=>setInput(event.target.value)} value={input} />
        </p>
        <p>
        It will become
        </p>
        <p>
        <textarea value={sha} readOnly/>
        </p>
    </div>
  );
}

export default App;
