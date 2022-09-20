import React from "react";
import {useEffect, useState} from "react";
import {hash_sha256d, hexToData} from "../utils";
import {Paper, TextField} from "@mui/material";


function Sha256d() {
    const [input,setInput]=useState<string>("");
    const [sha,setSha] = useState<string>("");
    useEffect(() => {
        async function tmp() {
            if(input!=="") {
                try {
                    setSha(await hash_sha256d(new Uint8Array(hexToData(input))));
                } catch (e) {
                    setSha(e as string);
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
        <Paper>
            <p>
                Input Hex data to be sha256d'd here
            </p>
            <p>
                <TextField onChange={(event)=>setInput(event.target.value)} value={input} multiline size="medium" fullWidth />
            </p>
            <p>
                It will become
            </p>
            <p>
                <TextField value={sha} aria-readonly={true} multiline size="medium" fullWidth/>
            </p>
        </Paper>
    );
}

export default Sha256d;