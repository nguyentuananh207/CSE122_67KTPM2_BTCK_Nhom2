 /**
 * CraftLink – AI Services (Mô phỏng độc lập)
 * 1. AI Brief Builder (Dành cho Khách hàng Buyer)
 * 2. AI Style Matcher (Dành cho Người sáng tạo Maker)
 * 3. AI Revision Summarizer (Dành cho Quản trị viên/Moderator)
 */

 
 
 /* 3. AI Revision Summarizer: Tóm tắt so sánh sự thay đổi giữa các phiên bản quy tắc nội dung
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