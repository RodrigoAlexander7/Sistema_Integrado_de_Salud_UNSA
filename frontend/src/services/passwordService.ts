export const PasswordService = {
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || "Error al cambiar contraseña" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  }
};