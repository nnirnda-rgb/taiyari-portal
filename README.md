# युवा शिक्षा पोर्टल | नई सोच, नई पहल - रूपसिंह फनात
### प्रेरक एवं मुख्य मार्गदर्शक: रूपसिंह फनात (Roopsingh Fanat)
> **"रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा की तैयारी कर रहे हैं"**  
> *मूल मंत्र: "नई सोच, नई पहल" • "आइए मिलकर कल को और बेहतर बनाते हैं"*

[![Live Demo](https://img.shields.io/badge/Live%20Public%20URL-Cloudflare%20Edge-success?style=for-the-badge&logo=cloudflare)](https://statutory-cab-punk-nested.trycloudflare.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-nnirnda--rgb%2Ftaiyari--portal-blue?style=for-the-badge&logo=github)](https://github.com/nnirnda-rgb/taiyari-portal)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nnirnda-rgb/taiyari-portal)

---

## 🌟 24/7 Live Public Testing Links

| सेवा (Service) | लाइव लिंक (Live Link) | विवरण (Description) |
|---|---|---|
| **🌐 लाइव पब्लिक पोर्टल** | [https://statutory-cab-punk-nested.trycloudflare.com](https://statutory-cab-punk-nested.trycloudflare.com) | वैश्विक रूप से लाइव (Global 24/7 Edge URL) |
| **🐙 गिटहब रिपॉजिटरी** | [https://github.com/nnirnda-rgb/taiyari-portal](https://github.com/nnirnda-rgb/taiyari-portal) | सोर्स कोड एवं निरंतर अपडेट्स |
| **⚡ 1-Click Vercel डिप्लॉय** | [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/nnirnda-rgb/taiyari-portal) | वर्सेल पर स्थायी 24/7 सर्वरलेस होस्टिंग |

---

## 🏛️ मुख्य विशेषताएं (Key Features)

1. **आदरणीय मार्गदर्शक सम्मान पटल (Patron Dedication Banner)**:
   - शीर्ष पर **'रूपसिंह फनात'** का गरिमामय चित्र, पदवी, पहल का मूल मंत्र **‘नई सोच, नई पहल’** एवं प्रेरक ध्येय **‘आइए मिलकर कल को और बेहतर बनाते हैं’**।
2. **RSMSSB एवं RPSC परीक्षा हब**:
   - CET, पटवार, RAS, प्रयोगशाला सहायक, पशु परिचर, कृषि पर्यवेक्षक आदि के नवीनतम पाठ्यक्रम, परीक्षा पैटर्न व पात्रता।
3. **तैयारी (Practice Mode)**:
   - विषयवार एवं टॉपिकवार अभ्यास प्रश्न।
   - द्विभाषी (हिंदी/English) टॉगल, तत्काल सही उत्तर प्रदर्शन व विस्तृत व्याख्या बॉक्स।
4. **स्वयं की जांच (Proctored CBT Mock Test Interface)**:
   - फुलस्क्रीन मोड व टैब-स्विचिंग / विंडो ब्लर डिटेक्शन (उल्लंघन पर चेतावनी व ऑटो-सबमिट)।
   - लाइव सर्कुलर वेबकैम मॉनिटरिंग प्रीव्यू।
   - 1-100 प्रश्न पैलेट (हरा = उत्तरित, लाल = अनुत्तरित, बैंगनी = समीक्षाधीन, 5वां विकल्प = अनुत्तरित प्रश्न)।
   - स्कोर, 1/3 नेगेटिव मार्किंग, एक्यूरेसी व विषयवार शक्ति विश्लेषण कार्ड।
5. **विगत टेस्ट इतिहास (Past Test History with Firebase)**:
   - क्लाउड फायरस्टोर (`Firebase`) एवं लोकल स्टोरेज डुअल-टियर ऑफलाइन सिंक।
   - 4G मोबाइल नेटवर्क पर निर्बाध कार्य।
6. **पुराने प्रश्न पत्र (PYQs) एवं स्वतः वॉटरमार्किंग**:
   - `pdf-lib` द्वारा प्रत्येक डाउनलोड पर प्रामाणिक हेडर व वॉटरमार्क: **'नई सोच, नई पहल | रूपसिंह फनात'**।
7. **विज्ञापन नीति (AdSense Policy)**:
   - केवल लैंडिंग पेज साइडबार व फुटर में गैर-हस्तक्षेपकारी स्लॉट।
   - **मॉक टेस्ट व परीक्षा स्क्रीन पूर्णतः 100% विज्ञापन-मुक्त (Ad-Free)**।
8. **4G लो-बैंडविड्थ मोबाइल ऑप्टिमाइजेशन**:
   - इनिशियल जावास्क्रिप्ट बंडल मात्र **87.3 KB**।
   - `next/dynamic` लेजी लोडिंग व 1-वर्षीय अपरिवर्तनीय एज कैशिंग।

---

## 🛠️ तकनीकी संरचना (Tech Stack)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Lucide React Icons
- **Database**: Firebase Cloud Firestore with Offline Persistence
- **PDF Generation**: `pdf-lib` + `@pdf-lib/fontkit`
- **Network Caching**: HTTP Edge Caching, Gzip/Brotli Compression, Next.js ISR
- **Deployment**: GitHub, Cloudflare Edge Tunnel, Vercel Ready

---

## 💻 स्थानीय विकास (Local Setup)

```bash
# रिपॉजिटरी क्लोन करें
git clone https://github.com/nnirnda-rgb/taiyari-portal.git

# फोल्डर में जाएं
cd taiyari-portal

# पैकेज इंस्टॉल करें
npm install

# डेवलपमेंट सर्वर शुरू करें
npm run dev

# प्रोडक्शन बिल्ड तैयार करें
npm run build
npm run start -- -p 3000
```

---

© 2024-2026 नई सोच, नई पहल | श्रीमान रूप सिंह फणात। सर्वाधिकार सुरक्षित।
