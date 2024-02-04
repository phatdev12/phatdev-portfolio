"use client";
import React, { useEffect, useState } from "react";
import { useActive } from "./hooks";
import { clientEvent } from "./Event";
import { getGPUTier } from 'detect-gpu';

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

        window.system = {
            generate_random_string(length) {
                return system.generate_random_string(length);
            },
            jsonRequest(host, endpoint, ssl) {
                return system.jsonRequest(host, endpoint, ssl);
            },
            textRequest(host, endpoint, ssl) {
                return system.textRequest(host, endpoint, ssl);
            },
        };
        
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