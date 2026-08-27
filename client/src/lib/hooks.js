import { useEffect, useState, useCallback } from 'react';
import { api } from './api.js';

export function useFetch(path, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const load = useCallback(() => {
    setLoading(true);
    api.get(path).then(setData).catch(setError).finally(() => setLoading(false));
  }, [path]);
  useEffect(() => { load(); }, [load, ...deps]);
  return { data, loading, error, reload: load };
}
