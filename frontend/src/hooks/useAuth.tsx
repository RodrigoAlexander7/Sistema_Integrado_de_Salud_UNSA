import { useEffect, useState } from 'react';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/auth/me', {
      credentials: 'include', 
    })
      .then(async (res) => {
        if (res.ok) {
          const userData = await res.json();
          console.log("test",userData)
          setUsuario(userData);
        } else {
          setUsuario(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setUsuario(null);
        setLoading(false);
      });
  }, []);

  return { usuario, loading, isAuthenticated: !!usuario };
}
