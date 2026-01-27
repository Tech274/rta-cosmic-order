import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type AppRole = 'admin' | 'moderator' | 'user';

interface UseAdminReturn {
  isAdmin: boolean;
  isModerator: boolean;
  roles: AppRole[];
  isLoading: boolean;
  error: string | null;
}

export const useAdmin = (): UseAdminReturn => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) {
        setRoles([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (fetchError) {
          throw fetchError;
        }

        const userRoles = data?.map(r => r.role as AppRole) || [];
        setRoles(userRoles);
        setError(null);
      } catch (err) {
        console.error('Error fetching user roles:', err);
        setError('Failed to fetch user roles');
        setRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  return {
    isAdmin: roles.includes('admin'),
    isModerator: roles.includes('moderator') || roles.includes('admin'),
    roles,
    isLoading,
    error
  };
};

export default useAdmin;
