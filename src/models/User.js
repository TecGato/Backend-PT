const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      paranoid: true,
    }
  );
};

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     type: object
 *     properties:
 *        name:
 *          type: string  # Cadena de texto
 *          description: Nombre del usuario
 *          example: John Doe  # Ejemplo de nombre del usuario
 *          allowNull: false  # No se permite valor nulo
 *        email:
 *          type: string  # Cadena de texto
 *          description: Dirección de correo electrónico del usuario
 *          example: johndoe@example.com  # Ejemplo de correo electrónico del usuario
 *          unique: true  # Valor único requerido
 *          allowNull: false  # No se permite valor nulo
 *        password:
 *          type: string  # Cadena de texto
 *          description: Contraseña del usuario
 *          example: password123  # Ejemplo de contraseña del usuario
 *          allowNull: false  # No se permite valor nulo
 */
