const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Genre',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
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
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: string  # UUID
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000  # Ejemplo de UUID
 *           description: ID único del género
 *         name:
 *           type: string  # Cadena de texto
 *           example: Action  # Ejemplo de nombre del género
 *           description: Nombre del género
 *         image:
 *           type: string  # Cadena de texto
 *           nullable: true  # Permitir valor nulo
 *           example: https://example.com/image.jpg  # Ejemplo de URL de imagen
 *           description: URL de la imagen del género (opcional)
 */
