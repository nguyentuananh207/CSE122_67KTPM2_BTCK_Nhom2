/**
 * CraftLink – AI Services (Mô phỏng độc lập)
 * 1. AI Brief Builder (Dành cho Khách hàng Buyer)
 * 2. AI Style Matcher (Dành cho Người sáng tạo Maker)
 * 3. AI Revision Summarizer (Dành cho Quản trị viên/Moderator)
 */

function delay(min = 1200, max = 2200) {
  const ms = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 1. AI Brief Builder: Tự động phân tích ý tưởng của Buyer và đề xuất tiêu chí kỹ thuật chuẩn hóa
 */
export async function aiBriefBuilder(briefInput) {
  await delay(1200, 2000);

  const categorySuggestions = {
    "cat-1": ["Gốm nung củi truyền thống", "Men lam bóng mịn", "Khắc chìm hoa sen", "Kích thước cao 22-28cm"],
    "cat-2": ["Da sáp ngựa điên (Crazy Horse)", "Khâu tay chỉ sáp 0.6mm", "Dập chìm logo/tên cá nhân", "Cạnh đánh sáp ong"],
    "cat-3": ["Bạc 925 xi bạch kim", "Đính đá Cubic Zirconia", "Khắc laser micro ở lòng trong", "Bề mặt xước mờ"],
    "cat-4": ["Gỗ óc chó Bắc Mỹ nguyên tấm", "Phủ dầu lau Osmo an toàn", "Bo viền vát cạnh 45 độ", "Vân gỗ tự nhiên"],
    "cat-5": ["Lụa tơ tằm Vạn Phúc tự nhiên", "Dệt hoa văn chìm", "Nhuộm thảo mộc", "Kích thước 90x180cm"],
    "cat-6": ["Sáp đậu nành tự nhiên", "Bấc gỗ đôi tanh tách", "Tinh dầu tự nhiên cam bergamot & gỗ tuyết tùng"]
  };

  const bullets = categorySuggestions[briefInput.category] || [
    "Vật liệu tự nhiên bền vững",
    "Gia công hoàn toàn thủ công",
    "Được tinh chỉnh theo số đo riêng"
  ];

  const enhancedText = `${briefInput.description || ""}\n\n✦ ĐỀ XUẤT TIÊU CHUẨN HOÁ TỪ AI:\n• Kỹ thuật gia công: ${bullets[0]}\n• Hoàn thiện bề mặt: ${bullets[1]}\n• Điểm nhấn cá nhân hoá: ${bullets[2]}\n• Khoảng ngân sách đề xuất: ${(briefInput.budget || 500000).toLocaleString("vi-VN")} ₫ hoàn toàn phù hợp với 3 nghệ nhân hàng đầu trong hệ thống.`;

  return {
    confidence: 0.94,
    enhancedDescription: enhancedText,
    suggestedTags: ["Thủ công tinh xảo", "Độc bản", "Có bảo hành"],
    recommendedMakers: 4
  };
}

/**
 * 2. AI Style Matcher: So khớp phong cách giữa Nghệ nhân Maker và Brief của Buyer
 */
export async function aiStyleMatcher(briefData, makerData) {
  await delay(1000, 1800);

  const score = Math.floor(Math.random() * 15) + 85; // 85% - 99%

  return {
    matchScore: score,
    reasons: [
      "Phong cách chế tác của Xưởng tương thích 92% với chất liệu yêu cầu.",
      "Kinh nghiệm hoàn thành hơn 40 đơn hàng cùng danh mục này.",
      "Mức ngân sách của khách hàng nằm trọn trong bảng giá khả thi của bạn.",
      "Tỷ lệ phản hồi tích cực từ khách hàng đạt 4.9/5.0 sao."
    ],
    recommendation: score >= 90
      ? "Rất phù hợp! Đề xuất gửi proposal ngay kèm phương án phác thảo nhanh."
      : "Khá phù hợp. Hãy hỏi thêm về yêu cầu kích thước cụ thể trước khi chốt giá."
  };
}

/**
 * 3. AI Revision Summarizer: Tóm tắt so sánh sự thay đổi giữa các phiên bản quy tắc nội dung
 */
export async function aiRevisionSummarizer(originalRules, updatedRules) {
  await delay(1200, 2000);

  const added = updatedRules.filter(r => !originalRules.includes(r));
  const removed = originalRules.filter(r => !updatedRules.includes(r));

  return {
    summary: `Phát hiện ${added.length} quy chuẩn mới được thêm vào và ${removed.length} điều khoản đã được thay thế.`,
    added,
    removed,
    confidence: 0.97,
    status: added.length > 0 ? "ready_for_review" : "no_major_change"
  };
}
