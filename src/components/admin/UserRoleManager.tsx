import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Shield, 
  ShieldCheck, 
  User, 
  Search,
  Loader2,
  Crown,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AppRole = 'admin' | 'moderator' | 'user';

interface UserWithRoles {
  id: string;
  user_id: string;
  display_name: string | null;
  membership_level: string;
  karma: number;
  joined_at: string;
  roles: AppRole[];
}

const roleConfig: Record<AppRole, { label: string; icon: typeof Shield; color: string }> = {
  admin: { label: 'Admin', icon: Crown, color: 'bg-destructive text-destructive-foreground' },
  moderator: { label: 'Moderator', icon: ShieldCheck, color: 'bg-primary text-primary-foreground' },
  user: { label: 'User', icon: User, color: 'bg-muted text-muted-foreground' },
};

const UserRoleManager = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newRole, setNewRole] = useState<AppRole | ''>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsersWithRoles();
  }, []);

  const fetchUsersWithRoles = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('joined_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Merge profiles with their roles
      const usersWithRoles: UserWithRoles[] = (profiles || []).map(profile => {
        const roles = (userRoles || [])
          .filter(r => r.user_id === profile.user_id)
          .map(r => r.role as AppRole);
        
        return {
          id: profile.id,
          user_id: profile.user_id,
          display_name: profile.display_name,
          membership_level: profile.membership_level,
          karma: profile.karma,
          joined_at: profile.joined_at,
          roles: roles.length > 0 ? roles : ['user' as AppRole],
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (user: UserWithRoles) => {
    setSelectedUser(user);
    setNewRole('');
    setIsDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser || !newRole) return;

    setIsUpdating(true);
    try {
      // Check if user already has this role
      const hasRole = selectedUser.roles.includes(newRole);

      if (hasRole) {
        // Remove the role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', selectedUser.user_id)
          .eq('role', newRole);

        if (error) throw error;

        toast({
          title: "Role Removed",
          description: `${newRole} role removed from ${selectedUser.display_name || 'User'}`,
        });
      } else {
        // Add the role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: selectedUser.user_id,
            role: newRole,
          });

        if (error) throw error;

        toast({
          title: "Role Assigned",
          description: `${newRole} role assigned to ${selectedUser.display_name || 'User'}`,
        });
      }

      // Refresh the user list
      await fetchUsersWithRoles();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role. Make sure you have admin permissions.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: users.length,
    admins: users.filter(u => u.roles.includes('admin')).length,
    moderators: users.filter(u => u.roles.includes('moderator')).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-display">{stats.admins}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Moderators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-2xl font-display">{stats.moderators}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            All Users
          </CardTitle>
          <CardDescription>
            Click on a user's role badge to modify their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Karma</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.display_name || 'Unnamed User'}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {user.user_id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.membership_level}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.karma}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.joined_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => {
                        const config = roleConfig[role];
                        const Icon = config.icon;
                        return (
                          <Badge 
                            key={role} 
                            className={`${config.color} gap-1`}
                          >
                            <Icon className="w-3 h-3" />
                            {config.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRoleChange(user)}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Change Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription>
              Modify roles for {selectedUser?.display_name || 'this user'}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Current Roles:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.roles.map((role) => {
                    const config = roleConfig[role];
                    const Icon = config.icon;
                    return (
                      <Badge 
                        key={role} 
                        className={`${config.color} gap-1`}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Select Role to Add/Remove:</p>
                <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Admin
                        {selectedUser.roles.includes('admin') && ' (Remove)'}
                      </div>
                    </SelectItem>
                    <SelectItem value="moderator">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Moderator
                        {selectedUser.roles.includes('moderator') && ' (Remove)'}
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        User
                        {selectedUser.roles.includes('user') && ' (Remove)'}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newRole && (
                <p className="text-sm text-muted-foreground">
                  {selectedUser.roles.includes(newRole) 
                    ? `This will remove the ${newRole} role from this user.`
                    : `This will grant ${newRole} privileges to this user.`
                  }
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmRoleChange} 
              disabled={!newRole || isUpdating}
            >
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRoleManager;
