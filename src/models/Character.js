const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Character',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      history: {
        type: DataTypes.TEXT,
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
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The character ID.
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           description: The character name.
 *           example: John Doe
 *         age:
 *           type: number
 *           format: integer
 *           description: The character age.
 *           example: 30
 *         weight:
 *           type: number
 *           format: integer
 *           description: The character weight.
 *           example: 80
 *         history:
 *           type: string
 *           description: The character history.
 *           example: John Doe is a fictional character.
 *         image:
 *           type: string
 *           description: The character image.
 *           example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.
 *       required:
 *         - name
 *         - age
 *         - weight
 *         - history
 *         - image
 *
 */
