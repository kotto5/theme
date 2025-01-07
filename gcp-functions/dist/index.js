var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require("axios");
const MICRO_CMS_URL = "https://tsjgt37boc.microcms.io/api/v1/trip-plans";
const TEST_SLUG = "test";
// src/index.ts
const functions = require("@google-cloud/functions-framework");
const TEST_DATA = {
    id: "r36ydy9l77",
    createdAt: "2025-01-07T06:10:58.244Z",
    updatedAt: "2025-01-07T06:11:11.989Z",
    publishedAt: "2025-01-07T06:10:58.244Z",
    revisedAt: "2025-01-07T06:11:11.989Z",
    studioSlug: "famtrip",
    relates: [
        {
            fieldId: "related",
            name: "Horai",
            url: "https://example.com",
            separator: ["×"],
        },
        {
            fieldId: "related",
            name: "SORANO HOTEL",
            url: "https://example.com",
            separator: ["×"],
        },
        {
            fieldId: "related",
            name: "多摩イノベーションエコシステム",
            url: "https://example.com",
            separator: [],
        },
    ],
    planDescriptions: [
        {
            fieldId: "planDescription",
            imageUrl: {
                url: "https://images.microcms-assets.io/assets/6a4d2d99cf1e49b4b846d18b74e7fcb5/a236edc5834a4b5f893a0634a4774aeb/test1.jpeg",
                height: 810,
                width: 1080,
            },
            caption: "本プランでは、1泊2日で多摩の自然な美味しいを楽しんでいただけるプランになっています。小澤酒造では日本酒の飲み比べやTOKYOWASABIさんでのわさび狩りなど、身軽でありながら豊かな時間を過ごすことができます。本プランでは、1泊2日で多摩の自然な美味しいを楽しんでいただけるプランになっています。小澤酒造では日本酒の飲み比べやTOKYOWASABIさんでのわさび狩りなど、身軽でありながら豊かな時間を過ごすことができます。",
            photographer: " 坂上太郎",
            provider: "株式会社サンプル1",
        },
        {
            fieldId: "planDescription",
            imageUrl: {
                url: "https://images.microcms-assets.io/assets/6a4d2d99cf1e49b4b846d18b74e7fcb5/7f2374c471d94719b7a4385fe838492d/test2.jpeg",
                height: 720,
                width: 1080,
            },
            caption: "本プラン2説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
            photographer: "坂上太郎2",
            provider: "株式会社サンプル2",
        },
    ],
    spots: [
        {
            fieldId: "spot",
            index: "①",
            content: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
        {
            fieldId: "spot",
            index: "②",
            content: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
        {
            fieldId: "spot",
            index: "③",
            content: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
    ],
    price: [
        { fieldId: "price", kind: "子供", value: "5,000円" },
        { fieldId: "price", kind: "大人", value: "10,000円" },
        {
            fieldId: "price",
            kind: "テストテストテストテストテストテスト",
            value: "1,000,000円",
        },
        {
            fieldId: "price",
            kind: "テストテストテストテストテストテストテストテストテストテストテスト",
            value: "10,000,000円",
        },
    ],
    questionAndAnswers: [
        {
            fieldId: "questionAndAnswer",
            question: "集合場所はどこですか？",
            answer: "高尾山口駅です",
        },
        {
            fieldId: "questionAndAnswer",
            question: "解散場所はどこですか？",
            answer: "高尾山山頂です",
        },
        {
            fieldId: "questionAndAnswer",
            question: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
            answer: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
        {
            fieldId: "questionAndAnswer",
            question: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
            answer: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
        { fieldId: "questionAndAnswer", question: "テスト？", answer: "テスト" },
        {
            fieldId: "questionAndAnswer",
            question: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
            answer: "テストですか？テストですか？テストですか？テストですか？テストですか？テストですか？",
        },
    ],
};
functions.http("helloGET", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fullUrl = `https://localhost/${req.url}`;
    console.log("fullurl", fullUrl);
    const { searchParams } = new URL(fullUrl);
    const path = searchParams.get("url");
    if (!path) {
        return res.status(200).json(TEST_DATA);
    }
    console.log("url is ", path);
    const parsePageSlug = (url) => {
        const decoded = decodeURIComponent(url);
        return decoded.substring(decoded.lastIndexOf("/") + 1);
    };
    var slug;
    if (parsePageSlug(path).includes("?")) {
        return res.status(200).json(TEST_DATA);
    }
    else {
        slug = parsePageSlug(path);
    }
    console.log("slug: [", slug, "]");
    try {
        const response = yield axios.get(MICRO_CMS_URL, {
            headers: {
                "X-MICROCMS-API-KEY": process.env.X_MICROCMS_API_KEY,
            },
        });
        const contents = response.data.contents;
        const plan = contents.find((p) => p.studioSlug === slug);
        if (!plan) {
            return res.status(200).json(TEST_DATA);
        }
        else {
            res.status(200).json(plan);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", message: error });
    }
}));
