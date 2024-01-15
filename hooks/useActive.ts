import { useEffect, useRef } from "react";

/**
 * 
 * @param func 
 */
export function useActive(func: any, data?: Array<any>) {
  const funcRef = useRef(func);
  const dataRef = useRef(data);
  funcRef.current = func;
  dataRef.current = data ? data : [];

  useEffect(() => function() {
    funcRef.current();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dataRef.current);
}