const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Movie',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
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
 *   Movie:
 *     type: object
 *     properties:
 *       id:
 *         type: string  # UUID
 *         format: uuid
 *         example: 123e4567-e89b-12d3-a456-426614174000  # Ejemplo de UUID
 *         description: ID único de la película
 *       title:
 *         type: string  # Cadena de texto
 *         example: Avengers Endgame  # Ejemplo de título de la película
 *         description: Título de la película
 *       rating:
 *         type: integer  # Número entero
 *         example: 8  # Ejemplo de calificación de la película
 *         description: Calificación de la película
 *       releaseDate:
 *         type: string  # Cadena de texto
 *         format: date
 *         example: 2022-01-01  # Ejemplo de fecha de lanzamiento de la película
 *         description: Fecha de lanzamiento de la película
 *       image:
 *         type: string  # Cadena de texto
 *         example: https://example.com/image.jpg  # Ejemplo de URL de imagen
 *         description: URL de la imagen de la película
 */
