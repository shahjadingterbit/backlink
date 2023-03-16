module.exports = (sequelize, Sequelize) => {
  const groupAssignedBacklink = sequelize.define(
    "group_assigned_backlinks",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      group_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      backlink_domain_ids: {
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
      tableName: "group_assigned_backlinks",
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
  return groupAssignedBacklink;
};
