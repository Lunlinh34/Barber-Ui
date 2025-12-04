import React, { useState } from "react";
import "./HairAnalyzer.css";

const HairAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedHairstyles, setSuggestedHairstyles] = useState([]);

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || "gemini-2.5-flash";

  // Danh sách ảnh minh hoạ (bạn có thể thay bằng link ảnh thật)
  const hairstyleImages = {
    "Tóc Layear": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fchiaki.vn%2Ftin-tuc%2Fcac-kieu-toc-layer-nam-dep-nhat&psig=AOvVaw0f6a-0077NbFxTmwJw1_7g&ust=1761209072475000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIj59Jq1t5ADFQAAAAAdAAAAABAE",
    "Tóc Undercut": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmenitems.vn%2Fblogs%2Fxu-huong-lam-dep-nam-gioi%2F15-kieu-toc-undercut-ngan-nam-tinh-dep-nhat-2025-xu-huong-hot-trend%3Fsrsltid%3DAfmBOoqrUOIUbkxLf5nL7aGjdBew57nhbGKiDwXwKSXTWQIuxWHIzORW&psig=AOvVaw3382gs-Kg-EcfeBx9UMyWU&ust=1761208962039000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMCC7Oe0t5ADFQAAAAAdAAAAABAE",
    "Tóc Quiff": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphuloc.com.vn%2Fkieu-toc-short-quiff%3Fsrsltid%3DAfmBOoqaKXVGW4l5Z9GoYv8ErNxVSpx3rNtS9C4ehShZuJjYupD4SAHU&psig=AOvVaw1hFT-BdRs8b_l5DajRgvp7&ust=1761209033090000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNC78pG1t5ADFQAAAAAdAAAAABAE",
    "Tóc Buzz Cut": "https://www.google.com/url?sa=i&url=https%3A%2F%2Flaforce.vn%2Fkieu-toc-buzzcut-3333%2F%3Fsrsltid%3DAfmBOorVB-DIFr23jsTiFbq0yBjgZ0Hp4X1TGpy7leadRevJa7PiB68L&psig=AOvVaw07U9-MSHfCiaZnGdRJX5kI&ust=1761209094722000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCWuKW1t5ADFQAAAAAdAAAAABAE",
    "Tóc Crew Cut": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvuahanghieu.com%2Ftin-tuc%2F7-kieu-toc-crew-cut-dep-nhat-cho-chang-them-banh-bao%3Fsrsltid%3DAfmBOop_H8qNxu1c29PKd4XZalpm7KatkQsonC3UUu4M6DzpufF8ntTS&psig=AOvVaw0fT_Cexmkt-yjvaLcWRTgs&ust=1761209112804000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCbka61t5ADFQAAAAAdAAAAABAE",
    "Tóc Side Part": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphongbvb.com%2Fblog%2Ftop-7-kieu-toc-side-part-hot-nhat-phong-bvb-nam-2024.html&psig=AOvVaw109Lbohr1qxThqsrRqPGTd&ust=1761209133458000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIj-99C1t5ADFQAAAAAdAAAAABAE",
    "Tóc Fade": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphuloc.com.vn%2Fcac-kieu-fade-va-cong-thuc-fade-toc-nam%3Fsrsltid%3DAfmBOorOOZGTfpNIpJafv_sInLBxT11o78KvV5PIvJAln11qQc0cRDcG&psig=AOvVaw06Cfo2O6WdqgqMe5qNWEGj&ust=1761209153208000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCu2cG1t5ADFQAAAAAdAAAAABAK",
    "Tóc Pompadour": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphuloc.com.vn%2Fkieu-toc-pompadour%3Fsrsltid%3DAfmBOoraqHQ3lZDsyK5Z83EmOCctZ1c3G7Ouk0_ZTiOZmo4XK9lIWiJw&psig=AOvVaw01poEegBivG80_vBbWtYX_&ust=1761209240453000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJivge21t5ADFQAAAAAdAAAAABAE",
    "Tóc Messy Quiff": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmenitems.vn%2Fblogs%2Fxu-huong-lam-dep-nam-gioi%2Fkham-pha-20-kieu-toc-messy-quiff-dep-va-phong-cach-cho-nam%3Fsrsltid%3DAfmBOoqTFp7rU3Pt1y5fNjWLosUnurC04urmkQ0hREjNOFNvO590qJQm&psig=AOvVaw1wN-4emi30Uznnj0tAsGnB&ust=1761209221220000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNjg0-G1t5ADFQAAAAAdAAAAABAE",
    "Tóc Long Shag": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fliembarbershop.com%2F148410%2F&psig=AOvVaw3olw6bMDlHhiLwZ4ellxs6&ust=1761209260894000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDIiva1t5ADFQAAAAAdAAAAABAK",
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult("");
    setSuggestedHairstyles([]);
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("Vui lòng chọn một ảnh khuôn mặt!");
      return;
    }

    setLoading(true);
    setResult("");
    setSuggestedHairstyles([]);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(",")[1];

      const prompt = `
Chủ đề: Phân tích khuôn mặt và tư vấn kiểu tóc hiện đại (chọn lọc)

Nhiệm vụ: Phân tích kỹ lưỡng hình ảnh được cung cấp và đưa ra 3 lời khuyên chuyên nghiệp về kiểu tóc.

Danh sách kiểu tóc được phép chọn: Tóc Layer, Tóc Undercut, Tóc Quiff, Tóc Buzz Cut, Tóc Crew Cut, Tóc Side Part, Tóc Fade, Tóc Pompadour, Tóc Messy Quiff, Tóc Long Shag.

LƯU Ý QUAN TRỌNG: Chỉ được chọn 3 kiểu tóc phù hợp nhất TỪ DANH SÁCH TRÊN.

Định dạng đầu ra:
PHẦN I: Chuẩn đoán khuôn mặt
PHẦN II: Phân tích tóc hiện tại
PHẦN III: Tư vấn 3 kiểu tóc phù hợp
      `;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

      const body = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: image.type,
                  data: base64Data,
                },
              },
              { text: prompt },
            ],
          },
        ],
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          setResult(text);

          // 🔍 Phát hiện kiểu tóc nào có trong phản hồi
          const detected = Object.keys(hairstyleImages).filter((name) =>
            text.includes(name)
          );
          setSuggestedHairstyles(detected);
        } else {
          setResult("Không nhận được phản hồi hợp lệ từ API.");
        }
      } catch (err) {
        setResult("Lỗi khi gọi API: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="hair-analyzer">
      <h1>💇‍♂️ AI Tư Vấn Kiểu Tóc</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={analyzeImage} disabled={loading}>
        {loading ? "Đang phân tích..." : "Phân tích ảnh"}
      </button>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="preview"
        />
      )}

      <pre className="result">{result}</pre>

      {suggestedHairstyles.length > 0 && (
        <div className="gallery">
          <h3>Ảnh minh họa kiểu tóc được đề xuất:</h3>
          <div className="image-grid">
            {suggestedHairstyles.map((style) => (
              <div key={style} className="image-card">
                <img src={hairstyleImages[style]} alt={style} />
                <p>{style}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  preview: {
    width: "200px",
    borderRadius: "10px",
    marginTop: "15px",
  },
  result: {
    textAlign: "left",
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "20px",
    whiteSpace: "pre-wrap",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "5px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  gallery: {
    marginTop: "30px",
  },
  imageGrid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  imageCard: {
    textAlign: "center",
    width: "150px",
  },
  hairImage: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
};

export default HairAnalyzer;
