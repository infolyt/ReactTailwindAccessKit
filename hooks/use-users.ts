function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchUsers(): Promise<any[]> {
  const response = await fetch('/api/users', {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch users');
  }
  
  const data = await response.json();
  return data.users;
}

export async function fetchUser(id: number): Promise<any> {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch user');
  }
  
  const data = await response.json();
  return data.user;
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  roleId?: number;
}): Promise<any> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create user');
  }
  
  const data = await response.json();
  return data.user;
}

export async function updateUser(id: number, userData: {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
}): Promise<any> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update user');
  }
  
  const data = await response.json();
  return data.user;
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete user');
  }
}