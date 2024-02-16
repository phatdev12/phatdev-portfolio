"use client";
import React, { useEffect, useState } from "react";
import { useActive } from "../hooks";
import { clientEvent } from "../Event";
import { getGPUTier } from 'detect-gpu';

type children = {
    children: React.ReactNode
}


function mdresolve(data: string) {
    const pair = new Array(2);
  
    for(let i = 0; i<=data.length-1; i++) {
      var cache = "";
      if(data[i] == ">" && data[i-1] == "-") {
        var j = i;
        for(j; j>=0 && cache.endsWith("!<") == false; j--) {
          if(cache.startsWith(">-")) pair[1] = i;
          cache+=data[j];
        }
          if(cache.endsWith("!<")) {
              pair[0] = j;
          } else {
              continue;
          }
          data = data.substring(0, pair[0])+data.substring(pair[1]+1);
          pair[0] = pair[1] = 0;
          i = data.length-i-1;
      }
    }
  
    return data
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

        window.api = {
            github: "api.github.com"
        };
        window.owner = "phatdev12";
        window.repo = window.owner;
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

    useActive(() => {
        clientEvent.on('domLoaded', async function() {
          let result = await window.system.jsonRequest(
            window.api.github,
            `/repos/${window.owner}/${window.repo}/contents/README.md`,
            true
          );
          
          clientEvent.emit('MD', mdresolve(decodeURIComponent(atob(result.content))));
    
        });

        clientEvent.on('serial', async function (serialize) {
          console.log(serialize);
        });
      }, []);
  return (<>
    {gpu ? <>
        {children}
    </> : <>
        Your device is not supported.
    </>}
  </>);
}