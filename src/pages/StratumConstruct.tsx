import {Button, Card, Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getRandomExtraNonce2} from "../utils";

export function StratumConstruct() {
    const [extraNonce1, setExtraNonce] = useState<string>("");
    const [extraNonce2Size, setExtraNonce2Size] = useState<number>(0);
    const [jobID, setJobID] = useState<string>("");
    const [prevHash, setPrevHash] = useState<string>("");
    const [coinb1, setCoinb1] = useState<string>("");
    const [coinb2, setCoinb2] = useState<string>("");
    const [merkleTree,setMerkleTree] = useState<string[]>([]);
    const [version,setVersion] = useState<string>("");
    const [nBits,setNBits] = useState<string>("");
    const [nTime,setNTime] = useState<string>("");
    const [extraNonce2,setExtraNonce2] = useState<string>("");

    useEffect(() => {
        setExtraNonce2(getRandomExtraNonce2(extraNonce2Size));
    }, [extraNonce2Size]);

    return (
        <Paper>
            <Typography variant="h5" gutterBottom>Stratum Workstring Construction</Typography>
            <Paper elevation={3}>
                <Typography variant="h6" gutterBottom>mining.subscribe</Typography>
                <p>
                    <TextField label="Extra Nonce 1" variant="standard" value={extraNonce1} onChange={(event) => setExtraNonce(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Extra Nonce 2 Size" variant="standard" value={extraNonce2Size}  type="number"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               onChange={(event) => setExtraNonce2Size(parseInt(event.target.value))}/>
                </p>
            </Paper>

            <Paper elevation={3}>
                <Typography variant="h6" gutterBottom>mining.notify</Typography>
                <p>
                    <TextField label="Job ID" variant="standard" value={jobID} onChange={(event) => setJobID(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Previous Hash ID" variant="standard" value={prevHash} onChange={(event) => setPrevHash(event.target.value)} fullWidth/>
                </p>
                <p>
                    <TextField label="Coinbase Part 1" variant="standard" value={coinb1} onChange={(event) => setCoinb1(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Coinbase Part 2" variant="standard" value={coinb2} onChange={(event) => setCoinb2(event.target.value)}/>
                </p>
                <p>
                    <Button variant="contained" onClick={()=> {setMerkleTree((prevState)=>[...prevState,""])}}>Add Merkle</Button>
                    <ul>
                        {
                            merkleTree.map( (merkle, index) => (
                                <li key={index} >
                                    <TextField label="Merkle Hash" variant="standard" value={merkle} onChange={(event) => {
                                        setMerkleTree((prevState) => {
                                            var tmp=[...prevState];
                                        tmp[index]=event.target.value;
                                        return tmp;})
                                    }} fullWidth />
                                    <Button variant="outlined" onClick={()=>{setMerkleTree((prevState) => [...prevState].filter((_,i)=>i!==index))}}>Remove</Button>
                                </li>
                                    )) }
                    </ul>
                </p>
                <p>
                    <TextField label="Version" variant="standard" value={version} onChange={(event) => setVersion(event.target.value)}/>
                </p>
                <p>
                    <TextField label="nBits" variant="standard" value={nBits} onChange={(event) => setNBits(event.target.value)}/>
                </p>
                <p>
                    <TextField label="nTime" variant="standard" value={nTime} onChange={(event) => setNTime(event.target.value)}/>
                </p>
            </Paper>
            <Paper elevation={3}>
                <Typography variant="h6" gutterBottom>Miner Initial Workstring</Typography>
                <Typography>Extra Nonce2: {extraNonce2}</Typography>
            </Paper>
        </Paper>
    )
}