// const fs = require("fs");

// const defaultSchema = {
//   name: { o },
//   age: null,
//   gender: "Male",
//   party: { objectId },
//   totalVotes: 0,
//   hotCandidate: { boolean },
//   image: null,
//   constituency: [{ objectId }],
// };

// const parties = [
//   { name: "BJP", id: "673b16b4568e8acfd1213d6f" },
//   { name: "INC", id: "673b16b4568e8acfd1213d86" },
//   { name: "AAP", id: "6793b3bc7effd8395522c976" },
// ];

// const candidateArray = [
//   {
//     constituency: "678a03efff11b6f64583b7ff",
//     AAP: { candidateName: "मुकेश गोयल", hotCandidate: false },
//     BJP: { candidateName: "राज कुमार भाटिया", hotCandidate: false },
//     INC: { candidateName: "शिवांक सिंघल", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b7fd",
//     AAP: { candidateName: "संजीव झा", hotCandidate: true },
//     BJP: { candidateName: "शैलेश कुमार (JDU)", hotCandidate: false },
//     INC: { candidateName: "मंगेश त्यागी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b7fe",
//     AAP: { candidateName: "सुरेंद्र पाल सिंह बिट्टू", hotCandidate: false },
//     BJP: { candidateName: "सूर्य प्रकाश खात्री", hotCandidate: false },
//     INC: { candidateName: "लोकेंद्र चौधरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b800",
//     AAP: { candidateName: "अजेय यादव", hotCandidate: false },
//     BJP: { candidateName: "दीपक चौधरी", hotCandidate: false },
//     INC: { candidateName: "देवेंद्र यादव", hotCandidate: true },
//   },
//   {
//     constituency: "678a03efff11b6f64583b7fc",
//     AAP: { candidateName: "शरद चौहान", hotCandidate: false },
//     BJP: { candidateName: "राज करन खत्री", hotCandidate: false },
//     INC: { candidateName: "अरुणा कुमारी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b802",
//     AAP: { candidateName: "जय भगवान", hotCandidate: false },
//     BJP: { candidateName: "रवींद्र कुमार", hotCandidate: false },
//     INC: { candidateName: "सुरेंद्र कुमार", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b803",
//     AAP: { candidateName: "जसबीर कराला", hotCandidate: false },
//     BJP: { candidateName: "राजेंद्र दराल", hotCandidate: false },
//     INC: { candidateName: "धर्मपाल लकड़ा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b804",
//     AAP: { candidateName: "अनिल झा", hotCandidate: true },
//     BJP: { candidateName: "बजरंग शुक्ल", hotCandidate: false },
//     INC: { candidateName: "राजेश गुप्ता", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b805",
//     AAP: { candidateName: "मुकेश कुमार अहलावत", hotCandidate: false },
//     BJP: { candidateName: "कर्म सिंह करमा", hotCandidate: false },
//     INC: { candidateName: "जय किशन", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b806",
//     AAP: { candidateName: "रघुविंदर शौकीन", hotCandidate: false },
//     BJP: { candidateName: "मनोज शौकीन", hotCandidate: false },
//     INC: { candidateName: "शौकीन रोहित चौधरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b807",
//     AAP: { candidateName: "राकेश जाटव", hotCandidate: false },
//     BJP: { candidateName: "राजकुमार चौहान", hotCandidate: false },
//     INC: { candidateName: "हनुमान चौहान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b808",
//     AAP: { candidateName: "प्रदीप मित्तल", hotCandidate: false },
//     BJP: { candidateName: "विजेंद्र गुप्ता", hotCandidate: true },
//     INC: { candidateName: "सोमेश गुप्ता", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b809",
//     AAP: { candidateName: "बंदना कुमारी", hotCandidate: false },
//     BJP: { candidateName: "रेखा गुप्ता", hotCandidate: false },
//     INC: { candidateName: "प्रवीण जैन", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80a",
//     AAP: { candidateName: "सत्येंद्र जैन", hotCandidate: false },
//     BJP: { candidateName: "करनैल सिंह", hotCandidate: false },
//     INC: { candidateName: "सतीश लूथरा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80b",
//     AAP: { candidateName: "प्रीति तोमर", hotCandidate: false },
//     BJP: { candidateName: "तिलक राम गुप्ता", hotCandidate: false },
//     INC: { candidateName: "सतेंद्र शर्मा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80c",
//     AAP: { candidateName: "राजेश गुप्ता", hotCandidate: false },
//     BJP: { candidateName: "पूनम शर्मा", hotCandidate: false },
//     INC: { candidateName: "रागिनी नायक", hotCandidate: true },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80d",
//     AAP: { candidateName: "अखिलेश पति त्रिपाठी", hotCandidate: false },
//     BJP: { candidateName: "अशोक गोयल", hotCandidate: false },
//     INC: { candidateName: "कुंवर करण सिंह", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80e",
//     AAP: { candidateName: "सोमदत्त", hotCandidate: false },
//     BJP: { candidateName: "मनोज कुमार जिंदल", hotCandidate: false },
//     INC: { candidateName: "अनिल भारद्वाज", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b80f",
//     AAP: { candidateName: "पुनर्दीप सिंह साहनी", hotCandidate: false },
//     BJP: { candidateName: "सतीश जैन", hotCandidate: false },
//     INC: { candidateName: "मुदित अग्रवाल", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b810",
//     AAP: { candidateName: "शोएब इकबाल", hotCandidate: false },
//     BJP: { candidateName: "दीप्ति इंदौरा", hotCandidate: false },
//     INC: { candidateName: "असीम अहमद खान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b811",
//     AAP: { candidateName: "इमरान हुसैन", hotCandidate: false },
//     BJP: { candidateName: "कमल बागड़ी", hotCandidate: false },
//     INC: { candidateName: "हारून यूसुफ", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b812",
//     AAP: { candidateName: "विशेष रवि", hotCandidate: false },
//     BJP: { candidateName: "दुष्यंत कुमार गौतम", hotCandidate: false },
//     INC: { candidateName: "राहुल धानक", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b813",
//     AAP: { candidateName: "परवेश रतन", hotCandidate: false },
//     BJP: { candidateName: "राज कुमार आनंद", hotCandidate: false },
//     INC: { candidateName: "श्रीमती कृष्णा तीरथ", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b814",
//     AAP: { candidateName: "शिव चरण गोयल", hotCandidate: false },
//     BJP: { candidateName: "हरीश खुराना", hotCandidate: true },
//     INC: { candidateName: "राजेंद्र नामधारी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b815",
//     AAP: { candidateName: "राखी बिडलान", hotCandidate: false },
//     BJP: { candidateName: "उर्मिला गंगवाल", hotCandidate: false },
//     INC: { candidateName: "जे.पी. पंवार", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b816",
//     AAP: { candidateName: "धनवती चंदेला", hotCandidate: false },
//     BJP: { candidateName: "मनजिंदर सिंह सिरसा", hotCandidate: false },
//     INC: { candidateName: "धर्मपाल चंदेला", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b817",
//     AAP: { candidateName: "सुरिंदर सेतिया", hotCandidate: false },
//     BJP: { candidateName: "श्याम शर्मा", hotCandidate: false },
//     INC: { candidateName: "प्रेम शर्मा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b818",
//     AAP: { candidateName: "जरनैल सिंह", hotCandidate: false },
//     BJP: { candidateName: "श्वेत सैनी", hotCandidate: false },
//     INC: { candidateName: "पीएस बावा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b819",
//     AAP: { candidateName: "प्रवीण कुमार", hotCandidate: false },
//     BJP: { candidateName: "आशीष सूद", hotCandidate: false },
//     INC: { candidateName: "श्रीमती हरबानी कौर", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81a",
//     AAP: { candidateName: "महिंदर यादव", hotCandidate: false },
//     BJP: { candidateName: "जितेन्द्र सोलंकी", hotCandidate: false },
//     INC: { candidateName: "एडवोकेट जितेन्द्र सोलंकी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81b",
//     AAP: {
//       candidateName: "पोश बलीयन (पूजा नरेश बलीयन)",
//       hotCandidate: false,
//     },
//     BJP: { candidateName: "पवन शर्मा", hotCandidate: false },
//     INC: { candidateName: "मुकेश शर्मा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81c",
//     AAP: { candidateName: "विनय मिश्रा", hotCandidate: false },
//     BJP: { candidateName: "प्रदयुमं राजपूत", hotCandidate: false },
//     INC: { candidateName: "आदर्श शास्त्री", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81d",
//     AAP: { candidateName: "सुमेश शौकीन", hotCandidate: false },
//     BJP: { candidateName: "संदीप सहरावत", hotCandidate: false },
//     INC: { candidateName: "रघुविंदर शौकीन", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81e",
//     AAP: { candidateName: "तरुण यादव", hotCandidate: false },
//     BJP: { candidateName: "नीलम पहलवान", hotCandidate: false },
//     INC: { candidateName: "सुषमा यादव", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b81f",
//     AAP: { candidateName: "सुरेंद्र भारद्वाज", hotCandidate: false },
//     BJP: { candidateName: "कैलाश गहलोत", hotCandidate: true },
//     INC: { candidateName: "देवेंद्र सहरावत", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b820",
//     AAP: { candidateName: "जोगिंदर सोलंकी", hotCandidate: false },
//     BJP: { candidateName: "कुलदीप सोलंकी", hotCandidate: false },
//     INC: { candidateName: "मांगे राम", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b821",
//     AAP: { candidateName: "वीरेंद्र सिंह कादयान", hotCandidate: false },
//     BJP: { candidateName: "भुवन तंवर", hotCandidate: false },
//     INC: { candidateName: "प्रदीप कुमार उपमन्यु", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b822",
//     AAP: { candidateName: "दुर्गेश पाठक", hotCandidate: false },
//     BJP: { candidateName: "उमंग बजाज", hotCandidate: false },
//     INC: { candidateName: "विनीता यादव", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b823",
//     AAP: { candidateName: "अरविंद केजरीवाल", hotCandidate: true },
//     BJP: { candidateName: "प्रवेश साहिब सिंह वर्मा", hotCandidate: false },
//     INC: { candidateName: "संदीप दीक्षित", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b828",
//     AAP: { candidateName: "महेंद्र चौधरी", hotCandidate: false },
//     BJP: { candidateName: "गजेंद्र यादव", hotCandidate: false },
//     INC: { candidateName: "पुष्पा सिंह", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b824",
//     AAP: { candidateName: "मनीष सिसोदिया", hotCandidate: true },
//     BJP: { candidateName: "सरदार तरविंदर सिंह मारवाह", hotCandidate: false },
//     INC: { candidateName: "फरहान सूरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b825",
//     AAP: { candidateName: "रमेश पहलवान", hotCandidate: false },
//     BJP: { candidateName: "नीरज बसोया", hotCandidate: false },
//     INC: { candidateName: "अभिषेक दत्त", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b826",
//     AAP: { candidateName: "सोमनाथ भारती", hotCandidate: true },
//     BJP: { candidateName: "सतीश उपाध्याय", hotCandidate: false },
//     INC: { candidateName: "जितेंद्र कुमार कोचर", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b827",
//     AAP: { candidateName: "प्रमिला टोकस", hotCandidate: false },
//     BJP: { candidateName: "अनिल शर्मा", hotCandidate: false },
//     INC: { candidateName: "विशेष टोकस", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82a",
//     AAP: { candidateName: "ब्रह्म सिंह तंवर", hotCandidate: false },
//     BJP: { candidateName: "करतार सिंह तंवर", hotCandidate: false },
//     INC: { candidateName: "राजेंद्र तंवर", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82b",
//     AAP: { candidateName: "प्रेम कुमार चौहान", hotCandidate: false },
//     BJP: { candidateName: "दीपक तंवर", hotCandidate: false },
//     INC: { candidateName: "राजेश चौहान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82c",
//     AAP: { candidateName: "अजय दत्त", hotCandidate: false },
//     BJP: { candidateName: "खुशीराम चुनार", hotCandidate: false },
//     INC: { candidateName: "जय प्रकाश", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82d",
//     AAP: { candidateName: "दिनेश मोहनिया", hotCandidate: false },
//     BJP: { candidateName: "चंदन चौधरी", hotCandidate: false },
//     INC: { candidateName: "हर्ष चौधरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82e",
//     AAP: { candidateName: "सौरभ भारद्वाज", hotCandidate: true },
//     BJP: { candidateName: "शिखा राय", hotCandidate: false },
//     INC: { candidateName: "गर्वित सिंघवी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b82f",
//     AAP: { candidateName: "आतिशी", hotCandidate: true },
//     BJP: { candidateName: "रमेश विधूड़ी", hotCandidate: false },
//     INC: { candidateName: "अलका लांबा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b830",
//     AAP: { candidateName: "साही राम", hotCandidate: false },
//     BJP: { candidateName: "रोहतास विधूड़ी", hotCandidate: false },
//     INC: { candidateName: "वीरेंद्र बिधूड़ी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b831",
//     AAP: { candidateName: "राम सिंह नेटा जी", hotCandidate: false },
//     BJP: { candidateName: "नारायण शर्मा", hotCandidate: false },
//     INC: { candidateName: "राम सिंह नेटा जी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b832",
//     AAP: { candidateName: "अमानतुल्लाह खान(हॉट सीट)", hotCandidate: false },
//     BJP: { candidateName: "मनीष चौधरी", hotCandidate: false },
//     INC: { candidateName: "अरीबा खान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b833",
//     AAP: { candidateName: "अंजना पारचा", hotCandidate: false },
//     BJP: { candidateName: "रविकांत उज्जैन", hotCandidate: false },
//     INC: { candidateName: "अमरदीप", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b834",
//     AAP: { candidateName: "कुलदीप कुमार", hotCandidate: false },
//     BJP: { candidateName: "प्रियंका गौतम", hotCandidate: false },
//     INC: { candidateName: "अक्षय कुमार", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b835",
//     AAP: { candidateName: "अवध ओझा", hotCandidate: true },
//     BJP: { candidateName: "रवींद्र सिंह नेगी", hotCandidate: false },
//     INC: { candidateName: "चौधरी अनिल कुमार", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b836",
//     AAP: { candidateName: "बीबी त्यागी", hotCandidate: false },
//     BJP: { candidateName: "अभय वर्मा", hotCandidate: false },
//     INC: { candidateName: "सुमित शर्मा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b837",
//     AAP: { candidateName: "दीपक सिंगला", hotCandidate: false },
//     BJP: { candidateName: "ओम प्रकाश शर्मा", hotCandidate: false },
//     INC: { candidateName: "राजीव चौधरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b838",
//     AAP: { candidateName: "विकास बग्गा", hotCandidate: false },
//     BJP: { candidateName: "डॉ. अनिल गोयल", hotCandidate: false },
//     INC: { candidateName: "गुरचरण सिंह राजू", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b839",
//     AAP: { candidateName: "नवीन चौधरी (दीपू)", hotCandidate: false },
//     BJP: { candidateName: "सरदार अरविंदर सिंह लवली", hotCandidate: false },
//     INC: { candidateName: "कमल अरोड़ा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83a",
//     AAP: {
//       candidateName: "पद्मश्री जितेंद्र सिंह शंटी",
//       hotCandidate: false,
//     },
//     BJP: { candidateName: "संजय गोयल", hotCandidate: false },
//     INC: { candidateName: "जगत सिंह", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83b",
//     AAP: { candidateName: "वीर सिंह ढींगन", hotCandidate: false },
//     BJP: { candidateName: "सुष्री कुमारी रिंकू", hotCandidate: false },
//     INC: { candidateName: "राजेश लिलोठिया", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83c",
//     AAP: { candidateName: "सरिता सिंह", hotCandidate: false },
//     BJP: { candidateName: "जितेंद्र महाजन", hotCandidate: false },
//     INC: { candidateName: "सुरेश वाटी चौहान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83d",
//     AAP: { candidateName: "चौधरी जुबैर अहमद", hotCandidate: false },
//     BJP: { candidateName: "अनिल गौड़", hotCandidate: false },
//     INC: { candidateName: "अब्दुल रहमान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83e",
//     AAP: { candidateName: "गौरव शर्मा", hotCandidate: false },
//     BJP: { candidateName: "अजय महावर", hotCandidate: false },
//     INC: { candidateName: "भीष्म शर्मा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b83f",
//     AAP: { candidateName: "गोपाल राय", hotCandidate: true },
//     BJP: { candidateName: "अनिल वशिष्ट", hotCandidate: false },
//     INC: { candidateName: "हाजी मोहम्मद इस्हाक खान", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b840",
//     AAP: { candidateName: "सुरेंद्र कुमार", hotCandidate: false },
//     BJP: { candidateName: "प्रवीण निमेष", hotCandidate: false },
//     INC: { candidateName: "ईश्वर बागरी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b841",
//     AAP: { candidateName: "अदिल अहमद खान", hotCandidate: false },
//     BJP: { candidateName: "मोहन सिंह बिष्ट", hotCandidate: false },
//     INC: { candidateName: "अनिल महंदी", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b842",
//     AAP: { candidateName: "मनोज त्यागी", hotCandidate: false },
//     BJP: { candidateName: "कपिल मिश्रा", hotCandidate: true },
//     INC: { candidateName: "पीके मिश्रा", hotCandidate: false },
//   },
//   {
//     constituency: "678a03efff11b6f64583b801",
//     AAP: { candidateName: "महेंद्र गोयल", hotCandidate: false },
//     BJP: { candidateName: "कुलवंत राणा", hotCandidate: false },
//     INC: { candidateName: "सुशांत मिश्रा", hotCandidate: false },
//   },
// ];

// const candidateWithIDs = [
//   {
//     _id: "673b171643ad5c3514218ffc",
//     name: "अनंत कुमार ओझा",
//   },
//   {
//     _id: "673b171643ad5c3514219002",
//     name: "मो ताजुद्दीन",
//   },
//   {
//     _id: "673b171743ad5c3514219007",
//     name: "मोतीलाल सरकार",
//   },
//   {
//     _id: "673b171743ad5c351421900c",
//     name: "लोबिन हेम्ब्रम",
//   },
//   {
//     _id: "673b171743ad5c3514219011",
//     name: "धनंजय सोरेन",
//   },
//   {
//     _id: "673b171743ad5c3514219016",
//     name: "सूर्यनारायण हांसदा",
//   },
//   {
//     _id: "673b171743ad5c351421901b",
//     name: "गमालियल हेम्ब्रम",
//   },
//   {
//     _id: "673b171743ad5c3514219020",
//     name: "हेमंत सोरेन",
//   },
//   {
//     _id: "673b171743ad5c3514219025",
//     name: "थॉमस सोरेन",
//   },
//   {
//     _id: "673b171843ad5c351421902a",
//     name: "बाबूधन मुर्मू",
//   },
//   {
//     _id: "673b171843ad5c351421902f",
//     name: "हेमलाल मुर्मू",
//   },
//   {
//     _id: "673b171843ad5c3514219034",
//     name: "मार्क बास्के",
//   },
//   {
//     _id: "673b171843ad5c3514219039",
//     name: "अजहर इस्लाम",
//   },
//   {
//     _id: "673b171843ad5c351421903e",
//     name: "निसात आलम",
//   },
//   {
//     _id: "673b171843ad5c3514219043",
//     name: "शेख सैफुद्दीन",
//   },
//   {
//     _id: "673b171843ad5c3514219048",
//     name: "नवनीत एंथोनी हेम्ब्रम",
//   },
//   {
//     _id: "673b171843ad5c351421904d",
//     name: "स्टीफन मरांडी",
//   },
//   {
//     _id: "673b171943ad5c3514219052",
//     name: "गोपिन सोरेन",
//   },
//   {
//     _id: "673b171943ad5c3514219057",
//     name: "आलोक कुमार सोरेन",
//   },
//   {
//     _id: "673b171943ad5c351421905c",
//     name: "परितोष सोरेन",
//   },
//   {
//     _id: "673b171943ad5c3514219061",
//     name: "साइमन मुर्मू",
//   },
//   {
//     _id: "673b171943ad5c3514219066",
//     name: "माधव चंद्र महतो",
//   },
//   {
//     _id: "673b171943ad5c351421906b",
//     name: "रवींद्र नाथ महतो",
//   },
//   {
//     _id: "673b171943ad5c3514219070",
//     name: "रघुवीर यादव",
//   },
//   {
//     _id: "673b171a43ad5c3514219075",
//     name: "इरफान अंसारी",
//   },
//   {
//     _id: "673b171a43ad5c351421907a",
//     name: "सीता मुर्मू",
//   },
//   {
//     _id: "673b171a43ad5c351421907f",
//     name: "तरुण कुमार गुप्ता",
//   },
//   {
//     _id: "673b171a43ad5c3514219084",
//     name: "बसंत सोरेन",
//   },
//   {
//     _id: "673b171a43ad5c3514219089",
//     name: "बाबू राम मुर्मू",
//   },
//   {
//     _id: "673b171a43ad5c351421908e",
//     name: "सुनील सोरेन",
//   },
//   {
//     _id: "673b171a43ad5c3514219093",
//     name: "सुरेश मुर्मू",
//   },
//   {
//     _id: "673b171b43ad5c3514219098",
//     name: "लोइस मरांडी",
//   },
//   {
//     _id: "673b171b43ad5c351421909d",
//     name: "देबिन मुर्मू",
//   },
//   {
//     _id: "673b171b43ad5c35142190a2",
//     name: "देवेंद्र कुंवर",
//   },
//   {
//     _id: "673b171b43ad5c35142190a7",
//     name: "बादल",
//   },
//   {
//     _id: "673b171b43ad5c35142190ac",
//     name: "राजीव कुमार",
//   },
//   {
//     _id: "673b171b43ad5c35142190b1",
//     name: "गंगा नारायण सिंह",
//   },
//   {
//     _id: "673b171b43ad5c35142190b6",
//     name: "हफीजुल हसन",
//   },
//   {
//     _id: "673b171b43ad5c35142190bb",
//     name: "सद्दाम हुसैन",
//   },
//   {
//     _id: "673b171c43ad5c35142190c0",
//     name: "उदय शंकर सिंह",
//   },
//   {
//     _id: "673b171c43ad5c35142190c5",
//     name: "रणधीर कुमार सिंह",
//   },
//   {
//     _id: "673b171c43ad5c35142190ca",
//     name: "मो अजहरुद्दीन",
//   },
//   {
//     _id: "673b171c43ad5c35142190cf",
//     name: "नारायण दास",
//   },
//   {
//     _id: "673b171c43ad5c35142190d4",
//     name: "सुरेश पासवान",
//   },
//   {
//     _id: "673b171c43ad5c35142190d9",
//     name: "अंगरेज दास",
//   },
//   {
//     _id: "673b171c43ad5c35142190de",
//     name: "देवेंद्रनाथ सिंह",
//   },
//   {
//     _id: "673b171d43ad5c35142190e3",
//     name: "प्रदीप यादव",
//   },
//   {
//     _id: "673b171d43ad5c35142190e8",
//     name: "प्रवीण कुमार",
//   },
//   {
//     _id: "673b171d43ad5c35142190ed",
//     name: "अमित कुमार मंडल",
//   },
//   {
//     _id: "673b171d43ad5c35142190f2",
//     name: "संजय प्रसाद यादव",
//   },
//   {
//     _id: "673b171d43ad5c35142190f7",
//     name: "परिमल कुमार ठाकुर",
//   },
//   {
//     _id: "673b171d43ad5c35142190fc",
//     name: "अशोक कुमार",
//   },
//   {
//     _id: "673b171d43ad5c3514219101",
//     name: "दीपिका पांडेय सिंह",
//   },
//   {
//     _id: "673b171e43ad5c3514219106",
//     name: "जवाहर लाल यादव",
//   },
//   {
//     _id: "673b171e43ad5c351421910b",
//     name: "डॉ नीरा यादव",
//   },
//   {
//     _id: "673b171e43ad5c3514219110",
//     name: "सुभाष प्रसाद यादव",
//   },
//   {
//     _id: "673b171e43ad5c3514219115",
//     name: "प्रकाश आंबेडकर",
//   },
//   {
//     _id: "673b171e43ad5c351421911a",
//     name: "अमित कुमार यादव",
//   },
//   {
//     _id: "673b171e43ad5c351421911f",
//     name: "जानकी प्रसाद यादव",
//   },
//   {
//     _id: "673b171e43ad5c3514219124",
//     name: "महेंद्र प्रसाद",
//   },
//   {
//     _id: "673b171e43ad5c3514219129",
//     name: "अरुण साहू",
//   },
//   {
//     _id: "673b171f43ad5c351421912e",
//     name: "मनोज कुमार यादव",
//   },
//   {
//     _id: "673b171f43ad5c3514219133",
//     name: "कृष्ण कुमार यादव",
//   },
//   {
//     _id: "673b171f43ad5c3514219138",
//     name: "अंबा प्रसाद",
//   },
//   {
//     _id: "673b171f43ad5c351421913d",
//     name: "रोशनलाल चौधरी",
//   },
//   {
//     _id: "673b171f43ad5c3514219142",
//     name: "बालेश्वर कुमार",
//   },
//   {
//     _id: "673b171f43ad5c3514219147",
//     name: "ममता देवी",
//   },
//   {
//     _id: "673b171f43ad5c351421914c",
//     name: "सुनीता चौधरी",
//   },
//   {
//     _id: "673b172043ad5c3514219151",
//     name: "पनेश्वर कुमार",
//   },
//   {
//     _id: "673b172043ad5c3514219156",
//     name: "जय प्रकाश भाई पटेल",
//   },
//   {
//     _id: "673b172043ad5c351421915b",
//     name: "निर्मल महतो",
//   },
//   {
//     _id: "673b172043ad5c3514219160",
//     name: "बिहारी कुमार",
//   },
//   {
//     _id: "673b172043ad5c3514219165",
//     name: "प्रदीप प्रसाद",
//   },
//   {
//     _id: "673b172043ad5c351421916a",
//     name: "मुन्ना सिंह",
//   },
//   {
//     _id: "673b172043ad5c351421916f",
//     name: "उदय कुमार मेहता",
//   },
//   {
//     _id: "673b172043ad5c3514219174",
//     name: "कुमार उज्ज्वल",
//   },
//   {
//     _id: "673b172143ad5c3514219179",
//     name: "मनोज कुमार चंद्र",
//   },
//   {
//     _id: "673b172143ad5c351421917e",
//     name: "जितेंद्र कुमार",
//   },
//   {
//     _id: "673b172143ad5c3514219183",
//     name: "जनार्दन पासवान",
//   },
//   {
//     _id: "673b172143ad5c3514219188",
//     name: "रश्मि प्रकाश",
//   },
//   {
//     _id: "673b172143ad5c351421918d",
//     name: "पुन भुईयां",
//   },
//   {
//     _id: "673b172143ad5c3514219192",
//     name: "बाबूलाल मरांडी",
//   },
//   {
//     _id: "673b172143ad5c3514219197",
//     name: "निजामुद्दीन अंसारी",
//   },
//   {
//     _id: "673b172243ad5c351421919c",
//     name: "राज कुमार यादव",
//   },
//   {
//     _id: "673b172243ad5c35142191a1",
//     name: "नागेंद्र महतो",
//   },
//   {
//     _id: "673b172243ad5c35142191a6",
//     name: "विनोद कुमार सिंह",
//   },
//   {
//     _id: "673b172243ad5c35142191ab",
//     name: "मो सलीम",
//   },
//   {
//     _id: "673b172243ad5c35142191b0",
//     name: "केदार हाजरा",
//   },
//   {
//     _id: "673b172243ad5c35142191b5",
//     name: "मंजू कुमारी",
//   },
//   {
//     _id: "673b172243ad5c35142191ba",
//     name: "रोहित कुमार दास",
//   },
//   {
//     _id: "673b172243ad5c35142191bf",
//     name: "कल्पना सोरेन",
//   },
//   {
//     _id: "673b172343ad5c35142191c4",
//     name: "मुनिया देवी",
//   },
//   {
//     _id: "673b172343ad5c35142191c9",
//     name: "मो कौसर आजाद",
//   },
//   {
//     _id: "673b172343ad5c35142191ce",
//     name: "निर्भय कुमार शाहाबादी",
//   },
//   {
//     _id: "673b172343ad5c35142191d3",
//     name: "सुदिव्य कुमार",
//   },
//   {
//     _id: "673b172343ad5c35142191d8",
//     name: "नवीन आनंद",
//   },
//   {
//     _id: "673b172343ad5c35142191dd",
//     name: "बेबी देवी",
//   },
//   {
//     _id: "673b172343ad5c35142191e2",
//     name: "यशोदा देवी",
//   },
//   {
//     _id: "673b172443ad5c35142191e7",
//     name: "जयराम कुमार महतो",
//   },
//   {
//     _id: "673b172443ad5c35142191ec",
//     name: "योगेंद्र प्रसाद",
//   },
//   {
//     _id: "673b172443ad5c35142191f1",
//     name: "लंबोदर महतो",
//   },
//   {
//     _id: "673b172443ad5c35142191f6",
//     name: "पूजा कुमारी",
//   },
//   {
//     _id: "673b172443ad5c35142191fb",
//     name: "कुमार जयमंगल सिंह (अनूप सिंह)",
//   },
//   {
//     _id: "673b172443ad5c3514219200",
//     name: "रवींद्र कुमार पांडेय",
//   },
//   {
//     _id: "673b172443ad5c3514219205",
//     name: "जयराम कुमार महतो",
//   },
//   {
//     _id: "673b172543ad5c351421920a",
//     name: "विरंची नारायण",
//   },
//   {
//     _id: "673b172543ad5c351421920f",
//     name: "श्वेता सिंह",
//   },
//   {
//     _id: "673b172543ad5c3514219214",
//     name: "सरोज कुमारी",
//   },
//   {
//     _id: "673b172543ad5c3514219219",
//     name: "अमर कुमार बाउरी",
//   },
//   {
//     _id: "673b172543ad5c351421921e",
//     name: "उमाकांत रजक",
//   },
//   {
//     _id: "673b172543ad5c3514219223",
//     name: "अर्जुन रजवार",
//   },
//   {
//     _id: "673b172543ad5c3514219228",
//     name: "तारा देवी",
//   },
//   {
//     _id: "673b172543ad5c351421922d",
//     name: "चंद्रदेव महतो",
//   },
//   {
//     _id: "673b172643ad5c3514219232",
//     name: "उषा देवी",
//   },
//   {
//     _id: "673b172643ad5c3514219237",
//     name: "अपर्णा सेनगुप्ता",
//   },
//   {
//     _id: "673b172643ad5c351421923c",
//     name: "अरूप चटर्जी",
//   },
//   {
//     _id: "673b172643ad5c3514219241",
//     name: "अशोक कुमार मंडल",
//   },
//   {
//     _id: "673b172643ad5c3514219246",
//     name: "राज सिन्हा",
//   },
//   {
//     _id: "673b172643ad5c351421924b",
//     name: "अजय कुमार दुबे",
//   },
//   {
//     _id: "673b172643ad5c3514219250",
//     name: "सपन कुमार मोदक",
//   },
//   {
//     _id: "673b172743ad5c3514219255",
//     name: "पूर्णिमा नीरज सिंह",
//   },
//   {
//     _id: "673b172743ad5c351421925a",
//     name: "रागिनी सिंह",
//   },
//   {
//     _id: "673b172743ad5c351421925f",
//     name: "मो रुस्तम अंसारी",
//   },
//   {
//     _id: "673b172743ad5c3514219264",
//     name: "मथुरा प्रसाद महतो",
//   },
//   {
//     _id: "673b172743ad5c3514219269",
//     name: "विकास कुमार महतो",
//   },
//   {
//     _id: "673b172743ad5c351421926e",
//     name: "मोतीलाल महतो",
//   },
//   {
//     _id: "673b172743ad5c3514219273",
//     name: "जलेश्वर महतो",
//   },
//   {
//     _id: "673b172743ad5c3514219278",
//     name: "शत्रुघ्न महतो",
//   },
//   {
//     _id: "673b172843ad5c351421927d",
//     name: "दीपक कुमार रवानी",
//   },
//   {
//     _id: "673b172843ad5c3514219282",
//     name: "दिनेशानंद गोस्वामी",
//   },
//   {
//     _id: "673b172843ad5c3514219287",
//     name: "समीर कुमार मोहंती",
//   },
//   {
//     _id: "673b172843ad5c351421928c",
//     name: "स्वपन कुमार महतो",
//   },
//   {
//     _id: "673b172843ad5c3514219291",
//     name: "बाबूलाल सोरेन",
//   },
//   {
//     _id: "673b172843ad5c3514219296",
//     name: "राम दास मुर्मू",
//   },
//   {
//     _id: "673b172843ad5c351421929b",
//     name: "राम दास सोरेन ",
//   },
//   {
//     _id: "673b172943ad5c35142192a0",
//     name: "मीरा मुंडा",
//   },
//   {
//     _id: "673b172943ad5c35142192a5",
//     name: "संजीव सरदार",
//   },
//   {
//     _id: "673b172943ad5c35142192aa",
//     name: "भागीरथी हांसदा",
//   },
//   {
//     _id: "673b172943ad5c35142192af",
//     name: "मंगल कालिंदी",
//   },
//   {
//     _id: "673b172943ad5c35142192b4",
//     name: "रामचंद्र सहिस",
//   },
//   {
//     _id: "673b172943ad5c35142192b9",
//     name: "विनोद स्वांसी",
//   },
//   {
//     _id: "673b172943ad5c35142192be",
//     name: "अजय कुमार",
//   },
//   {
//     _id: "673b172a43ad5c35142192c3",
//     name: "पूर्णिमा साहू",
//   },
//   {
//     _id: "673b172a43ad5c35142192c8",
//     name: "तरुण कुमार डे",
//   },
//   {
//     _id: "673b172a43ad5c35142192cd",
//     name: "सरयू रॉय",
//   },
//   {
//     _id: "673b172a43ad5c35142192d2",
//     name: "बन्ना गुप्ता",
//   },
//   {
//     _id: "673b172a43ad5c35142192d7",
//     name: "राशिद हुसैन",
//   },
//   {
//     _id: "673b172a43ad5c35142192dc",
//     name: "सबिता महतो",
//   },
//   {
//     _id: "673b172a43ad5c35142192e1",
//     name: "हरे लाल महतो",
//   },
//   {
//     _id: "673b172b43ad5c35142192e6",
//     name: "तरुण महतो",
//   },
//   {
//     _id: "673b172b43ad5c35142192eb",
//     name: "चंपाई सोरेन",
//   },
//   {
//     _id: "673b172b43ad5c35142192f0",
//     name: "गणेश महाली",
//   },
//   {
//     _id: "673b172b43ad5c35142192f5",
//     name: "प्रेम मार्डी",
//   },
//   {
//     _id: "673b172b43ad5c35142192fa",
//     name: "गीता बलमुचू",
//   },
//   {
//     _id: "673b172b43ad5c35142192ff",
//     name: "दीपक बिरुवा",
//   },
//   {
//     _id: "673b172b43ad5c3514219304",
//     name: "कोलंबस हांसदा",
//   },
//   {
//     _id: "673b172c43ad5c3514219309",
//     name: "निरल पुरती",
//   },
//   {
//     _id: "673b172c43ad5c351421930e",
//     name: "बड़कुंवर गगराई",
//   },
//   {
//     _id: "673b172c43ad5c3514219313",
//     name: "बहालेन चांपिया",
//   },
//   {
//     _id: "673b172c43ad5c3514219318",
//     name: "गीता कोड़ा",
//   },
//   {
//     _id: "673b172c43ad5c351421931d",
//     name: "सोनाराम सिंकु",
//   },
//   {
//     _id: "673b172c43ad5c3514219322",
//     name: "लक्ष्मी नारायण लागुरी",
//   },
//   {
//     _id: "673b172c43ad5c3514219327",
//     name: "जगत माझी",
//   },
//   {
//     _id: "673b172d43ad5c351421932c",
//     name: "दिनेश चंद्र बोयपाई",
//   },
//   {
//     _id: "673b172d43ad5c3514219331",
//     name: "दिलबर खाखा",
//   },
//   {
//     _id: "673b172d43ad5c3514219336",
//     name: "शशिभूषण समद",
//   },
//   {
//     _id: "673b172d43ad5c351421933b",
//     name: "सुखराम उरांव",
//   },
//   {
//     _id: "673b172d43ad5c3514219340",
//     name: "बसंती पुरती",
//   },
//   {
//     _id: "673b172d43ad5c3514219345",
//     name: "दशरथ गगराई",
//   },
//   {
//     _id: "673b172d43ad5c351421934a",
//     name: "सोनाराम बोदरा",
//   },
//   {
//     _id: "673b172e43ad5c351421934f",
//     name: "पांडू राम हाईबुरू",
//   },
//   {
//     _id: "673b172e43ad5c3514219354",
//     name: "गोपाल कृष्ण पातर",
//   },
//   {
//     _id: "673b172e43ad5c3514219359",
//     name: "विकास कुमार मुंडा",
//   },
//   {
//     _id: "673b172e43ad5c351421935e",
//     name: "दमयंती मुंडा",
//   },
//   {
//     _id: "673b172e43ad5c3514219363",
//     name: "कोचे मुंडा",
//   },
//   {
//     _id: "673b172e43ad5c3514219368",
//     name: "सुदीप गुड़िया",
//   },
//   {
//     _id: "673b172e43ad5c351421936d",
//     name: "कुलान पतरस आइंद",
//   },
//   {
//     _id: "673b172e43ad5c3514219372",
//     name: "नीलकंठ सिंह मुंडा",
//   },
//   {
//     _id: "673b172f43ad5c3514219377",
//     name: "राम सूर्य मुंडा",
//   },
//   {
//     _id: "673b172f43ad5c351421937c",
//     name: "बी अनिल कुमार",
//   },
//   {
//     _id: "673b172f43ad5c3514219381",
//     name: "सुदेश कुमार महतो",
//   },
//   {
//     _id: "673b172f43ad5c3514219386",
//     name: "अमित कुमार",
//   },
//   {
//     _id: "673b172f43ad5c351421938b",
//     name: "देवेंद्र नाथ महतो",
//   },
//   {
//     _id: "673b172f43ad5c3514219390",
//     name: "राम कुमार पाहन",
//   },
//   {
//     _id: "673b172f43ad5c3514219395",
//     name: "राजेश कच्छप",
//   },
//   {
//     _id: "673b173043ad5c351421939a",
//     name: "समुंदर पाहन",
//   },
//   {
//     _id: "673b173043ad5c351421939f",
//     name: "सीपी सिंह",
//   },
//   {
//     _id: "673b173043ad5c35142193a4",
//     name: "महुआ माजी",
//   },
//   {
//     _id: "673b173043ad5c35142193a9",
//     name: "राज किशोर महतो",
//   },
//   {
//     _id: "673b173043ad5c35142193ae",
//     name: "नवीन जायसवाल",
//   },
//   {
//     _id: "673b173043ad5c35142193b3",
//     name: "अजय नाथ शाहदेव",
//   },
//   {
//     _id: "673b173043ad5c35142193b8",
//     name: "अयूब अली",
//   },
//   {
//     _id: "673b173043ad5c35142193bd",
//     name: "डॉ जीतू चरण राम",
//   },
//   {
//     _id: "673b173143ad5c35142193c2",
//     name: "सुरेश कुमार बैठा",
//   },
//   {
//     _id: "673b173143ad5c35142193c7",
//     name: "फुलेश्वर बैठा",
//   },
//   {
//     _id: "673b173143ad5c35142193cc",
//     name: "शिल्पी नेहा तिर्की",
//   },
//   {
//     _id: "673b173143ad5c35142193d1",
//     name: "सन्नी टोप्पो",
//   },
//   {
//     _id: "673b173143ad5c35142193d6",
//     name: "गुना भगत",
//   },
//   {
//     _id: "673b173143ad5c35142193db",
//     name: "अरुण कुमार उरांव",
//   },
//   {
//     _id: "673b173143ad5c35142193e0",
//     name: "जिग्गा सुसारण होरो",
//   },
//   {
//     _id: "673b173243ad5c35142193e5",
//     name: "सुशील टोप्पो",
//   },
//   {
//     _id: "673b173243ad5c35142193ea",
//     name: "भूषण तिर्की",
//   },
//   {
//     _id: "673b173243ad5c35142193ef",
//     name: "सुदर्शन भगत",
//   },
//   {
//     _id: "673b173243ad5c35142193f4",
//     name: "निशा कुमारी भगत",
//   },
//   {
//     _id: "673b173243ad5c35142193f9",
//     name: "समीर उरांव",
//   },
//   {
//     _id: "673b173243ad5c35142193fe",
//     name: "चमरा लिंडा",
//   },
//   {
//     _id: "673b173243ad5c3514219403",
//     name: "यशोदा देवी",
//   },
//   {
//     _id: "673b173343ad5c3514219408",
//     name: "भूषण बाड़ा",
//   },
//   {
//     _id: "673b173343ad5c351421940d",
//     name: "श्रद्धानंद बेसरा",
//   },
//   {
//     _id: "673b173343ad5c3514219412",
//     name: "सुमन कुल्लू",
//   },
//   {
//     _id: "673b173343ad5c3514219417",
//     name: "नमन विक्सल कोंगाड़ी",
//   },
//   {
//     _id: "673b173343ad5c351421941c",
//     name: "सुजन जोजो",
//   },
//   {
//     _id: "673b173343ad5c3514219421",
//     name: "पुनीत कुमार",
//   },
//   {
//     _id: "673b173343ad5c3514219426",
//     name: "नीरू शांति भगत",
//   },
//   {
//     _id: "673b173343ad5c351421942b",
//     name: "रामेश्वर उरांव",
//   },
//   {
//     _id: "673b173443ad5c3514219430",
//     name: "किशोर उरांव",
//   },
//   {
//     _id: "673b173443ad5c3514219435",
//     name: "रामचंद्र सिंह",
//   },
//   {
//     _id: "673b173443ad5c351421943a",
//     name: "हरिकृष्ण सिंह",
//   },
//   {
//     _id: "673b173443ad5c351421943f",
//     name: "बलवंत सिंह",
//   },
//   {
//     _id: "673b173443ad5c3514219444",
//     name: "प्रकाश राम",
//   },
//   {
//     _id: "673b173443ad5c3514219449",
//     name: "बैद्यनाथ राम",
//   },
//   {
//     _id: "673b173443ad5c351421944e",
//     name: "संतोष कुमार पासवान",
//   },
//   {
//     _id: "673b173443ad5c3514219453",
//     name: "कुशवाहा शशि भूषण मेहता",
//   },
//   {
//     _id: "673b173543ad5c3514219458",
//     name: "लाल सूरज",
//   },
//   {
//     _id: "673b173543ad5c351421945d",
//     name: "ओंकार नाथ",
//   },
//   {
//     _id: "673b173543ad5c3514219462",
//     name: "आलोक कुमार चौरसिया",
//   },
//   {
//     _id: "673b173543ad5c3514219467",
//     name: "कृष्णानंद त्रिपाठी",
//   },
//   {
//     _id: "673b173543ad5c351421946c",
//     name: "अनिकेत",
//   },
//   {
//     _id: "673b173543ad5c3514219471",
//     name: "रामचंद्र चंद्रवंशी",
//   },
//   {
//     _id: "673b173543ad5c3514219476",
//     name: "सुधीर कुमार",
//   },
//   {
//     _id: "673b173643ad5c351421947b",
//     name: "नरेश प्रसाद सिंह",
//   },
//   {
//     _id: "673b173643ad5c3514219480",
//     name: "पुष्पा देवी",
//   },
//   {
//     _id: "673b173643ad5c3514219485",
//     name: "राधा कृष्ण किशोर",
//   },
//   {
//     _id: "673b173643ad5c351421948a",
//     name: "विजय कुमार",
//   },
//   {
//     _id: "673b173643ad5c351421948f",
//     name: "कमलेश कुमार सिंह",
//   },
//   {
//     _id: "673b173643ad5c3514219494",
//     name: "कुशवाहा शिवपूजन मेहता",
//   },
//   {
//     _id: "673b173643ad5c3514219499",
//     name: "संजय कुमार सिंह यादव",
//   },
//   {
//     _id: "673b173643ad5c351421949e",
//     name: "मिथिलेश कुमार ठाकुर",
//   },
//   {
//     _id: "673b173743ad5c35142194a3",
//     name: "सत्येंद्र नाथ तिवारी",
//   },
//   {
//     _id: "673b173743ad5c35142194a8",
//     name: "गिरिनाथ सिंह",
//   },
//   {
//     _id: "673b173743ad5c35142194ad",
//     name: "भानु प्रताप शाही",
//   },
//   {
//     _id: "673b173743ad5c35142194b2",
//     name: "अनंत प्रताप देव",
//   },
//   {
//     _id: "673b173743ad5c35142194b7",
//     name: "पंकज कुमार",
//   },
//   {
//     _id: "67415f3c833843a764e5f35a",
//     name: "माधव चंद्र कुंकल",
//   },
//   {
//     _id: "67416333833843a76409d74b",
//     name: "विजय सिंह गगराई",
//   },
//   {
//     _id: "674172bc833843a764a4688a",
//     name: "शिव शंकर सिंह",
//   },
//   {
//     _id: "674187ae833843a7647f2595",
//     name: "शंभू नाथ चौधरी",
//   },
//   {
//     _id: "674189d1833843a76496bf3a",
//     name: "देवेंद्र कुमार सिंह",
//   },
//   {
//     _id: "67418d63833843a764bdd91c",
//     name: "रमेश बलमुचू",
//   },
//   {
//     _id: "67418e6c833843a764c949e8",
//     name: "मंगल सिंह बोबोंगा",
//   },
//   {
//     _id: "674199f2833843a7645033bb",
//     name: "रोहित यादव",
//   },
//   {
//     _id: "67419bc6833843a764657d59",
//     name: "मडुआ कच्छप",
//   },
//   {
//     _id: "67419c3a833843a7646aa24c",
//     name: "इरीन एक्का",
//   },
//   {
//     _id: "67419d05833843a76473bb5b",
//     name: "हबील मुर्मू",
//   },
//   {
//     _id: "6741e207833843a764cb248c",
//     name: "बातेश्वर प्रसाद मेहता",
//   },
//   {
//     _id: "6741e431833843a764d8a89e",
//     name: "राहुल प्रसाद गुप्ता",
//   },
//   {
//     _id: "6741e4c1833843a764dc55ce",
//     name: "राजेश मेहता",
//   },
//   {
//     _id: "6741e63c833843a764e5c507",
//     name: "जगन्नाथ ओरांव",
//   },
//   {
//     _id: "6741ef18833843a7641adfab",
//     name: "अशोक भारती",
//   },
//   {
//     _id: "67420e01833843a764aa998d",
//     name: "शालिनी गुप्ता",
//   },
//   {
//     _id: "679849b6b981bc0792dd5d6f",
//     name: "राज करन खत्री",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b43",
//     name: "राज कुमार भाटिया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b44",
//     name: "शिवांक सिंघल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b45",
//     name: "मुकेश गोयल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b46",
//     name: "शैलेश कुमार (JDU)",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b47",
//     name: "मंगेश त्यागी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b48",
//     name: "संजीव झा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b49",
//     name: "सूर्य प्रकाश खात्री",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4a",
//     name: "लोकेंद्र चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4b",
//     name: "सुरेंद्र पाल सिंह बिट्टू",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4c",
//     name: "दीपक चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4d",
//     name: "देवेंद्र यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4e",
//     name: "अजेय यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b4f",
//     name: "राज करन खत्री",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b50",
//     name: "अरुणा कुमारी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b51",
//     name: "शरद चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b52",
//     name: "रवींद्र कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b53",
//     name: "सुरेंद्र कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b54",
//     name: "जय भगवान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b55",
//     name: "राजेंद्र दराल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b56",
//     name: "धर्मपाल लकड़ा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b57",
//     name: "जसबीर कराला",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b58",
//     name: "बजरंग शुक्ल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b59",
//     name: "राजेश गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5a",
//     name: "अनिल झा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5b",
//     name: "कर्म सिंह करमा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5c",
//     name: "जय किशन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5d",
//     name: "मुकेश कुमार अहलावत",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5e",
//     name: "मनोज शौकीन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b5f",
//     name: "शौकीन रोहित चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b60",
//     name: "रघुविंदर शौकीन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b61",
//     name: "राजकुमार चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b62",
//     name: "हनुमान चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b63",
//     name: "राकेश जाटव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b64",
//     name: "विजेंद्र गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b65",
//     name: "सोमेश गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b66",
//     name: "प्रदीप मित्तल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b67",
//     name: "रेखा गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b68",
//     name: "प्रवीण जैन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b69",
//     name: "बंदना कुमारी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6a",
//     name: "करनैल सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6b",
//     name: "सतीश लूथरा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6c",
//     name: "सत्येंद्र जैन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6d",
//     name: "तिलक राम गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6e",
//     name: "सतेंद्र शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b6f",
//     name: "प्रीति तोमर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b70",
//     name: "पूनम शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b71",
//     name: "रागिनी नायक",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b72",
//     name: "राजेश गुप्ता",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b73",
//     name: "अशोक गोयल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b74",
//     name: "कुंवर करण सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b75",
//     name: "अखिलेश पति त्रिपाठी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b76",
//     name: "मनोज कुमार जिंदल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b77",
//     name: "अनिल भारद्वाज",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b78",
//     name: "सोमदत्त",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b79",
//     name: "सतीश जैन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7a",
//     name: "मुदित अग्रवाल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7b",
//     name: "पुनर्दीप सिंह साहनी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7c",
//     name: "दीप्ति इंदौरा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7d",
//     name: "असीम अहमद खान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7e",
//     name: "शोएब इकबाल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b7f",
//     name: "कमल बागड़ी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b80",
//     name: "हारून यूसुफ",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b81",
//     name: "इमरान हुसैन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b82",
//     name: "दुष्यंत कुमार गौतम",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b83",
//     name: "राहुल धानक",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b84",
//     name: "विशेष रवि",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b85",
//     name: "राज कुमार आनंद",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b86",
//     name: "श्रीमती कृष्णा तीरथ",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b87",
//     name: "परवेश रतन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b88",
//     name: "हरीश खुराना",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b89",
//     name: "राजेंद्र नामधारी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8a",
//     name: "शिव चरण गोयल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8b",
//     name: "उर्मिला गंगवाल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8c",
//     name: "जे.पी. पंवार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8d",
//     name: "राखी बिडलान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8e",
//     name: "मनजिंदर सिंह सिरसा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b8f",
//     name: "धर्मपाल चंदेला",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b90",
//     name: "धनवती चंदेला",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b91",
//     name: "श्याम शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b92",
//     name: "प्रेम शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b93",
//     name: "सुरिंदर सेतिया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b94",
//     name: "श्वेत सैनी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b95",
//     name: "पीएस बावा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b96",
//     name: "जरनैल सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b97",
//     name: "आशीष सूद",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b98",
//     name: "श्रीमती हरबानी कौर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b99",
//     name: "प्रवीण कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9a",
//     name: "जितेन्द्र सोलंकी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9b",
//     name: "एडवोकेट जितेन्द्र सोलंकी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9c",
//     name: "महिंदर यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9d",
//     name: "पवन शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9e",
//     name: "मुकेश शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85b9f",
//     name: "पोश बलीयन (पूजा नरेश बलीयन)",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba0",
//     name: "प्रदयुमं राजपूत",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba1",
//     name: "आदर्श शास्त्री",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba2",
//     name: "विनय मिश्रा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba3",
//     name: "संदीप सहरावत",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba4",
//     name: "रघुविंदर शौकीन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba5",
//     name: "सुमेश शौकीन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba6",
//     name: "नीलम पहलवान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba7",
//     name: "सुषमा यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba8",
//     name: "तरुण यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85ba9",
//     name: "कैलाश गहलोत",
//   },
//   {
//     _id: "67985e0f515525dd9cd85baa",
//     name: "देवेंद्र सहरावत",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bab",
//     name: "सुरेंद्र भारद्वाज",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bac",
//     name: "कुलदीप सोलंकी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bad",
//     name: "मांगे राम",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bae",
//     name: "जोगिंदर सोलंकी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85baf",
//     name: "भुवन तंवर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb0",
//     name: "प्रदीप कुमार उपमन्यु",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb1",
//     name: "वीरेंद्र सिंह कादयान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb2",
//     name: "उमंग बजाज",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb3",
//     name: "विनीता यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb4",
//     name: "दुर्गेश पाठक",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb5",
//     name: "प्रवेश साहिब सिंह वर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb6",
//     name: "संदीप दीक्षित",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb7",
//     name: "अरविंद केजरीवाल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb8",
//     name: "गजेंद्र यादव",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bb9",
//     name: "पुष्पा सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bba",
//     name: "महेंद्र चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bbb",
//     name: "सरदार तरविंदर सिंह मारवाह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bbc",
//     name: "फरहान सूरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bbd",
//     name: "मनीष सिसोदिया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bbe",
//     name: "नीरज बसोया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bbf",
//     name: "अभिषेक दत्त",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc0",
//     name: "रमेश पहलवान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc1",
//     name: "सतीश उपाध्याय",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc2",
//     name: "जितेंद्र कुमार कोचर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc3",
//     name: "सोमनाथ भारती",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc4",
//     name: "अनिल शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc5",
//     name: "विशेष टोकस",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc6",
//     name: "प्रमिला टोकस",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc7",
//     name: "करतार सिंह तंवर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc8",
//     name: "राजेंद्र तंवर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bc9",
//     name: "ब्रह्म सिंह तंवर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bca",
//     name: "दीपक तंवर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bcb",
//     name: "राजेश चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bcc",
//     name: "प्रेम कुमार चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bcd",
//     name: "खुशीराम चुनार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bce",
//     name: "जय प्रकाश",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bcf",
//     name: "अजय दत्त",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd0",
//     name: "चंदन चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd1",
//     name: "हर्ष चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd2",
//     name: "दिनेश मोहनिया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd3",
//     name: "शिखा राय",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd4",
//     name: "गर्वित सिंघवी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd5",
//     name: "सौरभ भारद्वाज",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd6",
//     name: "रमेश विधूड़ी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd7",
//     name: "अलका लांबा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd8",
//     name: "आतिशी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bd9",
//     name: "रोहतास विधूड़ी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bda",
//     name: "वीरेंद्र बिधूड़ी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bdb",
//     name: "साही राम",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bdc",
//     name: "नारायण शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bdd",
//     name: "राम सिंह नेटा जी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bde",
//     name: "राम सिंह नेटा जी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bdf",
//     name: "मनीष चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be0",
//     name: "अरीबा खान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be1",
//     name: "अमानतुल्लाह खान(हॉट सीट)",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be2",
//     name: "रविकांत उज्जैन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be3",
//     name: "अमरदीप",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be4",
//     name: "अंजना पारचा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be5",
//     name: "प्रियंका गौतम",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be6",
//     name: "अक्षय कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be7",
//     name: "कुलदीप कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be8",
//     name: "रवींद्र सिंह नेगी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85be9",
//     name: "चौधरी अनिल कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bea",
//     name: "अवध ओझा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85beb",
//     name: "अभय वर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bec",
//     name: "सुमित शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bed",
//     name: "बीबी त्यागी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bee",
//     name: "ओम प्रकाश शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bef",
//     name: "राजीव चौधरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf0",
//     name: "दीपक सिंगला",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf1",
//     name: "डॉ. अनिल गोयल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf2",
//     name: "गुरचरण सिंह राजू",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf3",
//     name: "विकास बग्गा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf4",
//     name: "सरदार अरविंदर सिंह लवली",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf5",
//     name: "कमल अरोड़ा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf6",
//     name: "नवीन चौधरी (दीपू)",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf7",
//     name: "संजय गोयल",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf8",
//     name: "जगत सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bf9",
//     name: "पद्मश्री जितेंद्र सिंह शंटी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bfa",
//     name: "सुष्री कुमारी रिंकू",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bfb",
//     name: "राजेश लिलोठिया",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bfc",
//     name: "वीर सिंह ढींगन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bfd",
//     name: "जितेंद्र महाजन",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bfe",
//     name: "सुरेश वाटी चौहान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85bff",
//     name: "सरिता सिंह",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c00",
//     name: "अनिल गौड़",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c01",
//     name: "अब्दुल रहमान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c02",
//     name: "चौधरी जुबैर अहमद",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c03",
//     name: "अजय महावर",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c04",
//     name: "भीष्म शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c05",
//     name: "गौरव शर्मा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c06",
//     name: "अनिल वशिष्ट",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c07",
//     name: "हाजी मोहम्मद इस्हाक खान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c08",
//     name: "गोपाल राय",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c09",
//     name: "प्रवीण निमेष",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0a",
//     name: "ईश्वर बागरी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0b",
//     name: "सुरेंद्र कुमार",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0c",
//     name: "मोहन सिंह बिष्ट",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0d",
//     name: "अनिल महंदी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0e",
//     name: "अदिल अहमद खान",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c0f",
//     name: "कपिल मिश्रा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c10",
//     name: "पीके मिश्रा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c11",
//     name: "मनोज त्यागी",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c12",
//     name: "कुलवंत राणा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c13",
//     name: "सुशांत मिश्रा",
//   },
//   {
//     _id: "67985e0f515525dd9cd85c14",
//     name: "महेंद्र गोयल",
//   },
// ];

// const constituenciesWithIDs = [
//   {
//     _id: "678a03efff11b6f64583b7fc",
//     name: "Nerela",
//   },
//   {
//     _id: "678a03efff11b6f64583b7fd",
//     name: "Burari",
//   },
//   {
//     _id: "678a03efff11b6f64583b7fe",
//     name: "Timarpur",
//   },
//   {
//     _id: "678a03efff11b6f64583b7ff",
//     name: "Adarsh Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b800",
//     name: "Badli",
//   },
//   {
//     _id: "678a03efff11b6f64583b801",
//     name: "Rithala",
//   },
//   {
//     _id: "678a03efff11b6f64583b802",
//     name: "Bawana",
//   },
//   {
//     _id: "678a03efff11b6f64583b803",
//     name: "Mundka",
//   },
//   {
//     _id: "678a03efff11b6f64583b804",
//     name: "Kirari",
//   },
//   {
//     _id: "678a03efff11b6f64583b805",
//     name: "Sultanpur Majra",
//   },
//   {
//     _id: "678a03efff11b6f64583b806",
//     name: "Nangloi Jat",
//   },
//   {
//     _id: "678a03efff11b6f64583b807",
//     name: "Mangol Puri",
//   },
//   {
//     _id: "678a03efff11b6f64583b808",
//     name: "Rohini",
//   },
//   {
//     _id: "678a03efff11b6f64583b809",
//     name: "Shalimar Bagh",
//   },
//   {
//     _id: "678a03efff11b6f64583b80a",
//     name: "Shakur Basti",
//   },
//   {
//     _id: "678a03efff11b6f64583b80b",
//     name: "Tri Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b80c",
//     name: "Wazirpur",
//   },
//   {
//     _id: "678a03efff11b6f64583b80d",
//     name: "Model Town",
//   },
//   {
//     _id: "678a03efff11b6f64583b80e",
//     name: "Sadar Bazar",
//   },
//   {
//     _id: "678a03efff11b6f64583b80f",
//     name: "Chandni Chowk",
//   },
//   {
//     _id: "678a03efff11b6f64583b810",
//     name: "Matia Mahal",
//   },
//   {
//     _id: "678a03efff11b6f64583b811",
//     name: "Ballimaran",
//   },
//   {
//     _id: "678a03efff11b6f64583b812",
//     name: "Karol Bagh",
//   },
//   {
//     _id: "678a03efff11b6f64583b813",
//     name: "Patel Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b814",
//     name: "Moti Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b815",
//     name: "Madipur",
//   },
//   {
//     _id: "678a03efff11b6f64583b816",
//     name: "Rajouri Garden",
//   },
//   {
//     _id: "678a03efff11b6f64583b817",
//     name: "Hari Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b818",
//     name: "Tilak Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b819",
//     name: "Janakpuri",
//   },
//   {
//     _id: "678a03efff11b6f64583b81a",
//     name: "Vikaspuri",
//   },
//   {
//     _id: "678a03efff11b6f64583b81b",
//     name: "Uttam Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b81c",
//     name: "Dwarka",
//   },
//   {
//     _id: "678a03efff11b6f64583b81d",
//     name: "Matiala",
//   },
//   {
//     _id: "678a03efff11b6f64583b81e",
//     name: "Najafgarh",
//   },
//   {
//     _id: "678a03efff11b6f64583b81f",
//     name: "Bijwasan",
//   },
//   {
//     _id: "678a03efff11b6f64583b820",
//     name: "Palam",
//   },
//   {
//     _id: "678a03efff11b6f64583b821",
//     name: "Delhi Cantt",
//   },
//   {
//     _id: "678a03efff11b6f64583b822",
//     name: "Rajinder Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b823",
//     name: "New delhi",
//   },
//   {
//     _id: "678a03efff11b6f64583b824",
//     name: "Jangpura",
//   },
//   {
//     _id: "678a03efff11b6f64583b825",
//     name: "Kasturba Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b826",
//     name: "Malviya Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b827",
//     name: "R K Puram",
//   },
//   {
//     _id: "678a03efff11b6f64583b828",
//     name: "Mehrauli",
//   },
//   {
//     _id: "678a03efff11b6f64583b82a",
//     name: "Deoli",
//   },
//   {
//     _id: "678a03efff11b6f64583b82b",
//     name: "Ambedkar Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b82c",
//     name: "Sangam Vihar",
//   },
//   {
//     _id: "678a03efff11b6f64583b82d",
//     name: "Greater Kailash",
//   },
//   {
//     _id: "678a03efff11b6f64583b82e",
//     name: "Kalkaji",
//   },
//   {
//     _id: "678a03efff11b6f64583b82f",
//     name: "Tughlakabad",
//   },
//   {
//     _id: "678a03efff11b6f64583b830",
//     name: "Badarpur",
//   },
//   {
//     _id: "678a03efff11b6f64583b831",
//     name: "Okhla",
//   },
//   {
//     _id: "678a03efff11b6f64583b832",
//     name: "Trilokpuri",
//   },
//   {
//     _id: "678a03efff11b6f64583b833",
//     name: "Kondli",
//   },
//   {
//     _id: "678a03efff11b6f64583b834",
//     name: "Patparganj",
//   },
//   {
//     _id: "678a03efff11b6f64583b835",
//     name: "Laxmi Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b836",
//     name: "Vishwas Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b837",
//     name: "Krishna Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b838",
//     name: "Gandhi Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b839",
//     name: "Shahdara",
//   },
//   {
//     _id: "678a03efff11b6f64583b83a",
//     name: "Seema Puri",
//   },
//   {
//     _id: "678a03efff11b6f64583b83b",
//     name: "Rohtas Nagar",
//   },
//   {
//     _id: "678a03efff11b6f64583b83c",
//     name: "Seelampur",
//   },
//   {
//     _id: "678a03efff11b6f64583b83d",
//     name: "Ghonda",
//   },
//   {
//     _id: "678a03efff11b6f64583b83e",
//     name: "Babarpur",
//   },
//   {
//     _id: "678a03efff11b6f64583b83f",
//     name: "Gokalpur",
//   },
//   {
//     _id: "678a03efff11b6f64583b840",
//     name: "Mustafabad",
//   },
//   {
//     _id: "678a03efff11b6f64583b841",
//     name: "Karawal Nagar",
//   },
// ];

// const generateCandidatesJson = (candidateArray, parties) => {
//   return candidateArray
//     .map((candidate) => {
//       return parties.map((party) => {
//         return {
//           name: candidate[party.name].candidateName,
//           age: null,
//           gender: "Male",
//           party: party.id,
//           totalVotes: 0,
//           hotCandidate: candidate[party.name].hotCandidate,
//           image: null,
//           constituency: [candidate.constituency],
//         };
//       });
//     })
//     .flat();
// };

// const candidatesJson = generateCandidatesJson(candidateArray, parties);
// fs.writeFile(
//   "candidates.json",
//   JSON.stringify(candidatesJson, null, 2),
//   (err) => {
//     if (err) throw err;
//     console.log("Data has been written to candidates.json");
//   }
// );
// console.log(candidatesJson);

const { MongoClient, ObjectId } = require("mongodb");
const { format } = require("path");

const uri = "mongodb://pkwp_user:uk,x%40a5101%3EymJbE@148.113.6.195:27017/"; // Replace with your MongoDB connection string
const dbName = "election-result";
const collectionName = "candidates";

async function updateDocuments() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // List of candidate names to match
    const candidateNames = [
      "मुकेश गोयल",
      "राज कुमार भाटिया",
      "शिवांक सिंघल",
      "संजीव झा",
      "शैलेश कुमार (JDU)",
      "मंगेश त्यागी",
      "सुरेंद्र पाल सिंह बिट्टू",
      "सूर्य प्रकाश खात्री",
      "लोकेंद्र चौधरी",
      "अजेय यादव",
      "दीपक चौधरी",
      "देवेंद्र यादव",
      "शरद चौहान",
      "राज करन खत्री",
      "अरुणा कुमारी",
      "जय भगवान",
      "रवींद्र कुमार",
      "सुरेंद्र कुमार",
      "जसबीर कराला",
      "राजेंद्र दराल",
      "धर्मपाल लकड़ा",
      "अनिल झा",
      "बजरंग शुक्ल",
      "राजेश गुप्ता",
      "मुकेश कुमार अहलावत",
      "कर्म सिंह करमा",
      "जय किशन",
      "रघुविंदर शौकीन",
      "मनोज शौकीन",
      "शौकीन रोहित चौधरी",
      "राकेश जाटव",
      "राजकुमार चौहान",
      "हनुमान चौहान",
      "प्रदीप मित्तल",
      "विजेंद्र गुप्ता",
      "सोमेश गुप्ता",
      "बंदना कुमारी",
      "रेखा गुप्ता",
      "प्रवीण जैन",
      "सत्येंद्र जैन",
      "करनैल सिंह",
      "सतीश लूथरा",
      "प्रीति तोमर",
      "तिलक राम गुप्ता",
      "सतेंद्र शर्मा",
      "राजेश गुप्ता",
      "पूनम शर्मा",
      "रागिनी नायक",
      "अखिलेश पति त्रिपाठी",
      "अशोक गोयल",
      "कुंवर करण सिंह",
      "सोमदत्त",
      "मनोज कुमार जिंदल",
      "अनिल भारद्वाज",
      "पुनर्दीप सिंह साहनी",
      "सतीश जैन",
      "मुदित अग्रवाल",
      "शोएब इकबाल",
      "दीप्ति इंदौरा",
      "असीम अहमद खान",
      "इमरान हुसैन",
      "कमल बागड़ी",
      "हारून यूसुफ",
      "विशेष रवि",
      "दुष्यंत कुमार गौतम",
      "राहुल धानक",
      "परवेश रतन",
      "राज कुमार आनंद",
      "श्रीमती कृष्णा तीरथ",
      "शिव चरण गोयल",
      "हरीश खुराना",
      "राजेंद्र नामधारी",
      "राखी बिडलान",
      "उर्मिला गंगवाल",
      "जे.पी. पंवार",
      "धनवती चंदेला",
      "मनजिंदर सिंह सिरसा",
      "धर्मपाल चंदेला",
      "सुरिंदर सेतिया",
      "श्याम शर्मा",
      "प्रेम शर्मा",
      "जरनैल सिंह",
      "श्वेत सैनी",
      "पीएस बावा",
      "प्रवीण कुमार",
      "आशीष सूद",
      "श्रीमती हरबानी कौर",
      "महिंदर यादव",
      "जितेन्द्र सोलंकी",
      "एडवोकेट जितेन्द्र सोलंकी",
      "पोश बलीयन (पूजा नरेश बलीयन)",
      "पवन शर्मा",
      "मुकेश शर्मा",
      "विनय मिश्रा",
      "प्रदयुमं राजपूत",
      "आदर्श शास्त्री",
      "सुमेश शौकीन",
      "संदीप सहरावत",
      "रघुविंदर शौकीन",
      "तरुण यादव",
      "नीलम पहलवान",
      "सुषमा यादव",
      "सुरेंद्र भारद्वाज",
      "कैलाश गहलोत",
      "देवेंद्र सहरावत",
      "जोगिंदर सोलंकी",
      "कुलदीप सोलंकी",
      "मांगे राम",
      "वीरेंद्र सिंह कादयान",
      "भुवन तंवर",
      "प्रदीप कुमार उपमन्यु",
      "दुर्गेश पाठक",
      "उमंग बजाज",
      "विनीता यादव",
      "अरविंद केजरीवाल",
      "प्रवेश साहिब सिंह वर्मा",
      "संदीप दीक्षित",
      "महेंद्र चौधरी",
      "गजेंद्र यादव",
      "पुष्पा सिंह",
      "मनीष सिसोदिया",
      "सरदार तरविंदर सिंह मारवाह",
      "फरहान सूरी",
      "रमेश पहलवान",
      "नीरज बसोया",
      "अभिषेक दत्त",
      "सोमनाथ भारती",
      "सतीश उपाध्याय",
      "जितेंद्र कुमार कोचर",
      "प्रमिला टोकस",
      "अनिल शर्मा",
      "विशेष टोकस",
      "ब्रह्म सिंह तंवर",
      "करतार सिंह तंवर",
      "राजेंद्र तंवर",
      "प्रेम कुमार चौहान",
      "दीपक तंवर",
      "राजेश चौहान",
      "अजय दत्त",
      "खुशीराम चुनार",
      "जय प्रकाश",
      "दिनेश मोहनिया",
      "चंदन चौधरी",
      "हर्ष चौधरी",
      "सौरभ भारद्वाज",
      "शिखा राय",
      "गर्वित सिंघवी",
      "आतिशी",
      "रमेश विधूड़ी",
      "अलका लांबा",
      "साही राम",
      "रोहतास विधूड़ी",
      "वीरेंद्र बिधूड़ी",
      "राम सिंह नेटा जी",
      "नारायण शर्मा",
      "राम सिंह नेटा जी",
      "अमानतुल्लाह खान(हॉट सीट)",
      "मनीष चौधरी",
      "अरीबा खान",
      "अंजना पारचा",
      "रविकांत उज्जैन",
      "अमरदीप",
      "कुलदीप कुमार",
      "प्रियंका गौतम",
      "अक्षय कुमार",
      "अवध ओझा",
      "रवींद्र सिंह नेगी",
      "चौधरी अनिल कुमार",
      "बीबी त्यागी",
      "अभय वर्मा",
      "सुमित शर्मा",
      "दीपक सिंगला",
      "ओम प्रकाश शर्मा",
      "राजीव चौधरी",
      "विकास बग्गा",
      "डॉ. अनिल गोयल",
      "गुरचरण सिंह राजू",
      "नवीन चौधरी (दीपू)",
      "सरदार अरविंदर सिंह लवली",
      "कमल अरोड़ा",
      "पद्मश्री जितेंद्र सिंह शंटी",
      "संजय गोयल",
      "जगत सिंह",
      "वीर सिंह ढींगन",
      "सुष्री कुमारी रिंकू",
      "राजेश लिलोठिया",
      "सरिता सिंह",
      "जितेंद्र महाजन",
      "सुरेश वाटी चौहान",
      "चौधरी जुबैर अहमद",
      "अनिल गौड़",
      "अब्दुल रहमान",
      "गौरव शर्मा",
      "अजय महावर",
      "भीष्म शर्मा",
      "गोपाल राय",
      "अनिल वशिष्ट",
      "हाजी मोहम्मद इस्हाक खान",
      "सुरेंद्र कुमार",
      "प्रवीण निमेष",
      "ईश्वर बागरी",
      "अदिल अहमद खान",
      "मोहन सिंह बिष्ट",
      "अनिल महंदी",
      "मनोज त्यागी",
      "कपिल मिश्रा",
      "पीके मिश्रा",
      "महेंद्र गोयल",
      "कुलवंत राणा",
      "सुशांत मिश्रा",
    ];

    // Fetch only party and constituency fields for the matching candidates
    const candidates = await collection.find().toArray();

    console.log(candidates);

    // .find(
    //   { name: { $in: candidateNames } },
    //   { projection: { party: 1, constituency: 1 } }
    // )
    // .toArray();
    // for (const candidate of candidates) {
    //   const updatedData = {
    //     party: new ObjectId(candidate.party), // Convert party to ObjectId
    //     constituency: candidate.constituency.map((id) => new ObjectId(id)), // Convert array of constituency IDs
    //   };

    //   // Update document
    //   await collection.updateOne(
    //     { _id: candidate._id }, // Find by _id
    //     { $set: updatedData }
    //   );

    //   console.log(`Updated candidate: ${candidate}`);
    // }

    console.log("All documents updated successfully!");
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    await client.close();
  }
}

updateDocuments();
