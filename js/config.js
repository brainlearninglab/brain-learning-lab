// Central config for content/links. Edit this file when you change text, links, or mappings.
export const ROTATE_MS = 12000;
export const IDLE_RESUME_MS = 30000;

export const ITEMS = [
      { key: "math&reading2019", title: "2019數學計算與閱讀測驗", desc: "需要使用測驗者，請聯繫實驗室取得授權。" },
      { key: "fluency", title: "朗讀流暢", desc: "兩篇字數、用字一模一樣的故事，讓你發現唸得越流暢不只是認字越快，還代表小朋友可能真的懂故事的內容！" },
      { key: "literacy", title: "識字量評估", desc: "實驗室的自編測驗以及教育部公布的識字量1200，根據情況選擇使用。" },
      { key: "strategy", title: "補救教學", desc: "研究指出透過組字規則學習識字有助於孩童記憶生字，並提高識字效率。實驗室設計人、手、水字部的完整教案、上課用投影片，以及學生課本，現場教師可以直接下載使用。" },
      { key: "database", title: "語料庫", desc: "語料庫，歡迎下載使用。" },
      { key: "docs", title: "相關文件", desc: "說明文件、附件、下載與補充資料。" },
    ];

export const KEY_TO_REGIONS = {
        "math&reading2019": ["math2019", "readingTest"],
        // If you don't have a dedicated bulb for this key, temporarily borrow an existing one
        "database": ["docs"],
      };

// Kid2: Google Slides embed (gallery)
export const SLIDES_EMBED_URL_2 = "https://docs.google.com/presentation/d/1X97C1VdKVYBDmDHRXQZuAUFI0o_L0Wr34an2fpT30uE/embed?start=true&loop=true&delayms=3000";
