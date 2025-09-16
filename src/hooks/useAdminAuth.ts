import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from '../types/admin';

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
}

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // In a real app, you'd validate the token with the server
      // For now, we'll assume it's valid if it exists
      setAuthState({
        isAuthenticated: true,
        user: null, // Would be populated from token decode or API call
        token,
        loading: false
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false
      });
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setAuthState({
          isAuthenticated: true,
          user: data.data,
          token: data.token,
          loading: false
        });
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
    navigate('/admin/login');
  };

  const getAuthHeaders = () => {
    return authState.token ? {
      'Authorization': `Bearer ${authState.token}`
    } : {};
  };

  return {
    ...authState,
    login,
    logout,
    getAuthHeaders,
    checkAuthStatus
  };
};
