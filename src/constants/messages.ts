export const CLIENT_MESSAGES = {
  CLIENT_CREATED: "Cliente creado exitosamente.",
  CLIENT_UPDATED: "Cliente actualizado correctamente.",
  CLIENT_DELETED: "Cliente eliminado correctamente.",
  CLIENT_NOT_FOUND: "Cliente no encontrado.",
  CLIENT_EXISTS: "Ya existe un cliente con ese correo.",
  IMAGE_REQUIRED: "Se requiere una imagen del cliente.",
  UNAUTHORIZED: "No autorizado.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
};

export const PROJECT_MESSAGES = {
  PROJECT_CREATED: "Proyecto creado exitosamente.",
  PROJECT_UPDATED: "Proyecto actualizado correctamente.",
  PROJECT_DELETED: "Proyecto eliminado correctamente.",
  PROJECT_NOT_FOUND: "Proyecto no encontrado.",
  CLIENT_NOT_FOUND: "Cliente relacionado no encontrado.",
  UNAUTHORIZED: "No autorizado.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
};

export const USER_MESSAGES = {
  EMAIL_ALREADY_EXISTS: (email: string) => `El correo electrónico '${email}' ya está registrado. Por favor, utiliza otro.`,
  USER_NOT_FOUND: "Usuario no encontrado.",
  USER_CREATED: "Se ha enviado un correo de verificación a tu cuenta.",
  USER_UPDATED: "Usuario actualizado correctamente.",
  USER_DELETED: "Usuario eliminado correctamente.",
  UNAUTHORIZED: "Unauthorized",
  USER_NOT_VERIFIED:"El usuario no está verificado. Por favor, revise su correo electrónico para completar la verificación.",
  INVALID_CREDENTIALS: "Credenciales incorrectas.",
  TOKEN_GENERATION_ERROR: "Error al generar el token de autenticación.",
  TOKEN_INVALID_OR_EXPIRED: "Token inválido o expirado.",
  USER_VERIFIED_SUCCESS: "Tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión.",
  PASSWORD_RESET_SENT:"Se ha enviado un correo electrónico para restablecer tu contraseña.",
  PASSWORD_UPDATED: "Contraseña actualizada con éxito.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
};
