import {Button,  Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {calculateRoot, flipHex, getRandomExtraNonce2, hash_sha256d, hexToData} from "../utils";

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
    const [coinbase,setCoinbase] = useState<string>("");
    const [coinbaseHash,setCoinbaseHash] = useState<string>("");
    const [merkleRoot,setMerkleRoot] = useState<string>("");
    const [nonce,setNonce] = useState<string>("");
    const [workstring, setWorkstring]=useState<string>("");
    const [hash, setHash]=useState<string>("");

    useEffect(()=> {
        async function tmp() {
            const coinbaseTmp=coinb1+extraNonce1+extraNonce2+coinb2;
            setCoinbase(coinbaseTmp);
            try {
                setCoinbaseHash(await hash_sha256d(new Uint8Array(hexToData(coinbaseTmp))));
            } catch (e) {
                setCoinbaseHash((e as Error).toString());
            }
        }
        tmp();
    },[coinb1,extraNonce2,coinb2, extraNonce1]);

    useEffect(()=> {
        async function tmp(){
            try {
                const setval=await calculateRoot(merkleTree,coinbaseHash);
                setMerkleRoot(setval);
            } catch (e) {
                setMerkleRoot((e as Error).toString());
            }
        }
        tmp();
    },[coinbaseHash,merkleTree]);

useEffect(()=> {
    async function tmp() {
        try {
            const tempWorkstring=flipHex(version)+prevHash+merkleRoot+flipHex(nTime)+flipHex(nBits)+flipHex(nonce);
            setWorkstring(tempWorkstring);
            const tempHash=await hash_sha256d(new Uint8Array(hexToData(tempWorkstring)));
            setHash(tempHash);
        } catch (e) {
            setWorkstring((e as Error).toString());
        }
    }
    tmp();
},[version,prevHash,merkleRoot,nTime,nBits,nonce]);


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
                    <TextField label="Coinbase Part 1" variant="standard" value={coinb1} onChange={(event) => setCoinb1(event.target.value)} fullWidth/>
                </p>
                <p>
                    <TextField label="Coinbase Part 2" variant="standard" value={coinb2} onChange={(event) => setCoinb2(event.target.value)} fullWidth/>
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
                <Typography variant="h6" gutterBottom>mining.submit</Typography>
                <p>
                    <TextField label="Nonce" variant="standard" value={nonce} onChange={(event) => setNonce(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Extra Nonce 2" variant="standard" value={extraNonce2} onChange={(event) => setExtraNonce2(event.target.value)}/>
                    <Button variant="contained" onClick={()=> {
                        setExtraNonce2(getRandomExtraNonce2(extraNonce2Size));
                    }} >Randomize</Button>
                </p>
            </Paper>
            <Paper elevation={3}>
                <p>
                <Typography variant="h6" gutterBottom>Miner Initial Workstring</Typography>
                <Typography>
                    Coinbase: {coinbase} </Typography>
            </p>
                <p>
                    <Typography>
                    Coinbase Hash: {coinbaseHash}</Typography>
                </p>
                        <p>
                            <Typography>
                    Merkle Root: {merkleRoot}</Typography>
                        </p>

                <p>
                    <Typography style={{
                        overflowWrap: "break-word"
                    }}>
                        Workstring: {workstring}</Typography>
                </p>
                <p>
                    <Typography style={{
                        overflowWrap: "break-word"
                    }}>
                        Hash: {hash}</Typography>
                </p>
            </Paper>
        </Paper>
    )
}
