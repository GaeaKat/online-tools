import React from "react";
import {useEffect, useState} from "react";
import {hash_sha256d, hexToData} from "../utils";
import {Paper, TextField, Typography} from "@mui/material";


function Construct() {
    const [version, setVersion] = useState<string>("");
    const [prevHash, setPrevHash] = useState<string>("");
    const [merkleRoot, setMerkleRoot] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [nBits, setNBits] = useState<string>("");
    const [nonce, setNonce] = useState<string>("");

    const output=`${version}${prevHash}${merkleRoot}${time}${nBits}${nonce}`;
    return (
        <Paper>
            <Typography variant="h6" gutterBottom>
                Header Construction
            </Typography>
            <Paper elevation={1}>
                <p>
                    <TextField label="Version" variant="standard" value={version} onChange={(event) => setVersion(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Previous Hash" variant="standard" fullWidth value={prevHash} onChange={(event) => setPrevHash(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Merkle Root" variant="standard" fullWidth value={merkleRoot} onChange={(event) => setMerkleRoot(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Time" variant="standard" value={time} onChange={(event) => setTime(event.target.value)}/>
                </p>
                <p>
                    <TextField label="nBits" variant="standard" value={nBits} onChange={(event) => setNBits(event.target.value)}/>
                </p>
                <p>
                    <TextField label="Nonce" variant="standard" value={nonce} onChange={(event) => setNonce(event.target.value)}/>
                </p>
                <p>
                    Will Output as:
                    <Typography>
                        {output}
                    </Typography>
                </p>
            </Paper>
    </Paper>
);
}

export default Construct;