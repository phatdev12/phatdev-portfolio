interface System {
    owner: string;
    repo: string;
    api: {
        github: string;
    };
    core(): typeof import("@phatdev/pkg");
    system: {
        generate_random_string(length: number): Promise<string>;
        jsonRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
        textRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
    };
}

export const System: System = {
    owner: "phatdev12",
    repo: "phatdev12",
    api: {
        github: "api.github.com"
    },
    /**
         * 
         * @returns 
         */
    core() {
        return import('@phatdev/pkg') as unknown as typeof import("@phatdev/pkg")
    },
    system: {
        

        /**
         * 
         * @param length 
         * @returns 
         */
        async generate_random_string(length) {
            return (await System.core()).generate_random_string(length);
        },

        /**
         * 
         * @param host 
         * @param endpoint 
         * @param ssl 
         * @returns 
         */
        async jsonRequest(host, endpoint, ssl) {
            return (await System.core()).jsonRequest(host, endpoint, ssl);
        },

        /**
         * 
         * @param host 
         * @param endpoint 
         * @param ssl 
         * @returns 
         */
        async textRequest(host, endpoint, ssl) {
            return (await System.core()).textRequest(host, endpoint, ssl);
        },
    }
}