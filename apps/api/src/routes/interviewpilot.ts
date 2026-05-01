import { FastifyInstance } from 'fastify';
interface AnalyzeRequest {
  resume: string;
  jd: string;
}
interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starSuggestion: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}
interface AnalyzeResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  resumeSuggestions: string[];
  questions: InterviewQuestion[];
  meta: {
    mode: string;
    durationMs: number;
  };
}
// 技能关键词库
const SKILL_KEYWORDS = {
  frontend: ['javascript', 'typescript', 'react', 'vue', 'angular', 'html', 'css', 'tailwind', 'next.js', 'astro'],
  backend: ['node.js', 'python', 'java', 'go', 'rust', 'express', 'fastify', 'django', 'spring'],
  database: ['mysql', 'postgresql', 'mongodb', 'redis', 'supabase', 'firebase'],
  devops: ['docker', 'kubernetes', 'ci/cd', 'github actions', 'aws', 'azure', 'gcp'],
  ai: ['machine learning', 'deep learning', 'nlp', 'rag', 'llm', 'openai', 'tensorflow', 'pytorch'],
  tools: ['git', 'github', 'vscode', 'figma', 'jira', 'notion'],
};
// 从文本中提取技能
function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const skills: string[] = [];

  for (const [category, keywords] of Object.entries(SKILL_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        skills.push(keyword);
      }
    }
  }

  return [...new Set(skills)];
}
// 计算匹配分数
function calculateMatchScore(resumeSkills: string[], jdSkills: string[]): number {
  if (jdSkills.length === 0) return 50;

  const matched = resumeSkills.filter(skill => jdSkills.includes(skill));
  return Math.round((matched.length / jdSkills.length) * 100);
}
// 生成面试问题
function generateQuestions(resumeSkills: string[], jdSkills: string[], missingSkills: string[]): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [];

  // 基于匹配技能的问题
  for (const skill of resumeSkills.slice(0, 3)) {
    questions.push({
      question: `请描述您在 ${skill} 方面的项目经验`,
      category: '技术深度',
      difficulty: 'medium',
      starSuggestion: {
        situation: '在之前的项目中，我们需要...',
        task: '我的任务是...',
        action: '我使用了 ' + skill + ' 来...',
        result: '最终项目成功...',
      },
    });
  }

  // 基于缺口技能的问题
  for (const skill of missingSkills.slice(0, 2)) {
    questions.push({
      question: `岗位需要 ${skill}，您打算如何学习和应用？`,
      category: '学习能力',
      difficulty: 'medium',
      starSuggestion: {
        situation: '我了解到 ' + skill + ' 在这个岗位很重要',
        task: '我计划...',
        action: '我已经开始...',
        result: '我相信在短时间内能够...',
      },
    });
  }

  // 通用问题
  questions.push({
    question: '请描述一个您解决过的最有挑战性的技术问题',
    category: '问题解决',
    difficulty: 'hard',
    starSuggestion: {
      situation: '在之前的项目中，我们遇到了...',
      task: '作为核心开发者，我需要...',
      action: '我分析了问题，发现...',
      result: '最终问题解决，性能提升了...',
    },
  });

  questions.push({
    question: '您如何保持技术学习和更新？',
    category: '学习能力',
    difficulty: 'easy',
    starSuggestion: {
      situation: '技术更新很快，我需要...',
      task: '我制定了学习计划...',
      action: '我每天花 1 小时...',
      result: '通过持续学习，我掌握了...',
    },
  });

  return questions;
}
// 生成简历改进建议
function generateResumeSuggestions(matchedSkills: string[], missingSkills: string[]): string[] {
  const suggestions: string[] = [];

  if (missingSkills.length > 0) {
    suggestions.push(`考虑在简历中添加以下技能经验：${missingSkills.slice(0, 3).join('、')}`);
  }

  suggestions.push('在简历中添加具体的项目成果和数据指标');
  suggestions.push('突出与岗位要求匹配的工作经验');
  suggestions.push('添加技术博客或开源项目链接');

  return suggestions;
}
export async function interviewpilotRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: AnalyzeRequest }>('/analyze', async (request, reply) => {
    const { resume, jd } = request.body;

    if (!resume || !jd) {
      return reply.status(400).send({ error: '请提供简历和岗位 JD' });
    }

    if (resume.length > 5000 || jd.length > 5000) {
      return reply.status(400).send({ error: '输入内容过长，最多 5000 字' });
    }

    const startTime = Date.now();

    // 提取技能
    const resumeSkills = extractSkills(resume);
    const jdSkills = extractSkills(jd);

    // 计算匹配
    const matchedSkills = resumeSkills.filter(skill => jdSkills.includes(skill));
    const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));

    // 计算分数
    const matchScore = calculateMatchScore(resumeSkills, jdSkills);

    // 生成建议
    const resumeSuggestions = generateResumeSuggestions(matchedSkills, missingSkills);

    // 生成问题
    const questions = generateQuestions(resumeSkills, jdSkills, missingSkills);

    return {
      matchScore,
      matchedSkills,
      missingSkills,
      resumeSuggestions,
      questions,
      meta: {
        mode: 'local-rules',
        durationMs: Date.now() - startTime,
      },
    };
  });
}
