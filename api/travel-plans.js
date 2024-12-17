const axios = require("axios");

const GIST_URL =
  "https://gist.githubusercontent.com/kotto5/c1c0490c653ede63937d6e4921d17c50/raw/4130eab892b0eb44addf1c22298f7ee14379ce92/travel_plans.json";

module.exports = async (req, res) => {

  const fullUrl = `https://localhost/${req.url}`;
  const { searchParams } = new URL(fullUrl);
  const path = searchParams.get('dest');
  console.log("searchParams", searchParams);
  console.log("dest", path);

  try {
    console.log("fetching data");
    const response = await axios.get(GIST_URL);
    const data = response.data;
    console.log("data", data);

    let filteredData = {};
    if (path === "plan1") {
      filteredData = data.travel_plans.plan_1;
    } else if (path === "plan2") {
      filteredData = data.travel_plans.plan_2;
    } else {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};
