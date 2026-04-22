function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchRoles(): Promise<any[]> {
  const response = await fetch('/api/roles', {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch roles');
  }
  
  const data = await response.json();
  return data.roles;
}

export async function fetchRole(id: number): Promise<any> {
  const response = await fetch(`/api/roles/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch role');
  }
  
  const data = await response.json();
  return data.role;
}

export async function createRole(roleData: {
  name: string;
  description?: string;
  permissions: string[];
}): Promise<any> {
  const response = await fetch('/api/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(roleData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create role');
  }
  
  const data = await response.json();
  return data.role;
}

export async function updateRole(id: number, roleData: {
  name?: string;
  description?: string;
  permissions?: string[];
}): Promise<any> {
  const response = await fetch(`/api/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(roleData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update role');
  }
  
  const data = await response.json();
  return data.role;
}

export async function deleteRole(id: number): Promise<void> {
  const response = await fetch(`/api/roles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete role');
  }
}