module.exports = (sequelize, Sequelize) => {
  const Backlink = sequelize.define(
    "backlinks",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      backlink_domain: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      black_list: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      industry: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      priority: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      backlink_location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      follow: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      robot_group: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      vendors: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      publication: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      domain_authority: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      domain_rating: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dofollow_reference_domain: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dofollow_linked_domain: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      traffic: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      first_seen: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      tat: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      indexed: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      news: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      sponsored: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      article_sample: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
      tableName: "backlinks",
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
  return Backlink;
};
