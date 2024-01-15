import {useState, useEffect} from 'react';
import xml2js from 'xml2js';

var parser = new xml2js.Parser(xml2js.defaults["0.1"]);

export function useStyle(name: string) {
  const [style,  setStyle] = useState({} as any);

  useEffect(()  => {
    fetch(`/${name}.xml`)
      .then(res => res.text())
      .then(data => {
        parser.parseString(data, function(error, result) {
          if(error) throw error;

          setStyle(result);
        })
      })
      .catch(err => {});
      
  },  []) ;

  return style;
}
