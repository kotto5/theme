const axios = require("axios");

const MICRO_CMS_URL =
  "https://tsjgt37boc.microcms.io/api/v1/trip-plans/mj854awcuy";
const TEST_SLUG = "test";

module.exports = async (req, res) => {
  const fullUrl = `https://localhost/${req.url}`;
  console.log("fullurl", fullUrl);
  const { searchParams } = new URL(fullUrl);
  const path = searchParams.get("url");
  console.log("url is ", path);

  const parsePageSlug = (url) => {
    const decoded = decodeURIComponent(url);
    return decoded.substring(decoded.lastIndexOf("/") + 1);
  };

  const slug = parsePageSlug(path).includes("?") ? TEST_SLUG : parsePageSlug(path);
  console.log("slug: [", slug, "]");

  try {
    const response = await axios.get(MICRO_CMS_URL, {
      headers: {
        "X-MICROCMS-API-KEY": process.env.X_MICROCMS_API_KEY,
      },
    });
    const data = response.data;
    const plans: any[] = data.planList;

    const plan = plans.find((p) => p.studioSlug === slug);
    if (!plan) {
      return res.status(404).json({ error: "Data not found" });
    } else {
      res.status(200).json(plan);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
