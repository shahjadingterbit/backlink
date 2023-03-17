const _ = require("lodash");
const backLinkList = async (req, res) => {
  try {
    const backlinksData = await req.masterDb.Backlink.findAll();
    if (_.isEmpty(backlinksData)) {
      return res
        .status(400)
        .send({ status: false, message: "There is no backLinkList" });
    }
    return res.status(200).json(backlinksData);
  } catch (err) {
    console.log(
      "🚀 ~ file: backlistcontroller.js:15 ~ backLinkList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const addBacklink = async (req, res) => {
  try {
    let {
      backlink_domain,
      black_list,
      industry,
      type,
      priority,
      status,
      source,
      state,
      city,
      backlink_location,
      follow,
      robot_group,
      vendors,
      publication,
      country,
      notes,
      domain_authority,
      domain_rating,
      dofollow_reference_domain,
      dofollow_linked_domain,
      traffic,
      first_seen,
      price,
      tat,
      image,
      indexed,
      news,
      sponsored,
      article_sample,
    } = req.body;

    if (_.isEmpty(backlink_domain)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink_domain is required" });
    }
    const backlinkCheck = await req.masterDb.Backlink.findOne({
      where: { backlink_domain },
    });
    if (!_.isEmpty(backlinkCheck)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink_domain is already in database" });
    }
    await req.masterDb.Backlink.create({
      backlink_domain,
      black_list,
      industry,
      type,
      priority,
      status,
      source,
      state,
      city,
      backlink_location,
      follow,
      robot_group,
      vendors,
      publication,
      country,
      notes,
      domain_authority,
      domain_rating,
      dofollow_reference_domain,
      dofollow_linked_domain,
      traffic,
      first_seen,
      price,
      tat,
      image,
      indexed,
      news,
      sponsored,
      article_sample,
    });
    return res
      .status(200)
      .send({ status: true, message: "Backlink added successfully" });
  } catch (err) {
    console.log(
      "🚀 ~ file: backlistcontroller.js:15 ~ backLinkList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const updateBacklink = async (req, res) => {
  try {
    let {
      id,
      backlink_domain,
      black_list,
      industry,
      type,
      priority,
      status,
      source,
      state,
      city,
      backlink_location,
      follow,
      robot_group,
      vendors,
      publication,
      country,
      notes,
      domain_authority,
      domain_rating,
      dofollow_reference_domain,
      dofollow_linked_domain,
      traffic,
      first_seen,
      price,
      tat,
      image,
      indexed,
      news,
      sponsored,
      article_sample,
    } = req.body;

    if (_.isEmpty(id) || _.isEmpty(backlink_domain)) {
      return res
        .status(400)
        .send({ status: false, message: "id and backlink_domain is required" });
    }

    const backlink = await req.masterDb.Backlink.findByPk(id);

    if (_.isEmpty(backlink)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink id is invalid" });
    }
    await req.masterDb.Backlink.update(
      {
        backlink_domain,
        black_list,
        industry,
        type,
        priority,
        status,
        source,
        state,
        city,
        backlink_location,
        follow,
        robot_group,
        vendors,
        publication,
        country,
        notes,
        domain_authority,
        domain_rating,
        dofollow_reference_domain,
        dofollow_linked_domain,
        traffic,
        first_seen,
        price,
        tat,
        image,
        indexed,
        news,
        sponsored,
        article_sample,
      },
      {
        where: {
          id,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, message: "Backlink updated successfully" });
  } catch (err) {
    console.log(
      "🚀 ~ file: backlistcontroller.js:193 ~ updateBackLink ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const deleteBacklink = async (req, res) => {
  try {
    const id = req.params.id;
    if (_.isEmpty(id)) {
      return res
        .status(400)
        .send({ status: false, message: "id is required" });
    }
    const backlink = await req.masterDb.Backlink.findByPk(id);

    if (_.isEmpty(backlink)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink id is invalid" });
    }
    const data = await req.masterDb.Backlink.destroy({
      where: { id },
    });

    if (data) {
      return res
        .status(200)
        .send({ status: true, message: "Backlink deleted successfully" });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: backlistcontroller.js:221 ~ deleteBacklink ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  backLinkList,
  addBacklink,
  updateBacklink,
  deleteBacklink,
};
