import {useState} from 'react';
import xml2js from 'xml2js';
import { useActive } from '.';

var parser = new xml2js.Parser(xml2js.defaults["0.1"]);

export function useStyle(name: string) {
  const [style,  setStyle] = useState({} as any);

  useActive(async () => {
    const wasm = await import('@phatdev/pkg');
    let result = await wasm.textRequest(
      window.location.hostname+(window.location.hostname == "localhost" && `:${window.location.port}`),
      `/${name}.xml`,
      window.location.protocol === "https:"
    );
    
    parser.parseString(result, (error, result) => {
      if(error) throw error;

      setStyle(result);
    });     
  },  []) ;

  return style;
}
