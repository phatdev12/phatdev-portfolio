"use client";
import React, { useEffect } from "react";
import { useActive } from "./hooks";
import { clientEvent } from "./Event";

type children = {
    children: React.ReactNode
}

export default function Client({ children }: children) {
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

  return children;
}