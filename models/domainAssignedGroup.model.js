module.exports = (sequelize, Sequelize) => {
  const domainAssignedGroup = sequelize.define(
    "domain_assigned_groups",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      domain_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      group_ids: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      tableName: "domain_assigned_groups",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return domainAssignedGroup;
};
