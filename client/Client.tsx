"use client";
import React, { useEffect, useState } from "react";
import { useActive } from "../hooks";
import { clientEvent } from "../Event";
import { getGPUTier } from 'detect-gpu';
import { System } from "@phatdev/System";
type children = {
    children: React.ReactNode
}

export default function Client({ children }: children) {
    const [gpu, setGpu] = useState(false);
    
   
    useActive(async () => {
        const gpuTier = await getGPUTier();
        if(gpuTier.tier == 2 || gpuTier.tier == 3) {
            setGpu(true);
        }
    }, []);

    useActive(async () => {
        const system = await import('@phatdev/pkg');

        window.api = System.api;
        window.owner = System.owner;
        window.repo = System.repo;
        window.system = System.system;
        
        clientEvent.emit('systemLoaded');
    }, []);

  return (<>
    {gpu ? <>
        {children}
    </> : <>
        Your device is not supported.
    </>}
  </>);
}