export type Project = {
  index: string;
  title: string;
  englishTitle: string;
  summary: string;
  tags: string[];
  accent: "blue" | "rust" | "green";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "知识图谱智能导学平台",
    englishTitle: "Knowledge Graph Learning Guide",
    summary:
      "围绕课程知识图谱组织学习资源，从学习者状态出发设计导学路径，并延展到微信小程序端。",
    tags: ["知识图谱", "学习者建模", "微信小程序"],
    accent: "blue",
  },
  {
    index: "02",
    title: "个性化在线教育系统",
    englishTitle: "Personalized Learning System",
    summary:
      "把推荐算法放进真实的在线学习场景，关注资源匹配、学习路径和教学反馈之间的闭环。",
    tags: ["推荐系统", "在线教育", "系统设计"],
    accent: "rust",
  },
  {
    index: "03",
    title: "广告投放实时优化研究",
    englishTitle: "Real-Time Advertising Optimization",
    summary:
      "面向实时反馈的投放场景，研究强化学习如何参与广告策略优化，并形成一项发明专利方案。",
    tags: ["强化学习", "投放优化", "实时反馈"],
    accent: "green",
  },
];
